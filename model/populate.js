var mongoose = require('mongoose');
var ScheduleModel = mongoose.model('Schedule');

exports.tryPopulate = tryPopulate;

function tryPopulate() {
	console.log('Trying to Populate...');

	ScheduleModel.find({}, function(err, result) {
		if(result.length == 0)
			populateSchedule();
	});

	console.log('Populating Complete...');
}

// Pre-populate the "Schedule" collection
function populateSchedule() {
	console.log('Starting: Populating Schedule...');
	var schedules = [
		new ScheduleModel({
			season	: 2014,
			week	: 1,
			date 	: new Date('Feb 1, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '2 pm',
					home 	: 'White',
					homeScore : 54,
					away 	: 'Green',
					awayScore : 38
				},
				{
					game 	: 2,
					time 	: '3 pm',
					home 	: 'Black',
					homeScore : 34,
					away 	: 'Yellow',
					awayScore : 33
				},
				{
					game 	: 3,
					time 	: '4 pm',
					home 	: 'Blue',
					homeScore : 47,
					away 	: 'Red',
					awayScore : 35
				}
			]
		}),
		new ScheduleModel({
			season	: 2014,
			week	: 2,
			date 	: new Date('Feb 8, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: 'Black',
					homeScore : 37,
					away 	: 'Red',
					awayScore : 45
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: 'Blue',
					homeScore : 51,
					away 	: 'White',
					awayScore : 30
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: 'Yellow',
					homeScore : 40,
					away 	: 'Green',
					awayScore : 25
				}
			]
		}),
		new ScheduleModel({
			season	: 2014,
			week	: 3,
			date 	: new Date('Feb 15, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: 'Green',
					homeScore : 23,
					away 	: 'Blue',
					awayScore : 35
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: 'Yellow',
					homeScore : 24,
					away 	: 'Red',
					awayScore : 31
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: 'Black',
					homeScore : 46,
					away 	: 'White',
					awayScore : 57
				}
			]
		}),
		new ScheduleModel({
			season	: 2014,
			week	: 4,
			date 	: new Date('Feb 22, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: 'White',
					away 	: 'Yellow',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: 'Black',
					away 	: 'Blue',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: 'Red',
					away 	: 'Green',
				}
			]
		}),
		new ScheduleModel({
			season	: 2014,
			week	: 5,
			date 	: new Date('March 1, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: 'Green',
					away 	: 'Black',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: 'White',
					away 	: 'Red',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: 'Yellow',
					away 	: 'Blue',
				}
			]
		}),
		new ScheduleModel({
			season	: 2014,
			week	: 6,
			date 	: new Date('March 8, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: 'Red',
					away 	: 'Yellow',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: 'White',
					away 	: 'Black',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: 'Blue',
					away 	: 'Green',
				}
			]
		}),
		new ScheduleModel({
			season	: 2014,
			week	: 7,
			date 	: new Date('March 15, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: 'Green',
					away 	: 'White',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: 'Yellow',
					away 	: 'Black',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: 'Red',
					away 	: 'Blue',
				}
			]
		}),
		new ScheduleModel({
			season	: 2014,
			week	: 8,
			date 	: new Date('March 22, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: 'Blue',
					away 	: 'Black',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: 'Green',
					away 	: 'Red',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: 'Yellow',
					away 	: 'White',
				}
			]
		}),
		new ScheduleModel({
			season	: 2014,
			week	: 9,
			date 	: new Date('March 29, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: 'Yellow',
					away 	: 'Green',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: 'Red',
					away 	: 'Black',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: 'Blue',
					away 	: 'White',
				}
			]
		}),
		new ScheduleModel({
			season	: 2014,
			week	: 10,
			date 	: new Date('April 5, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: 'White',
					away 	: 'Red',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: 'Yellow',
					away 	: 'Blue',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: 'Black',
					away 	: 'Green',
				}
			]
		})
	];

	for(var i = 0; i < schedules.length; i++) {
		schedules[i].save(function(err, result) {});
	}

	console.log('Done: Populating Schedule.');
}