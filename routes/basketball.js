var mongoose = require('mongoose');
var ScheduleModel = mongoose.model('Schedule');

exports.schedule = function(req, res) {
	res.render('basketball/schedule', {
		title	: 'MIPS Winnipeg - Basketball Schedule'
	});
};

exports.schedule2 = function(req, res) {
	res.render('basketball/schedule2', {
		title	: 'MIPS Winnipeg - Basketball Schedule'
	});
};


/**************************************
	Database
***************************************/
exports.getScheduleByYear = function(req, res) {
	var season = req.body.season;
	// var season = req.params.season;

	if(season == undefined) {
		var date = new Date();
		season = date.getFullYear();
	}

	ScheduleModel.find({ season : season }).sort({ week : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
}

exports.getScheduleByWeek = function(req, res) {
	// var season = req.body.season;
	// var week = req.body.week;

	var season = req.query.season;
	var week = req.query.week;

	ScheduleModel.find({
		season 	: season,
		week 	: week
	}).sort({ week : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
}

exports.getTeams = function(req, res) {
	var season = req.body.season;
	// var season = req.params.season;

	if(season == undefined) {
		var date = new Date();
		season = date.getFullYear();
	}

	ScheduleModel.find({ season : season }).sort({ week : 1 }).exec(
		function(err, result) {
			res.json(result);
		}
	);
}