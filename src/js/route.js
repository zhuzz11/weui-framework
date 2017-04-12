/**
 * Created by zhudm on 2017/4/12.
 */

angular.module("ctApp").config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/");
    $urlRouterProvider.when("/", "/home");

    $stateProvider
        .state('home', {
            cache: false,
            url: '/home',
            title: "定损",
            templateUrl: 'view/template/home.html'
        });

    $stateProvider
        .state('edit', {
            cache: false,
            url: '/edit',
            title: "定损",
            templateUrl: 'view/template/edit.html'
        });
}]);