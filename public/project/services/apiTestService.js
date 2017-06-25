(function () {
    angular
        .module('NewsProject')
        .service('apiTestService', apiTestService);

    function apiTestService($http) {

        var api = {
            getNews: getNews,
            createNews: createNews,
            findNewsById: findNewsById,
            findNewsByFavoriteId: findNewsByFavoriteId,
            findNewsBySource: findNewsBySource,
            findAllNews: findAllNews,
            findNewsByNewsId: findNewsByNewsId
        };
        return api;

        function getNews(source) {

            var key = "1f1174cdddac41178c1323ed7d899ddd";
            var urlBase = "https://newsapi.org/v1/articles?source=SOURCE&apiKey=API_KEY";

            var url = urlBase
                .replace("SOURCE", source)
                .replace("API_KEY", key);
            //console.log(url);
            return $http.get(url)
                .then(function (response) {
                    // console.log(response.data);
                    createNews(response.data);
                    // console.log('news created');
                    return findAllNews(source);

                }, function (err) {
                    return err;
                });
        }

        function createNews(news) {
            var url = "/api/news";
            console.log(url);
            //console.log(news);
            return $http.post(url, news)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err;
                });
        }

        function findNewsById(newsId) {
            var url = "/api/news/" + newsId;
            console.log('newsId: from api ' + url);
            return $http.get(url)
                .then(function (response) {
                    console.log('responsing ' + response.data);
                    return response.data;
                }, function (err) {
                    return err;
                });
        }

        function findAllNews(source) {
            var url = "/api/news/" + source;
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });
        }

        function findNewsBySource(source) {
            var url = "/api/news/" + source;
            console.log(url + " finding by source");
            return $http.get(url)
                .then(function (response) {
                    console.log('returning');
                    return response.data;
                }, function (err) {
                    return err;
                });
        }

        function findNewsByFavoriteId(favId) {
            var url = "/api/news/f/" + favId;
            console.log('getting by favId');
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findNewsByNewsId(newsId) {
            var url = "/api/news/n/" + newsId;
            console.log('getting by newsId');
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();