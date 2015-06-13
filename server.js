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
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes');

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;        // set our port

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.use(function(req, res, next) {
	//res.locals.dfCharts = require('./lib/dfCharts.js');	
  next();
});

app.get('/', routes.index);

app.all('/api');

router.post('/api/pdf-gen', function(req, res) {
	console.log('called');
	console.log(req.body.htmlContent);
	var html = req.body.htmlContent || "Nothing";
	pdf.create(html).toBuffer(function(err, buffer){
		if (err) return res.end('unable to download pdf');
		console.log('Pdf Generation is working');		
		res.end(buffer);
	});
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use(router);

// START THE SERVER
// =============================================================================
app.listen(port, server_ip_address, function () {
 console.log( "Listening on " + server_ip_address + ", server_port " + port )
});
