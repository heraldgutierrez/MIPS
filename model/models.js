var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// comparing _id
// var ObjectId = mongoose.Types.ObjectId;
// var id = new ObjectId('id string');
// OR
// var id = mongoose.Types.ObjectId('id string');

exports.generate = generate;

function generate() {
	var AddressModel = addressBook();
	var PlayerModel = player();
	var UserModel = user();
}


function addressBook() {
	var aBSchema = new Schema({
		mr			: String,
		mrs			: String,
		last_name	: String,
		phone 		: String,
		address 	: String
	});

	return mongoose.model('AddressBook', aBSchema);
}

function player() {
	var PSchema = new Schema({
		team 		: String,
		name 		: String,
		number 		: String,
		stats 		: [
			{
				week 	: Number,
				opp 	: String,
				points 	: Number,
				fouls 	: Number
			}
		]
	});

	return mongoose.model('Players', PSchema);
}

function schedule() {
	var SSchema = new Schema({
		season	: Number,
		week	: Number,
		date 	: Date,
		games 	: [
			{
				game 	: Number,
				time 	: String,
				home 	: String,
				homeScore : { type : Number, default : 0 },
				away 	: String,
				awayScore : { type : Number, default : 0 }
			}
		]
	});

	return mongoose.model('Schedule', SSchema);
}

function team() {
	var TSchema = new Schema({
		team 		: String,
		year 		: Number,
		wins		: { type : Number, default : 0 },
		losses		: { type : Number, default : 0 },
		players 	: [ 
			{ 
				name 	: String,
				number 	: String
			} 
		],
		games		: [
			{
				week		: Number,
				date 		: Date,
				opp			: String,
				teamScore 	: Number,
				oppScore	: Number,
				winner 		: String
			}
		]
	});

	return mongoose.model('Teams', TSchema);
}

function user() {
	var USchema = new Schema({
		username	: String,
		password 	: String,
		level		: Number
	});

	USchema.pre('save', function(next) {
		var user = this;

		if(!user.isModified('password'))
			return next();

		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if(err)
				return next(err);

			bcrypt.hash(user.password, salt, function(err, hash) {
				if(err)
					return next(err);

				user.password = hash;
				next();
			});
		});
	});

	USchema.methods.comparePassword = function(candidatePassword, cb) {
		bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
			if(err)
				return cb(err);
			cb(null, isMatch);
		});
	};

	return mongoose.model('Users', USchema);
}
