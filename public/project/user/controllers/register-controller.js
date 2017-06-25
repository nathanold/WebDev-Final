(function () {
    angular
        .module('NewsProject')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {

            if(!password) {
                model.error = "Password is required";
                return;
            }
            if(!password2) {
                model.error = "Passwords are required";
                return;
            }
            if(!username) {
                model.error = "A username is required";
                return;
            }
            if(password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var found = null; //userService.findUserByUsername(username);

            if(found !== null) {
                model.error = "Username is not available";
            } else {
                var user = {
                    username: username,
                    password: password
                };
                userService
                    .register(user)
                    .then(function(user){
                        $location.url('/profile');
                    });
            }
        }
    }
})();