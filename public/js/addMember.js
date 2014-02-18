$(document).ready(function() {
	var str = '';
	var num = '';

	var query = getURLParam('success');
	if(query == 'true')
		showSuccess();
	else if(query == 'false') {

		showWarning();
		repopulateForm();
	} else 
		$('#warning').hide();

	$('#telephone').keydown(function(e) {
		if(e.which == 8) {
			// delete ') '
			if(num.length == 3)
				str = str.substring(0, str.length - 2);	

			num = num.substring(0, num.length - 1);
			str = str.substring(0, str.length - 1);

			if(num.length == 6)	// delete '-'
				str = str.substring(0, str.length - 1);	
			else if(num.length == 0)	// delete '('
				str = str.substring(0, str.length - 1);		
		} else if(e.which >= 48 && e.which <= 57 && num.length < 10) {
			if(num.length == 0)
				str = '(';
			else if(num.length == 3)
				str += ') ';
			else if(num.length == 6)
				str += '-';

			num += String.fromCharCode(e.which);
			str += String.fromCharCode(e.which);
		}
	}).keyup(function() {
		$(this).val(str);
	});

	$('#mr, #mrs, #last, #children').focusout(function() {
		var str = $(this).val();
		$(this).val(str.capitalize());
	});
});

function repopulateForm() {
	var mr = getURLParam('mr');
	var mrs = getURLParam('mrs');
	var last = getURLParam('last');
	var child = getURLParam('children');
	var add = getURLParam('add');
	var tel = getURLParam('tel');

	$('#mr').val(unescape(mr));
	$('#mrs').val(unescape(mrs));
	$('#last').val(unescape(last));
	$('#children').val(unescape(child));
	$('#address').val(unescape(add));
	$('#telephone').val(unescape(tel));
}

String.prototype.capitalize = function() {
	var str
	str = this.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

function showSuccess() {
	var warning = "<strong>Success:</strong> Contact has been added.";
	$('#warning').html(warning).addClass('success').delay(3000).fadeOut('slow');
}

function showWarning() {
    var warning = "<strong>Warning:</strong> Mr and Mrs field cannot both be blank.";
    var last = getURLParam('last');
    if(last == '')
    	warning = "<strong>Warning:</strong> Last name field cannot be blank.";
    
    $('#warning').html(warning).addClass('warning').delay(3000).fadeOut('slow');
}