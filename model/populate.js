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
		new Schema({
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
		new Schema({
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
		new Schema({
			season	: 2014,
			week	: 3,
			date 	: new Date('Feb 15, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: 'Green',
					away 	: 'Blue',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: 'Yellow',
					away 	: 'Red',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: 'Black',
					away 	: 'White',
				}
			]
		}),
		new Schema({
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
		new Schema({
			season	: 2014,
			week	: 5,
			date 	: new Date('March 1, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: '',
					away 	: '',
				}
			]
		}),
		new Schema({
			season	: 2014,
			week	: 6,
			date 	: new Date('March 8, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: '',
					away 	: '',
				}
			]
		}),
		new Schema({
			season	: 2014,
			week	: 7,
			date 	: new Date('March 15, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: '',
					away 	: '',
				}
			]
		}),
		new Schema({
			season	: 2014,
			week	: 8,
			date 	: new Date('March 22, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: '',
					away 	: '',
				}
			]
		}),
		new Schema({
			season	: 2014,
			week	: 9,
			date 	: new Date('March 29, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: '',
					away 	: '',
				}
			]
		}),
		new Schema({
			season	: 2014,
			week	: 10,
			date 	: new Date('April 5, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: '',
					away 	: '',
				}
			]
		}),
		new Schema({
			season	: 2014,
			week	: 11,
			date 	: new Date('April 12, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: '',
					away 	: '',
				}
			]
		}),
		new Schema({
			season	: 2014,
			week	: 12,
			date 	: new Date('April 26, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: '',
					away 	: '',
				}
			]
		}),
		new Schema({
			season	: 2014,
			week	: 13,
			date 	: new Date('May 3, 2014'),
			games 	: [
				{
					game 	: 1,
					time 	: '1 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 2,
					time 	: '2 pm',
					home 	: '',
					away 	: '',
				},
				{
					game 	: 3,
					time 	: '3 pm',
					home 	: '',
					away 	: '',
				}
			]
		}),
		
		
	];

	for(var i = 0; i < schedules.length; i++) {
		schedules[i].save(function(err, result) {});
	}

	console.log('Done: Populating Schedule.');
}