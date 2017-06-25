(function () {
    angular
        .module('NewsProject')
        .controller('newsDetailsController', newsDetailsController);

    function newsDetailsController(apiTestService, $routeParams, currentUser) {//currentUser){
        var model = this;
        model.currentUser = currentUser;
        console.log(currentUser);
        model.newsId = $routeParams['newsId'];
        function init() {
            apiTestService
                .findNewsByFavoriteId(model.newsId)
                .then(renderNews);
        }
        init();
        function renderNews(news) {
            console.log(news);
            model.news = news;
        }

    }
})();