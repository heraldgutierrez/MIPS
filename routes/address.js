var mongoose = require('mongoose');
var ContactModel = mongoose.model('Contact');

exports.index = function(req, res) {
	var currUser = req.session.currentUser;

	res.render('address/address_book', {
		level	: currUser.level
		// level : 1
	});
};

exports.addMember = function(req, res) {
	var currUser = req.session.currentUser;

	res.render('address/add_member', {
		level	: currUser.level
		// level : 1 
	});
	// res.send('Add Member');
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
			res.redirect('/AddressBook/AddMember?success=true');
		});
	} else {
		var params = 'success=false&';
		params += 'mr=' + mr +'&';
		params += 'mrs=' + mrs +'&';
		params += 'last=' + last +'&';
		params += 'add=' + address +'&';
		params += 'tel=' + phone;
		res.redirect('/AddressBook/AddMember?' + params);
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