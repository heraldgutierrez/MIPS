$(document).ready(function() {
	getSchedule();
	fillTeams();

	$('#narrowSchedule').change(function() {
		narrowSchedule($(this).val());
	});
});

function getSchedule() {
	$.getJSON(
		'/getScheduleByYear',
		function(data) {
			updateTable( data );
		}
	);
}

function updateTable(schedule) {
	var row;

	if(schedule.length != 0) {
		$.each(schedule, function(i, week) {
			var wGames = week.games;
			var hs, as;

			for(var j = 0; j < wGames.length; j++) {
				hs = wGames[j].homeScore;
				as = wGames[j].awayScore;

				row = '<tr>';

				row += '<td>' + week.week + '</td>';
				row += '<td>' + week.date + '</td>';
				row += '<td>' + wGames[j].game + '</td>';
				row += '<td>' + wGames[j].time + '</td>';

				if(hs > as) {
					row += '<td class="winner">' + wGames[j].home +'</td>';
					row += '<td class="winner">' + wGames[j].homeScore +'</td>';
				} else {
					row += '<td>' + wGames[j].home +'</td>';
					if(hs == 0)
						row += '<td></td>';	
					else
						row += '<td>' + wGames[j].homeScore +'</td>';
				}
					

				if(as > hs) {
					row += '<td class="winner">' + wGames[j].away +'</td>';
					row += '<td class="winner">' + wGames[j].awayScore +'</td>';
				} else {
					row += '<td>' + wGames[j].away +'</td>';
					if(as == 0)
						row += '<td></td>';	
					else
						row += '<td>' + wGames[j].awayScore +'</td>';
				}

				row += '</tr>';

				$('#schedule tbody').append(row);
			}
		});
	} else {
		row = '<tr>';
		row += '<td class="noContacts" colspan="5">No Games Scheduled</td>';
		row += '</tr>';

		$('#schedule tbody').append(row);
	}
}

function fillTeams() {
	$.getJSON(
		'/getAllTeams',
		{ sort : 'rank' },
		function(data) {
			updateTeam(data);
		}
	);
}

function updateTeam(teams) {
	var option;

	if(teams.length != 0) {
		$.each(teams, function(i, team) {
			option = '<option value="' + team.team + '">';
			option += team.team;
			option += '</option>';

			$('#home').append(option);
			$('#away').append(option);
		});
	}
}


function narrowSchedule(team) {
	if(team == 'All') {
		$('#schedule tbody tr').show();
	} else {
		$('#schedule tbody tr').hide();
		$('#schedule tbody tr td:contains("' + team + '")').parent().show();
	}
}
