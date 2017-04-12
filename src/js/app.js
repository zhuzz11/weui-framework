angular.module("ctApp", ['ui.router'])
    .run([
        "apiRequest",
        "$rootScope",
        "$state",
        function (apiRequest, $rootScope, $state) {
            apiRequest.init();

      //      $rootScope.pageTitle = "";

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                //$rootScope.pageTitle = toState.title ? toState.title : "车童网微信管理";
                //if (toParams.type) {
                //    $rootScope.pageTitle += "-" + staticDataService.orderNavFunc.getOrderByName(toParams.type).data.text;
                //}
                //
                //if (toState.name == "login" || toState.name == "attention" || (toState.name=="orderdetail" && toParams.openid)) {
                //    $rootScope.noShowMenu = false;
                //} else {
                //    $rootScope.noShowMenu = true;
                //}

            });


            $rootScope.$on('$stateChangeError',
                function (event, toState, toParams, fromState, fromParams) {

                });
        }]);