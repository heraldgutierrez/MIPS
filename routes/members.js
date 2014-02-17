var mongoose = require('mongoose');
var ContactModel = mongoose.model('Contact');

exports.index = function(req, res) {
	var currUser = req.session.currentUser;

	res.render('members/members', {
		title	: 'MIPS Winnipeg - Members of MIPS',
		level	: currUser.level
		// level : 1
	});
};

exports.addMember = function(req, res) {
	var currUser = req.session.currentUser;

	res.render('members/add_member', {
		title	: 'MIPS Winnipeg - Add a New Member',
		level	: currUser.level
		// level : 1 
	});
};

exports.addNewContact = function(req, res) {
	var mr = req.body.mr;
	var mrs = req.body.mrs;
	var last = req.body.last;
	var address = req.body.address;
	var phone = req.body.phone;

	if((mr.length > 0 || mrs.length > 0) && last.length != 0) {
		var contact = new ContactModel({
			mr			: mr,
			mrs			: mrs,
			last		: last,
			address 	: address,
			phone 		: phone
		});

		contact.save(function(err, result) {
			res.redirect('/MembersOfMIPS/AddMember?success=true');
		});
	} else {
		var params = 'success=false&';
		params += 'mr=' + mr +'&';
		params += 'mrs=' + mrs +'&';
		params += 'last=' + last +'&';
		params += 'add=' + address +'&';
		params += 'tel=' + phone;
		res.redirect('/MembersOfMIPS/AddMember?' + params);
	}
}; // end: signup


/**************************************
	Database
***************************************/
exports.getAllContacts = function(req, res) {
	ContactModel.find({}).sort({ last : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
};