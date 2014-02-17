$(document).ready(function() {
	getSchedule();

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
	var body = '';

	if(schedule.length != 0) {
		$.each(schedule, function(i, week) {
			var wGames = week.games;
			var date = new Date(week.date);
			date = date.getShortDate();
			var hs, as;

			for(var j = 0; j < wGames.length; j++) {
				hs = wGames[j].homeScore;
				as = wGames[j].awayScore;

				row = '<tr>';

				row += '<td>' + week.week + '</td>';
				row += '<td>' + date + '</td>';
				row += '<td>' + wGames[j].game + '</td>';
				row += '<td>' + wGames[j].time + '</td>';

				if(hs > as)
					row += '<td class="winner">' + wGames[j].home +'</td>';
				else
					row += '<td>' + wGames[j].home +'</td>';

				if(hs == 0)
					row += '<td></td>';	
				else
					row += '<td>' + wGames[j].homeScore +'</td>';

				if(as > hs)
					row += '<td class="winner">' + wGames[j].away +'</td>';
				else
					row += '<td>' + wGames[j].away +'</td>';

				if(as == 0)
					row += '<td></td>';	
				else
					row += '<td>' + wGames[j].awayScore +'</td>';


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

function narrowSchedule(team) {
	if(team == 'All') {
		$('#schedule tbody tr').show();
	} else {
		$('#schedule tbody tr').hide();
		$('#schedule tbody tr td:contains("' + team + '")').parent().show();
	}
}

// function getTeams() {

// }

// function updateSelection() {
// 	option(value='All') Show All Teams
// 	option(value='Black') Black
// 	option(value='Blue') Blue
// 	option(value='Green') Green
// 	option(value='Red') Red
// 	option(value='White') White
// 	option(value='Yellow') Yellow
// }

Date.prototype.getShortDate = function() {
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

	var yyyy = this.getFullYear();
	var mm = (this.getMonth()); 
	var dd  = this.getDate();

	return monthNames[mm] + ' ' + dd + ', ' + yyyy;
};