// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var d3 = require('d3');
// this is for html to pdf
var pdf = require('html-pdf');
// this is for dynamic html or svg creation without any browser
var jsdom = require('jsdom');
var fs = require('fs');
var jade = require('jade');
var cheerio = require('cheerio');
app.set('view engine', 'jade');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;        // set our port

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.use(function(req, res, next) {
	//res.locals.dfCharts = require('./lib/dfCharts.js');	
  next();
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
router.post('/pdf-gen', function(req, res) {
	console.log('called');
	pdf.create("<h1>Hello World</h1>").toBuffer(function(err, buffer){
		if (err) return res.end('unable to download pdf');
		console.log('Pdf Generation is working');		
		res.end(buffer);
	});
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + port )
});
