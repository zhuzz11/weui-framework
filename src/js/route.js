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
            title: "home",
            templateUrl: 'view/template/home.html'
        });

    $stateProvider
        .state('memberEdit', {
            cache: false,
            url: '/edit',
            title: "买保险就是买服务",
            templateUrl: 'view/template/member_edit.html'
        });

    $stateProvider
        .state('order', {
            cache: false,
            url: '/order',
            title: "预约4S店",
            templateUrl: 'view/template/order.html'
        });
}]);