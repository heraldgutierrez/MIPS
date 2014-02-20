$(document).ready(function() {
	getStandings();
});

function getStandings() {
	$.getJSON(
		'/getAllTeams',
		{ sort : 'rank' },
		function(data) {
			updateTable( data );
		}
	);
}

function updateTable(teams) {
	var row;
	var body = '';

	if(teams.length != 0) {
		$.each(teams, function(i, team) {
			row = '<tr>';

			row += '<td>' + (i + 1) + '</td>';
			row += '<td>' + team.team + '</td>';
			row += '<td>' + team.wins + '</td>';
			row += '<td>' + team.losses + '</td>';

			row += '</tr>';

			$('#standing tbody').append(row);
		});
	} else {
		row = '<tr>';
		row += '<td colspan="4">No Teams</td>';
		row += '</tr>';

		$('#standing tbody').append(row);
	}
}
