$(document).ready(function() {
	getAllTeams();
});

function getAllTeams() {
	$.getJSON(
		'/getAllTeams',
		{ sort : 'name' },
		function(data) {
			updateList( data );
		}
	);
}

function updateList(teams) {
	var li;
	
	$.each(teams, function(i, team) {
		li = '<li>';
		li += '<a href="/Basketball/TeamStats/' + team.team + '">' + team.team + '</a>';
		li += '</li>';
		$('#ul_Teams').append(li);
	});
}
