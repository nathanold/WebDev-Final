console.log("SERVER SIDE!");
var app = require('../express'); // creates an instance of the express lib
var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/webdev_noldakowski_project';
if (process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var connectionString = 'mongodb://localhost/webdev_noldakowski_project'; // for local
if (process.env.MLAB_USERNAME) { // check if running remotely
    var username = process.env.MLAB_USERNAME; // get from environment
    var password = process.env.MLAB_PASSWORD;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137141.mlab.com:37141/heroku_vj9g0c7t'; // user yours
}
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;
require('./services/user.service.server');
require('./services/news.service.server');

app.get('/hello', sayHello);

function sayHello(req,res){
    res.send('hey there');
}
