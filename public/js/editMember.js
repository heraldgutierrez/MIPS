$(document).ready(function() {
	var str = '';
	var num = '';

	var query = getURLParam('success');
	if(query == 'false')
		$('#warning').delay(3000).fadeOut('slow');

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
			
			num += String.fromCharCode(e.which);
			str += String.fromCharCode(e.which);

			if(num.length == 3)
				str += ') ';
			else if(num.length == 6)
				str += '-';
		}
	}).keyup(function() {
		$(this).val(str);
	});

	$('#mr, #mrs, #last, #children').focusout(function() {
		var str = $(this).val();
		$(this).val(str.capitalize());
	});
});

String.prototype.capitalize = function() {
	var str
	str = this.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}