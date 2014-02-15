$(document).ready(function() {
	var str = '';
	var num = '';
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
});

String.prototype.capitalize = function() {
	this = this.toLowerCase();
	this = this.charAt(0).toUpperCase() + this.slice(1);
	return this;
}
