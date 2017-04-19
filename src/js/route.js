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
        .state('shoplist', {
            cache: false,
            url: '/shop/list/:type',
            title: "预约4S店",
            templateUrl: 'view/template/shop_list.html'
        });
    $stateProvider
        .state('orderEdit', {
            cache: false,
            url: '/order/edit',
            title: "预约商家",
            templateUrl: 'view/template/order_edit.html'
        });
    $stateProvider
        .state('orderDetail', {
            cache: false,
            url: '/order/detail',
            title: "预约信息",
            templateUrl: 'view/template/order_detail.html'
        });
    $stateProvider
        .state('memberDetail', {
            cache: false,
            url: '/member/detail/:id',
            title: "会员资料",
            templateUrl: 'view/template/member_detail.html'
        });
    $stateProvider
        .state('mobileVerify', {
            cache: false,
            url: '/mobile/verify/:mobile',
            title: "验证手机号",
            templateUrl: 'view/template/mobile_verify.html'
        });
    $stateProvider
        .state('mobileEdit', {
            cache: false,
            url: '/mobile/edit',
            title: "修改手机号",
            templateUrl: 'view/template/mobile_edit.html'
        });
    $stateProvider
        .state('orderList', {
            cache: false,
            url: '/order/list',
            title: "我的预约列表",
            templateUrl: 'view/template/order_list.html'
        });
    $stateProvider
        .state('carEdit', {
            cache: false,
            url: '/car/edit',
            title: "编辑车牌号",
            templateUrl: 'view/template/car_edit.html'
        });
    $stateProvider
        .state('about', {
            cache: false,
            url: '/about',
            title: "关于我们",
            templateUrl: 'view/template/about_us.html'
        });
}]);