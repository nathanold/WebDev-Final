(function () {
    angular
        .module('NewsProject')
        .controller('newsSearchController', newsSearchController);

    function newsSearchController(apiTestService, currentUser, userService) {//currentUser){
        var model = this;
        model.currentUser = currentUser;

        model.getNews = function (source) {
            apiTestService
                .getNews(source)
                .then(function (response) {
                    console.log("response: " + JSON.stringify(response));
                    model.news = response;
                }, function (err) {
                    return err;
                });
        };
        model.favorite = function (newsId) {
            userService
                .addFavorite(currentUser, newsId)
                .then(function (response) {
                    console.log('done');
                    location.reload();
                }, function (err) {
                    return err;
                });
        };
        /*
         model.notFavorited = function (favId){
         apiTestService
         .findNewsByFavoriteId(favId)
         .then(function(response){
         return response.data;
         })
         }
         */
    }
})();