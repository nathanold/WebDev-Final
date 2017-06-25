(function () {
    angular
        .module('NewsProject')
        .controller('externalProfileController', externalProfileController);

    function externalProfileController(userService, apiTestService, currentUser, $routeParams) {
        var model = this;
        var username = $routeParams['username'];
        console.log(username);
        model.currentUser = currentUser;
        function init() {
            console.log('finding users');
            userService
                .findUserByUsername(username)
                .then(renderWebsites);

        }

        function renderWebsites(user) {
            model.user = user;
            console.log(model.user);
            var fullFavs = [];
            for (f in user.favorites) {
                console.log(user.favorites[f]);
                apiTestService
                    .findNewsByNewsId(user.favorites[f])
                    .then(function (response) {
                        console.log(response);
                        fullFavs.push(response[0]);
                        console.log(fullFavs);

                    })
            }
            model.news = fullFavs;
        }

        init();

        model.followUser = function () {
            console.log('following');
            userService
                .followUser(model.user._id, currentUser)
                .then(function (response) {

                });
        }
    }
})();