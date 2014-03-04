var mongoose = require('mongoose');
var ContactModel = mongoose.model('Contact');
var ObjectId = mongoose.Types.ObjectId;

exports.index = function(req, res) {
	var currUser = req.session.currentUser;

	res.render('members/members', {
		title	: 'MIPS Winnipeg - Members of MIPS',
		level	: currUser.level
	});
};

exports.addMember = function(req, res) {
	var currUser = req.session.currentUser;

	res.render('members/add_member', {
		title	: 'MIPS Winnipeg - Add a New Member',
		level	: currUser.level
	});
};

exports.addNewContact = function(req, res) {
	var mr = req.body.mr;
	var mrs = req.body.mrs;
	var last = req.body.last;
	var children = req.body.children;
	var address = req.body.address;
	var phone = req.body.phone;

	if((mr.length > 0 || mrs.length > 0) && last.length != 0) {
		var contact = new ContactModel({
			mr			: mr,
			mrs			: mrs,
			last		: last,
			children	: children,
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
		params += 'children=' + children + '&';
		params += 'add=' + address +'&';
		params += 'tel=' + phone;
		res.redirect('/MembersOfMIPS/AddMember?' + params);
	}
}; // end: signup

exports.editMember = function(req, res) {
	var id = req.params.id;
	var currUser = req.session.currentUser;
	var success = req.query.success == undefined ? true : false;

	ContactModel.findOne({ _id : new ObjectId(id) }).exec(
		function(err, result) {
			res.render('members/edit_member', {
				title	: 'MIPS Winnipeg - Edit Member',
				level	: currUser.level,
				id 		: id,
				mr 		: result.mr,
				mrs 	: result.mrs,
				last 	: result.last,
				children : result.children,
				address : result.address,
				phone 	: result.phone,
				success : success
			});
		}
	);
};

exports.editPrevContact = function(req, res) {
	var id = req.body.id;
	var mr = req.body.mr;
	var mrs = req.body.mrs;
	var last = req.body.last;
	var children = req.body.children;
	var address = req.body.address;
	var phone = req.body.phone;

	if((mr.length > 0 || mrs.length > 0) && last.length != 0) {
		ContactModel.findOne({ _id : new ObjectId(id) }).exec(
			function(err, result) {
				result.mr = mr;
				result.mrs = mrs;
				result.last = last;
				result.children = children;
				result.address = address;
				result.phone = phone;

				result.save();
				res.redirect('/MembersOfMIPS');
			}
		);
	} else {
		res.redirect('/MembersOfMIPS/EditMember/' + id + '?success=false');
	}
};


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