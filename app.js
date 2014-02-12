
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

// routes
var routes = require('./routes');
var basketball = require('./routes/basketball');
var isLoggedIn = routes.isLoggedIn;

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


app.get('/AddressBook', isLoggedIn, routes.addressBook);
app.get('/Basketball', basketball.schedule);


server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

