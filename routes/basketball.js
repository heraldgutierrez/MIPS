var mongoose = require('mongoose');
var ScheduleModel = mongoose.model('Schedule');
var PlayerModel = mongoose.model('Players');
var TeamModel = mongoose.model('Teams');
var ObjectId = mongoose.Types.ObjectId;

function getUserLevel(req) {
	var currUser = req.session.currentUser;
	var level = currUser == undefined ? '3' : currUser.level;

	return level;
}

exports.schedule = function(req, res) {
	var level = getUserLevel(req);

	res.render('basketball/schedule', {
		title	: 'MIPS Winnipeg - Basketball Schedule',
		level 	: level
	});
};

exports.updateStats = function(req, res) {
	var level = getUserLevel(req);
	
	res.render('basketball/updateStats', {
		title	: 'MIPS Winnipeg - Basketball Update Stats',
		level 	: level
	});
};

exports.standings = function(req, res) {
	var level = getUserLevel(req);
	res.render('basketball/teamStanding', {
		title	: 'MIPS Winnipeg - Basketball Team Standings',
		level 	: level
	});
};

exports.teamStats = function(req, res) {
	var level = getUserLevel(req);
	var team = req.params.team;

	res.render('basketball/teamStats', {
		title	: 'MIPS Winnipeg - Basketball Team Stats',
		level 	: level,
		team 	: team
	});
};

exports.playerStats = function(req, res) {
	var level = getUserLevel(req);
	var player = unescape(req.params.player);

	res.render('basketball/playerStats', {
		title	: 'MIPS Winnipeg - Basketball ' + player + ' Stats',
		level 	: level,
		player 	: player
	});
};

exports.allPlayers = function(req, res) {
	var level = getUserLevel(req);
	res.render('basketball/allPlayerStats', {
		title	: 'MIPS Winnipeg - Basketball All Players',
		level 	: level
	});
};



