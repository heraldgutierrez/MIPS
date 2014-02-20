var mongoose = require('mongoose');
var ScheduleModel = mongoose.model('Schedule');
var PlayerModel = mongoose.model('Players');
var TeamModel = mongoose.model('Teams');


exports.schedule = function(req, res) {
	res.render('basketball/schedule', {
		title	: 'MIPS Winnipeg - Basketball Schedule'
	});
};

exports.updateSchedule = function(req, res) {

};

exports.standings = function(req, res) {
	res.render('basketball/teamStanding', {
		title	: 'MIPS Winnipeg - Basketball Team Standings'
	});
};

exports.teamStats = function(req, res) {
	var team = req.params.team;

	res.render('basketball/teamStats', {
		title	: 'MIPS Winnipeg - Basketball Team Stats',
		team 	: team
	});
};

exports.playerStats = function(req, res) {
	var player = unescape(req.params.player);

	res.render('basketball/playerStats', {
		title	: 'MIPS Winnipeg - Basketball ' + player + ' Stats',
		player 	: player
	});
};

exports.allPlayers = function(req, res) {
	res.render('basketball/allPlayerStats', {
		title	: 'MIPS Winnipeg - Basketball All Players',
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