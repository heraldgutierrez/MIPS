var GAMES = new Array();

$(document).ready(function() {
	fillDates();

	$('#date').change(function() {
		$('#season').val($('#date option:selected').data('season'));
		$('#week').val($('#date option:selected').data('week'));
		updateTimes();
		changeTeams();
		fillTeamPlayers(true);
		fillTeamPlayers(false);
	});

	$('#time').change(function() {
		changeTeams();
		fillTeamPlayers(true);
		fillTeamPlayers(false);
	});
});

/***********************************************
presetDate: After a game has been updated, set date and time to the same date/time again
***********************************************/
function presetDate() {
	var date = unescape(getURLParam('date'));
	var time = unescape(getURLParam('time'));

	$('#date').val(date);
	$('#date').trigger('change');

	$('#time').val(time);
	$('#time').trigger('change');
}

/***********************************************
fillDate: Retrieve and fill the 'Select' with all the dates in the schedule
***********************************************/
function fillDates() {
	$.getJSON(
		'/getScheduleByYear',
		function(data) {
			updateDate(data);
			$('#season').val($('#date option:selected').data('season'));
			$('#week').val($('#date option:selected').data('week'));
			updateTimes();
			changeTeams();
			fillTeamPlayers(true);
			fillTeamPlayers(false);

			var query = getURLParam('success');
			if(query != undefined)
				presetDate();
		}
	);
}

/***********************************************
updateDate: Fill the 'Select' with all the dates in the schedule with the data from the database
- schedule : all the dates from the database
***********************************************/
function updateDate(schedule) {
	var option;

	if(schedule.length != 0) {
		$('#date').empty();

		$.each(schedule, function(i, week) {
			option = '<option value="' + week.date + '" data-season="' + week.season + '" data-week="' + week.week + '" >';
			option += week.date;
			option += '</option>';

			$('#date').append(option);

			GAMES[i] = new Array();
			for(var j = 0; j < week.games.length; j++) {
				GAMES[i].push(week.games[j]);
			}
		});
	}
}

/***********************************************
updateTimes : Using the data-week attribute, get the times of games being played, and fill the 'Select' element
***********************************************/
function updateTimes() {
	$('#time').empty();
	var option;
	var week = $('#week').val();
	var numGames = GAMES[week-1].length;

	for(var i = 0; i < numGames; i++) {
		option = '<option value="' + GAMES[week-1][i].time + '" data-game="' + i + '">';
		option += GAMES[week-1][i].time;
		option += '</option>';

		$('#time').append(option);
	}
}

/***********************************************
changeTeams : when a date or time has been changed, update 'Home Team', 'Home Score', 'Away Team', and 'Away Score'
***********************************************/
function changeTeams() {
	var gameNum = $('#time option:selected').data('game');
	var week = $('#week').val();
	$('#gameNum').val(GAMES[week-1][gameNum].game);
	$('#homeTeam').val(GAMES[week-1][gameNum].home);
	$('#awayTeam').val(GAMES[week-1][gameNum].away);
	$('#homeScore').val(GAMES[week-1][gameNum].homeScore);
	$('#awayScore').val(GAMES[week-1][gameNum].awayScore);
}

/***********************************************
fillTeamPlayers : retrieve all the players of the team listed in 'Home Team' or 'Away Team'
- isHome : boolean, are we getting 'Home Team' players or 'Away Team' players
***********************************************/
function fillTeamPlayers(isHome) {
	var team = isHome ? $('#homeTeam').val() : $('#awayTeam').val();

	$.getJSON(
		'/getPlayersByTeam',
		{ 
			team : team,
			sort : 'number'
		},
		function(data) {
			updateTeamPlayers(data, isHome);
		}
	);
}

/***********************************************
updateTeamPlayers : fill the appropriate table with the team players
- players : array of all the teams players
- isHome : are we filling the 'Home' or 'Away' players
***********************************************/
function updateTeamPlayers(players, isHome) {
	var row;
	var week = $('#week').val();

	if(players.length != 0) {
		if(isHome) {
			$('#homePlayers tbody').empty();
			$('#homeNumPlayers').val(players.length);
		} else {
			$('#awayPlayers tbody').empty();
			$('#awayNumPlayers').val(players.length);
		}
	
		$.each(players, function(i, player) {
			row = '<tr data-id="' + player._id + '">';
			row += '<td>';
			row += '<input type="hidden" name="id" value="' + player._id + '"/>';
			row += player.name;
			row += '</td>';
			row += '<td>' + player.number + '</td>';

			// are we updating a previous game stats, display previous game stats
			if(week <= player.stats.length) {
				row += '<td><input type="number" name="points" value="' + player.stats[week-1].points + '" min="0" /></td>';
				row += '<td><input type="number" name="fouls" value="' + player.stats[week-1].fouls + '" min="0" max="5"/></td>';
				row += '<td><select name="start">';

				if(player.stats[week-1].started) {
					row += '<option value="false">No</option>';
					row += '<option value="true" SELECTED>Yes</option>';
				} else {
					row += '<option value="false">No</option>';
					row += '<option value="true" >Yes</option>';
				}

				row += '</select></td>';
			} else {
			// display new fields for new stats
				row += '<td><input type="number" name="points" value="0" min="0"/></td>';
				row += '<td><input type="number" name="fouls" value="0" min="0" max="5"/></td>';
				row += '<td><select name="start">';
				row += '<option value="false">No</option>';
				row += '<option value="true">Yes</option>';
				row += '</select></td>';
			}
			row += '</tr>';

			if(isHome)
				$('#homePlayers tbody').append(row);
			else
				$('#awayPlayers tbody').append(row);
		});
	}
}

