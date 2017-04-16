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
            url: '/member/edit',
            title: "买保险就是买服务",
            templateUrl: 'view/template/member_edit.html'
        });

    $stateProvider
        .state('order', {
            cache: false,
            url: '/shop/list',
            title: "预约4S店",
            templateUrl: 'view/template/order.html'
        });
    $stateProvider
        .state('orderEdit', {
            cache: false,
            url: '/order/edit',
            title: "预约商家",
            templateUrl: 'view/template/order_edit.html'
        });
    $stateProvider
        .state('orderSuccess', {
            cache: false,
            url: '/order/success',
            title: "预约信息",
            templateUrl: 'view/template/order_success.html'
        });
    $stateProvider
        .state('memberDetail', {
            cache: false,
            url: '/member/detail',
            title: "会员资料",
            templateUrl: 'view/template/member_detail.html'
        });
    $stateProvider
        .state('mobileEdit', {
            cache: false,
            url: '/mobile/edit',
            title: "修改手机号",
            templateUrl: 'view/template/mobile_edit.html'
        });
}]);