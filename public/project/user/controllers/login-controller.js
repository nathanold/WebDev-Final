(function () {
    angular
        .module('NewsProject')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {
            console.log('username: ' + username);
            console.log('password: ' + password);
            if (!username) {
                model.message = "Username is required, please try again";
                console.log('no username');
                return;
            }
            if (!password) {
                model.message = "Password is required, please try again";
                console.log('no pw');
                return;
            }
            userService
            // .findUserByCredentials(username, password)
                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again";
            }

            function login(found) {
                if (found !== null) {
                    $location.url('/profile');
                    // $scope.message = "Welcome " + username;
                } else {
                    model.message = "Username " + username + " not found, please try again";
                }
            }
        };
    }
})();