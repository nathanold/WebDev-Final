var app = require('../../express');
var userModel = require('../models/user/user.model.server');
app.post('/api/assignment/user', createUser);
app.get('/api/assignment/user/username/:username', findUserByUsername); //fix this!
app.get('/api/assignment/user/username/:username/password/:password', findUserByCredentials);
app.get('/api/assignment/user/:userId', findUserById);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);


function deleteUser(req, res) {
    var userId = req.params.userId;
    var user = users.find(function (user) {
        return user._id === userId;
    });
    var index = users.indexOf(user);
    users.splice(index, 1);
    res.sendStatus(200);
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    for (var u in users) {
        if (userId === users[u]._id) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
function findUserByCredentials(req, res) {
    var username = req.params.username;
    var password = req.params.password;
    console.log('finding by creds');
    console.log([username, password]);
    for (var u in users) {
        console.log('looking');
        var user = users[u];
        if (user.username === username &&
            user.password === password) {
            res.json(user);
            return;
        }
    }
}

function findUserByUsername(req, res) {
    var username = req.params.username;
    console.log('finding by username');
    console.log(username);
    var user = users.find(function (user) {
        console.log("found user: "+user );
        return user.username === username;
    });
    if (typeof user === 'undefined') {
        console.log('not found')
        return null;
    }
    else
        return user;
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    var user = users.find(function (user) {
        return user._id === userId;
    });
    res.send(user);
}
function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function(doc){
            res.send(user);
        });
   // user._id = (new Date()).getTime() + "";
   // users.push(user);
}