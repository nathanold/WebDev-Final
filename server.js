var app = require('./express'); // creates an instance of the express lib
var express = app.express;

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public')); //anything under the public directory will
                                                // be static and send it verbatim; slash is now public/


app.use(cookieParser());
app.use(session({ secret: "this is secret" }));
app.use(passport.initialize());
app.use(passport.session());


require ("./server/app.js");

//require ("C:/Users/natha/Google Drive/CS4550/Assignment1Template/oldakowski-n-webdev/public/assignment/app.js")(app);

var port = process.env.PORT || 3000;

//var myApp = require('public/lectures/app.js'); //.js is optional
//myApp(app);
//console.log(myApp);
app.listen(port);