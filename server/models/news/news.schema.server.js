var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    author: String,
    description: String,
    date: {type: Date, default: Date.now},
    title: {type: String, require: true},
    url: {type: String, require: true},
    imageUrl: String,
    favId: String,
    source: String
}, {collection: "news"});

module.exports = newsSchema;