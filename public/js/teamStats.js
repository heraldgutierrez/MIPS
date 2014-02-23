$(document).ready(function() {
	var team = $('#teamStats').attr('data-team');
	getTeamStats(team);
	getPlayerStats(team);
});

function getTeamStats(team) {
	$.getJSON(
		'/getTeamByName',
		{ team : team },
		function(data) {
			updateTeamTable( data );
		}
	);
}

function updateTeamTable(stats) {
	var row;
	var games;
	var record;
	var home;
	var win;

	if(stats.length != 0) {
		$.each(stats, function(i, stat) {
			games = stat.games;
			record = 'Record: ' + stat.wins + '-' + stat.losses;
			$('#record').html(record);

			for(var j = 0; j < games.length; j++) {
				row = '<tr>';
				row += '<td>' + games[j].week + '</td>';
				row += '<td>' + games[j].date + '</td>';

				home = games[j].home ? 'vs ' : '@ ';
				row += '<td>' + home + games[j].opp + '</td>';

				win = games[j].winner ? 'W ' : 'L ';
				row += '<td>' + win + games[j].teamScore + '-' + games[j].oppScore + '</td>';

				row += '</tr>';
				$('#teamStats tbody').append(row);
			}
		});
	} else {
		row = '<tr>';
		row += '<td colspan="4">No Games Found.</td>';
		row += '</tr>';

		$('#teamStats tbody').append(row);
	}
}


function getPlayerStats(team) {
	$.getJSON(
		'/getPlayersByTeam',
		{ team : team },
		function(data) {
			updatePlayerTable( data );
		}
	);
}

function updatePlayerTable(players) {
	var row;
	var stats;
	var games;
	var avgPt, avgF, avgS;
	var pts, fls, st;
	var name;

	if(players.length != 0) {
		$.each(players, function(i, player) {
			avgPt = 0;
			avgF = 0;
			avgS = 0;
			pts = 0;
			fls = 0;
			st = 0;
			stats = player.stats;
			games = stats.length;
			name = player.name.replace(/[, ]/g,'');

			row = '<tr>';
			row += '<td><a href="/Basketball/Player/' + player.name + '">' + player.name + '</a></td>';
			row += '<td>' + player.number + '</td>';

			for(var j = 0; j < games; j++) {
				pts += stats[j].points;
				fls += stats[j].fouls;
				st += stats[j].started;

				avgPt += stats[j].points;
				avgF += stats[j].fouls;

				if(stats[j].started)
					avgS++;
			}
			avgPt = Math.round((avgPt / games) * 100) / 100;
			avgF = Math.round((avgF / games) * 100) / 100;
			avgS = Math.round((avgS / games) * 100) / 100;

			row += '<td>' + avgPt + '</td>';
			row += '<td>' + pts + '</td>';
			row += '<td>' + avgF + '</td>';
			row += '<td>' + fls + '</td>';
			row += '<td>' + avgS + '</td>';
			row += '<td>' + st + '</td>';

			row += '</tr>';

			$('#teamPlayers tbody').append(row);
		});
	} else {
		row = '<tr>';
		row += '<td colspan="8">No Players Found.</td>';
		row += '</tr>';

		$('#teamPlayers tbody').append(row);
	}
}
