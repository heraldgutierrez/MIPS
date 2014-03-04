
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.createServer(app);

// mongodb
var mongoose = require('mongoose');
var mongoDBConnect = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/mips';
mongoose.connect(mongoDBConnect);

// models
var models = require('./model/models');
models.generate();

// populate database
var populate = require('./model/populate');
populate.tryPopulate();

// routes
var routes = require('./routes');
var members = require('./routes/members');
var basketball = require('./routes/basketball');
var isAdmin = routes.isAdmin;
var isLoggedIn = routes.isLoggedIn;
var isMod = routes.isMod;

// all environments
app.configure(function() {
	app.set('port', process.env.PORT || 5000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

// development only
app.configure('development', function() {
	app.use(express.errorHandler());
});


/*********************************************************
**********************************************************
*
*	HTML pages/handlers
*
*********************************************************
*********************************************************/

app.get('/', routes.index);
app.get('/login', routes.login);				// login page
app.get('/signup', routes.signup);				// signup page
app.post('/loginUser', routes.loginUser);		// user login
app.post('/signupUser', routes.signupUser);		// user signup

app.get('/Admin', isLoggedIn, isAdmin, routes.admin);

// Address Book
app.get('/MembersOfMIPS', isLoggedIn, members.index);
app.get('/MembersOfMIPS/AddMember', isLoggedIn, isMod, members.addMember);
app.get('/MembersOfMIPS/EditMember/:id', isLoggedIn, isMod, members.editMember);

// Address Book DB
app.post('/addNewContact', members.addNewContact);
app.post('/editContact', members.editPrevContact);
app.get('/getAllContacts', members.getAllContacts);


/*********************************************************/
// Basketball Pages
app.get('/Basketball', basketball.schedule);
app.get('/Basketball/Schedule', basketball.schedule);
app.get('/Basketball/Standings', basketball.standings);
app.get('/Basketball/TeamStats/:team', basketball.teamStats);
app.get('/Basketball/Player/:player', basketball.playerStats);
app.get('/Basketball/AllPlayers', basketball.allPlayers);
app.get('/Basketball/UpdateStats', isLoggedIn, isAdmin, basketball.updateStats);


// Basketball DB
app.get('/getScheduleByYear', basketball.getScheduleByYear);
app.get('/getScheduleByWeek', basketball.getScheduleByWeek);
app.get('/getAllTeams', basketball.getAllTeams);
app.get('/getTeamByName', basketball.getTeamByName);
app.get('/getPlayer', basketball.getPlayer);
app.get('/getAllPlayers', basketball.getAllPlayers);
app.get('/getPlayersByTeam', basketball.getPlayersByTeam);
app.post('/updateGameStats', isLoggedIn, isAdmin, basketball.updateGameStats);



server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

