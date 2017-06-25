var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    email: String,
    dateCreated: {type: Date, default: Date.now},
    facebook: {
        id: String,
        token: String
    },
    roles: [{type: String, default: 'USER', enum: ['USER', 'ADMIN']}],
    following: [{type: mongoose.Schema.ObjectId, ref: "UserModel"}],
    favorites: [String]

}, {collection: "user"});

module.exports = userSchema;