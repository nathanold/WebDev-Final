(function () {
    angular
        .module('NewsProject')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/news', {
                templateUrl: 'newspages/templates/news-search.html',
                controller: 'newsSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/explore', {
                templateUrl: 'user/explore/templates/explore.html',
                controller: 'exploreController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:username', {
                templateUrl: 'user/explore/templates/external-profile.html',
                controller: 'externalProfileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/apiTest', {
                templateUrl: 'user/templates/api-test.html',
                controller: 'apiTestController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'user/templates/login.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'user/templates/register.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/admin', {
                templateUrl: 'user/admin/templates/admin.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/profile', {
                templateUrl: 'user/templates/profile.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/details/:newsId', {
                templateUrl: 'newspages/templates/news-details.html',
                controller: 'newsDetailsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            });
        function checkLoggedIn($q, $location, userService) {
            var deferred = $q.defer();
            userService.checkLoggedIn()
                .then(function (currentUser) {
                    console.log('current user ' + currentUser);
                    if (currentUser === '0') {
                        deferred.reject();
                        $location.url('/login')
                    } else {
                        deferred.resolve(currentUser);
                    }
                });
            return deferred.promise;
        }

        function checkCurrentUser($q, $location, userService) {
            var deferred = $q.defer();
            userService.checkLoggedIn()
                .then(function (currentUser) {
                    console.log('current user ' + currentUser);

                    if (currentUser === '0') {
                        deferred.resolve({});
                    } else {
                        deferred.resolve(currentUser);
                    }
                });
            return deferred.promise;
        }

        function checkAdmin($q, $location, userService) {
            var deferred = $q.defer();
            userService.checkAdmin()
                .then(function (currentUser) {
                    console.log('current user ' + currentUser);
                    if (currentUser === '0') {
                        deferred.resolve({});
                        $location.url('/');
                    } else {
                        deferred.resolve(currentUser);
                    }
                });
            return deferred.promise;
        }
    }
})();