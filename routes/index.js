var mongoose = require('mongoose');
var UserModel = mongoose.model('Users');
/*
 * GET home page.
 */

exports.index = function(req, res){
	// res.render('index');
	res.render('layout');
};

exports.login = function(req, res) {
	res.render('login');
};

exports.signup = function(req, res) {
	res.render('signup');
};

exports.addressBook = function(req, res) {
	res.send('Address Book');
};

exports.isLoggedIn = function(req, res, next) {
	if(!req.session.currentUser) {
        res.redirect('/login');
	} else {
		next();
	}
}

exports.loginUser = function(req, res) {
	var name = req.body.username;
	var pass = req.body.password;

	console.log('Attempting to login: ' + name);

	UserModel.findOne({ username : name },
		function(err, user) {
			if(err)
				throw err;

			if(user == null) {
				res.redirect('/login?warning=incorrect');
			} else {
				user.comparePassword(pass, function(err, isMatch) {
					if(err)
						throw err;

					if(isMatch) {
						req.session.currentUser = user;
						res.redirect('/AddressBook');
					} else {
						res.redirect('/login?warning=incorrect');
					}
				});
			}
		}// end: function
	);// end: findOne
};

exports.signupUser = function(req, res) {
	var name = req.body.username;
	var pass = req.body.password;
	var verifyPass = req.body.verifyPassword;

	if(pass == verifyPass) {
		var newUser = new UserModel({
			username : name,
			password : pass
		});

		// need to check if the username already exists
		UserModel.findOne({ username : name },
			function(err, result_1) {
				// if(result == null) --> no users exists, okay to save new user
				if(result_1 == null) {
					// save new user
					newUser.save(function(err, result_2) {
						req.session.currentUser = newUser;

						console.log(name + ' has been added.');
						res.redirect('/');
					});
				} else {
					// reload home page with warning that username already exists
					console.log(name + ' already exists.');
					res.redirect('/login?warning=usernameExists');
				}
			}// end: function
		);// end: findOne
	} else {
		console.log('Password doesn\'t match verify password');
		res.redirect('/login?warning=verifyPassword');
	}
}; // end: signup