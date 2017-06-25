(function () {
    angular
        .module('NewsProject')
        .controller('exploreController', exploreController);

    function exploreController(userService, currentUser) {
        var model = this;
        model.currentUser = currentUser;
        function init() {
            console.log('finding all users');
            userService
                .findAllUsers()
                .then(renderWebsites);
        }
        function renderWebsites(users) {
            model.users = users;
            console.log(model.users);
        }
        init();
    }
})();