$(document).ready(function() {
	getStats();
	$('#players').tablesorter();

	$('#inputSearch').keyup(function(e){
		var str = $(this).val();
		if(str == '') {
			$('#players tbody tr').show();
			$('#empty').hide();
		} else {
			$('#players tbody tr').hide();
			$('#players tbody tr td:containsIgnoreCase("' + str + '")').parent().show();

			if($('#empty').is(':visible'))
				$('#empty').hide();
			
			if($('#players tbody').children(':visible').length == 0) {
				$('#empty').show();
			}
		}
	});
});

function getStats() {
	$.getJSON(
		'/getAllPlayers',
		function(data) {
			updateTable( data );
		}
	);
}

function updateTable(players) {
	var row;
	var stats;
	var games;
	var avgPt, avgF, avgS;
	var pts, fls, st;
	var name;

	if(players.length != 0) {
		$('#empty').hide();

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
			row += '<td>' + player.team + '</td>';
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

			$('#players tbody').append(row);
		});
	} else {
		$('#empty').show();
	}

	$("#players").trigger("update");
	var sorting = [[0,0]];
	$("#players").trigger("sorton",[sorting]);
}

$.extend($.expr[":"], {
	"containsIgnoreCase": function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
});
