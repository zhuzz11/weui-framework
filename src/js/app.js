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

Date.prototype.format = function (format) {
    format = format || "yyyy-MM-dd";
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};

Date.prototype.dateDiff = function(date){
    return parseInt((this - date)/1000/60/60/24);
};