/**************************************
	Database
***************************************/
exports.getScheduleByYear = function(req, res) {
	var season = req.query.season;

	if(season == undefined) {
		var date = new Date();
		season = date.getFullYear();
	}

	ScheduleModel.find({ season : season }).sort({ week : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
}

exports.getScheduleByWeek = function(req, res) {
	var season = req.query.season;
	var week = req.query.week;

	ScheduleModel.find({
		season 	: season,
		week 	: week
	}).sort({ week : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
}

exports.getAllTeams = function(req, res) {
	var season = req.query.season;
	var sort = req.query.sort;

	if(season == undefined) {
		var date = new Date();
		season = date.getFullYear();
	}

	if(sort == 'rank') {
		TeamModel.find({ season : season }).sort({ wins : -1, losses : 1 }).exec(
			function(err, result) {
				res.json(result);
			}
		);
	} else {
		TeamModel.find({ season : season }).sort({ team : 1 }).exec(
			function(err, result) {
				res.json(result);
			}
		);
	}	
}

exports.getTeamByName = function(req, res) {
	var season = req.query.season;
	var team = req.query.team;

	if(season == undefined) {
		var date = new Date();
		season = date.getFullYear();
	}

	TeamModel.find({ season : season, team : team }).exec(
		function(err, result) {
			res.json(result);
		}
	);
}

exports.getPlayer = function(req, res) {
	var season = req.query.season;
	var name = req.query.player;

	if(season == undefined) {
		var date = new Date();
		season = date.getFullYear();
	}

	PlayerModel.find({ season : season, name : name }).sort({ name : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
}

exports.getAllPlayers = function(req, res) {
	var season = req.query.season;

	if(season == undefined) {
		var date = new Date();
		season = date.getFullYear();
	}

	PlayerModel.find({ season : season }).sort({ name : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
}

exports.getPlayersByTeam = function(req, res) {
	var season = req.query.season;
	var team = req.query.team;

	if(season == undefined) {
		var date = new Date();
		season = date.getFullYear();
	}

	PlayerModel.find({ season : season, team : team }).sort({ name : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);	
}

exports.updateGameStats = function(req, res) {
	var date = req.body.date;
	var week = req.body.week;
	var time = req.body.time;
	var season = req.body.season;
	var gameNum = req.body.gameNum - 1;

	var homeTeam = req.body.homeTeam;
	var homeNumPlayers = req.body.homeNumPlayers;
	var homeScore = req.body.homeScore;

	var awayTeam = req.body.awayTeam;
	var awayNumPlayers = req.body.awayNumPlayers;
	var awayScore = req.body.awayScore;

	var ids = req.body.id;
	var points = req.body.points;
	var fouls = req.body.fouls;
	var starts = req.body.start;

	// Update Schedule Score
	updateSchedule(season, date, time, gameNum, homeScore, awayScore);

	// Update Home Team Stats
	updateTeamStats(season, homeTeam, homeScore, awayScore, week, date, true, awayTeam);

	// Update Away Team Stats
	updateTeamStats(season, awayTeam, awayScore, homeScore, week, date, false, homeTeam);

	// Update Home Players Stats
	for(var i = 0; i < homeNumPlayers; i++) {
		updatePlayerStats(season, homeTeam, ids, i, week, date, awayTeam, points, fouls, starts);
	}

	// Update Away Players Stats
	for(var i = homeNumPlayers; i < ids.length; i++) {
		updatePlayerStats(season, awayTeam, ids, i, week, date, homeTeam, points, fouls, starts);
	}

	res.redirect('/Basketball/updateStats?success=true&date=' + date + '&time=' + time);
}

function updateSchedule(season, date, time, gameNum, homeScore, awayScore) {
	console.log('Updating Schedule Scores');
	ScheduleModel.findOne({
		season 			: season,
		date 			: date,
		'games.time' 	: time
	}, function(err, result) {
		result.games[gameNum].homeScore = homeScore;
		result.games[gameNum].awayScore = awayScore;
		result.save();
	});
	console.log('Done Updating Schedule Scores');
}

function updateTeamStats(season, team, teamScore, oppScore, week, date, isHome, opponent) {
	console.log('Updating Team Stats: ' + team);
	TeamModel.findOne({
		season 	: season,
		team 	: team
	}, function(err, result) {
		var winner = (teamScore > oppScore) ? true : false
		var wasWinner = false;

		if(week <= result.games.length) {
			wasWinner = result.games[week-1].winner;

			result.games[week-1].week = week;
			result.games[week-1].date = date;
			result.games[week-1].home = isHome;
			result.games[week-1].opp = opponent;
			result.games[week-1].teamScore = teamScore;
			result.games[week-1].oppScore = oppScore;
			result.games[week-1].winner	= winner;

			// was a winner, changed to loser
			if(wasWinner && !winner) {
				result.wins--;
				result.losses++;
			} else if(!wasWinner && winner) {
			// was a loser, changed to winner
				result.wins++;
				result.losses--;
			}
		} else {
			result.games.push({
				'week'		: week,
				'date'		: date,
				'home'		: isHome,
				'opp'		: opponent,
				'teamScore'	: teamScore,
				'oppScore'	: oppScore,
				'winner'	: winner
			});

			if(winner)
				result.wins++;
			else
				result.losses--;
		}

		result.save();
	});
	console.log('Done Updating Team Stats: ' + team);
}

function updatePlayerStats(season, team, ids, index, week, date, opp, points, fouls, starts) {
	PlayerModel.findOne({
		season 	: season,
		team 	: team,
		_id		: new ObjectId(ids[index])
	}, function(err, result) {
		if(week <= result.stats.length) {
			result.stats[week-1].week = week;
			result.stats[week-1].date = date;
			result.stats[week-1].opp = opp;
			result.stats[week-1].points = points[index];
			result.stats[week-1].fouls = fouls[index];
			result.stats[week-1].started = starts[index];
		} else {
			result.stats.push({
				'week'		: week,
				'date'		: date,
				'opp'		: opp,
				'points'	: points[index],
				'fouls'		: fouls[index],
				'started'	: starts[index]
			});
		}

		result.save();
	});
}