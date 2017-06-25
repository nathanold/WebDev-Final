(function () {
    angular.module('NewsProject')
        .controller('adminController', adminController);

    function adminController(userService, $location) {
        var model = this;

        function init() {
            console.log('finding all users');
            userService
                .findAllUsers()
                .then(renderWebsites);
        }

        function renderWebsites(users) {
            model.users = users;
            console.log(model.users);
            model.totalSize = model.users.length;

        }

        init();

        model.deleteUser = function (userId) {
            console.log('deleting user');
            userService.deleteUser(userId)
                .then(function () {
                    location.reload();
                })
        };
        model.updateUser = function (user) {
            console.log('updating user');
            userService.updateUser(user)
                .then(function () {
                    location.reload();
                })
        };

        model.register = function (username, password) {
            console.log('registering');
            var user = {
                username: username,
                password: password
            };
            userService
                .registerAdmin(user)
                .then(function(user){
                    location.reload();
                });
        }
    }
})
();