var app = require('../../express');
var newsModel = require('../models/news/news.model.server');

app.post('/api/news', createNews);
app.get('/api/news/:source', findAllNews);

app.get('/api/news/:newsId', findNewsById);
app.get('/api/news/f/:favId', findNewsByFavoriteId);
app.get('/api/news/:source', findNewsBySource);
app.get('/api/news/n/:newsId', findNewsByNewsId);


function createNews(req, res) {
    console.log('in the server!');
    var news = req.body;
    //console.log("news" + JSON.stringify(news));
    for (a in news.articles) {
        var ms = Date.now().valueOf();
        console.log(ms);
        articleNew = {
            author: news.articles[a].author,
            description: news.articles[a].description,
            date: news.articles[a].publishedAt,
            title: news.articles[a].title,
            url: news.articles[a].url,
            imageUrl: news.articles[a].urlToImage,
            favId: new Date().valueOf() + ms,
            source: news.source
        };
        console.log(articleNew.favId);
        newsModel.createNews(articleNew);
    }
}

function findNewsById(req, res) {
    console.log('in server.');
    var newsId = req.params['newsId'];
    newsModel
        .findNewsById(newsId)
        .then(function (news) {
            console.log('returning');
            res.json(news);
        });
}

function findAllNews(req, res) {
    var source = req.params['source']
    newsModel
        .findAllNews(source)
        .then(function (news) {
            res.json(news);
        });
}

function findNewsByFavoriteId(req, res) {
    var favId = req.params['favId'];
    console.log('finding in server');
    newsModel
        .findNewsByFavoriteId(favId)
        .then(function (news) {
            res.json(news);
        });
}

function findNewsByNewsId(req, res) {
    var newsId = req.params['newsId'];
    console.log('finding in server');
    newsModel
        .findNewsByNewsId(newsId)
        .then(function (news) {
            res.json(news);
        });
}

function findNewsBySource(req, res) {
    var source = req.params['source'];
    console.log('finding by source ' + source);
    newsModel
        .findNewsBySource(source)
        .then(function (news) {
            res.json(news);
        });
}
