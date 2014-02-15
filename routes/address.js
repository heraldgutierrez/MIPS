exports.index = function(req, res) {
	var currUser = req.session.currentUser;

	res.render('address/layoutAddress', {
		// level	: currUser.level
		level : 1
	});
};

exports.addMember = function(req, res) {
	var currUser = req.session.currentUser;

	res.render('address/add_member', {
		// level	: currUser.level
		level :1 
	});
	// res.send('Add Member');
};