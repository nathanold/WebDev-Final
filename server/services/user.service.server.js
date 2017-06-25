var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var bcrypt = require("bcrypt-nodejs");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID: '1072113639555213',//process.env.FACEBOOK_CLIENT_ID,
    clientSecret: 'f85dfec52756573800cf4f455350ab9a',//process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback'//process.env.FACEBOOK_CALLBACK_URL
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function (user) {
                if (user) {
                    console.log('user found');
                    return done(null, user);
                } else {
                    var username = profile.displayName.toLowerCase().replace(/\s+/g, '');
                    var newFacebookUser = {
                        username: username,
                        firstName: profile.displayName.substr(0, profile.displayName.indexOf(' ')),
                        lastName: profile.displayName.substr(profile.displayName.indexOf(' ') + 1),
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    console.log(JSON.stringify(newFacebookUser));
                    return userModel.createUser(newFacebookUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                console.log('ok');
                console.log(user);
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );

}
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/#!/profile',
        failureRedirect: '/project/#!/login'
    }));
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/user', createUser);
app.get('/api/users', findAllUsers);

app.get('/api/user/username/:username', findUserByUsername); //fix this!
app.get('/api/user/username/:username/password/:password', findUserByCredentials);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.put('/api/:newsId', addFavorite);
app.put('/api/follow/:userId', followUser);

app.delete('/api/user/:userId', deleteUser);

app.post('/api/login', passport.authenticate('local'), login);
app.get('/api/checkLoggedIn', checkLoggedIn);
app.get('/api/checkAdmin', checkAdmin);

app.post('/api/logout', logout);
app.post('/api/register', register);
app.post('/api/registerAdmin', registerAdmin);

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function (user) {
                console.log(user);
                if (user && bcrypt.compareSync(password, user.password)) {
                    console.log('passwords match');
                    return done(null, user);

                } else {
                    console.log('no match');
                    return done(null, false);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function login(req, res) {
    var user = req.user;
    console.log('user, loggin in');
    res.json(user);
}
function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}
function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    console.log(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            console.log('logging the user in');
            req.login(user, function (status) {
                res.send(user);
            });
        }, function (err) {
            res.send(err);
        });
}
function registerAdmin(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.send(err);
        });
}
function deleteUser(req, res) {
    var userId = req.params.userId;
    console.log('deleting user: '+userId);
    userModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });

}
function addFavorite(req, res) {
    var user = req.body;
    var newsId = req.params.newsId;
    userModel
        .addFavorite(newsId, user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });

}
function followUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    console.log('server'+userId);

    userModel
        .followUser(userId, user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });

}

function findUserByCredentials(req, res) {
    var username = req.params.username;
    var password = req.params.password;
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserByUsername(req, res) {
    var username = req.params.username;
    console.log('finding by username');
    console.log(username);
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.send(err);
        });
}

function findAllUsers(req, res) {
    userModel
        .findAllUsers()
        .then(function (users) {
            res.send(users);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    /*var user = users.find(function (user) {
     return user._id === userId;
     });
     res.send(user);*/
}
function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.send(err);
        });
    // user._id = (new Date()).getTime() + "";
    // users.push(user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}
function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    }
    else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    }
    else {
        res.send('0');
    }
}
