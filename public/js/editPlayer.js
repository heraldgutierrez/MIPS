$(document).ready(function() {
	fillTeams();

	var query = getURLParam('success');
	if(query == 'false')
		$('#warning').delay(3000).fadeOut('slow');
});

function fillTeams() {
	$.getJSON(
		'/getAllTeams',
		function(data) {
			updateTeams( data );
		}
	);
}

function updateTeams(teams) {
	var option;
	var currTeam = $('#team').val();

	if(teams.length != 0) {
		$.each(teams, function(i, team) {
			option = '<option value="' + team.team + '" ';
			option += currTeam == team.team ? 'Selected >' : '>';
			option += team.team;
			option += '</option>';
			$('#teams').append(option);
		});
	} else {
		option = '<option value="None">No Teams Available</option>';
		$('#teams').append(option);
	}
}