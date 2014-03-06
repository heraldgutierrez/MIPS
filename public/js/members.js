$(document).ready(function() {
	getAllMembers();
});

function getAllMembers() {
	$.getJSON(
		'/getAllContacts',
		function(data) {
			updateTable( data );
		}
	);
}

function updateTable(members) {
	var row;
	var body = '';
	var level = $('.main-container').attr('data-level');

	if(members.length != 0) {
		$.each(members, function(i, user) {
			row = '<tr>';
			row += '<td>' + user.last + '</td>';
			row += '<td>' + user.mr + '</td>';
			row += '<td>' + user.mrs + '</td>';
			row += '<td>' + user.children + '</td>';
			row += '<td>' + user.address + '</td>';
			row += '<td>' + user.phone +'</td>';

			if(level < 3) {
				row += '<td>';
				row += '<a href="/MembersOfMIPS/EditMember/' + user._id + '">Edit</a>';
				row += '</td>';
			}
			row += '</tr>';

			$('#myContacts tbody').append(row);
		});
	} else {
		row = '<tr>';
		row += '<td class="noContacts" colspan="6">No Contacts in the Address Book</td>';
		row += '</tr>';

		$('#myContacts tbody').append(row);
	}
}