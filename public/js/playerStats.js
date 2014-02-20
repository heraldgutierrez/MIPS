$(document).ready(function() {
	getStats($('#player').attr('data-player'));
});

function getStats(player) {
	console.log(player);
	$.getJSON(
		'/getPlayer',
		{ player : player },
		function(data) {
			updateTable( data );
		}
	);
}

function updateTable(players) {
	var row;
	var stats;

	if(players.length != 0) {
		$.each(players, function(i, player) {
			stats = player.stats;

			for(var j = 0; j < stats.length; j++) {
				row = '<tr>';
				row += '<td>' + stats[j].week + '</td>';
				row += '<td>' + stats[j].date + '</td>';
				row += '<td>' + stats[j].opp + '</td>';
				row += '<td>' + stats[j].points + '</td>';
				row += '<td>' + stats[j].fouls + '</td>';

				if(stats[j].started)
					row += '<td>Yes</td>';
				else
					row += '<td>No</td>';
				row += '</tr>';
				$('#player tbody').append(row);
			}
		});
	} else {
		row = '<tr>';
		row += '<td colspan="6">Player Not Found.</td>';
		row += '</tr>';

		$('#player tbody').append(row);
	}
}
