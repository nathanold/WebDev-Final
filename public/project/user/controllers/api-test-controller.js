(function () {
    angular
        .module('NewsProject')
        .controller('apiTestController', apiTestController);

    function apiTestController(apiTestService) {
        var model = this;

        model.getNews = function(source) {
            apiTestService
                .getNews(source)
                .then(function (response) {
                    model.news = response.data;
                    console.log(model.news.articles);
                    for (n in model.news.articles){
                        console.log(model.news.articles[n]);
                        var img = n.urlToImage + "";
                        console.log(img);
                        console.log(n.urlToImage);
                        img.substring(0, img.length - 1);
                        n.urlToImage = img;
                    }
                });
        }
    }

})();