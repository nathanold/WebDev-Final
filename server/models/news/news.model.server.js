var mongoose = require('mongoose');
var newsSchema = require('./news.schema.server');
var newsModel = mongoose.model('NewsModel', newsSchema);


newsModel.createNews = createNews;
newsModel.findNewsById = findNewsById;
newsModel.findNewsByFavoriteId = findNewsByFavoriteId;
newsModel.findNewsBySource = findNewsBySource;
newsModel.findAllNews = findAllNews;
newsModel.findNewsByNewsId = findNewsByNewsId;

module.exports = newsModel;
function createNews(news) {
    //console.log(news);
    return newsModel.create(news);
}

function findNewsById(newsId) {
    console.log('in model')
    return newsModel.findById(newsId);
}

function findAllNews(source) {
    return newsModel.find({source: source}).limit(8);
}
function findNewsByFavoriteId(favId) {
    return newsModel.find({favId: favId});
}
function findNewsByNewsId(newsId) {
    console.log(newsId+" in server");
    return newsModel.find({_id: newsId});
}
function findNewsBySource(source) {
    console.log(source + " finding");
    return newsModel.find({source: source});
}
