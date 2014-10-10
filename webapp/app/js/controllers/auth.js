'use strict';

KylinApp.controller('LoginCtrl', function ($scope, $rootScope, $location, $base64, AuthenticationService, UserService) {
    $scope.username = null;
    $scope.password = null;
    $scope.loading = false;

    $scope.login = function () {
        // set the basic authentication header that will be parsed in the next request and used to authenticate
        httpHeaders.common['Authorization'] = 'Basic ' + $base64.encode($scope.username + ':' + $scope.password);

        $scope.loading = true;

        AuthenticationService.login({}, {}, function (data) {
            $scope.loading = false;
            $rootScope.$broadcast('event:loginConfirmed');
            UserService.setCurUser(data);
            $location.path(UserService.getHomePage());
        }, function (error) {
            $scope.loading = false;
            $scope.error = "Unable to login, please check your username/password and make sure you have L2 access.";
        });

        console.debug("Login event requested.");
    };
});