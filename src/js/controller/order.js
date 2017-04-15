angular.module("ctApp")
    .controller("order", [
        "$scope",
        "$state",
        "$apis",
        "$timeout",
        "order",
        function($scope, $state, $apis, $timeout, order) {
            $scope.orderdate = [];
            $scope.pickdate = new Date();
            $scope.oringinDate = new Date();
            $scope.carShopList = [];
            $scope.navButtonList = [{
                label: "距离优先",
                select: true
            }, {
                label: "评价优先",
                select: false
            }, {
                label: "人气优先",
                select: false
            }];

            $scope.choicePriority = function(item) {
                angular.forEach($scope.navButtonList, function(item, i) {
                    item.select = false;
                });
                item.select = true;
                getCarShop();
            };

            $scope.choiceDate = function(item) {
                angular.forEach($scope.orderdate, function(item, i) {
                    item.select = false;
                });
                item.select = true;
                $scope.pickdate = item.date;
                getCarShop();
            };

            var isToday = function(d) {
                var date = new Date();
                if (date.getFullYear() == d.getFullYear() && date.getMonth() == d.getMonth() && date.getDate() == d.getDate()) {
                    return true;
                }
                return false;
            };

            var initDate = function(d, index) {
                $scope.orderdate = [];
                if (index === undefined) {
                    index = 0;
                }
                for (var i = 0; i < 5; i++) {
                    var date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                    date.setDate(d.getDate() + i);
                    $scope.orderdate.push({
                        date: date,
                        datef: date.format("MM-dd"),
                        week: isToday(date) ? "今天" : getWeek(date),
                        select: i === index ? true : false
                    });
                }
                $scope.choiceDate($scope.orderdate[index]);

            };

            var getWeek = function(date) {
                var weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                return weekArray[date.getDay()];
            };

            $scope.openDatePiker = function() {
                var today = new Date();
                var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                endDate.setDate(endDate.getDate() + 61);
                // 示例4：
                weui.datePicker({
                    start: today, // 从今天开始
                    end: endDate,
                    cron: '* * *',
                    defaultValue: [today.getFullYear(), today.getMonth() + 1, today.getDate()],
                    onChange: function(result) {
                        //console.log(result);
                    },
                    onConfirm: function(result) {
                        var date = new Date(result[0], result[1] - 1, result[2]);
                        var today = new Date();
                        var diff = date.dateDiff(today);
                        if (diff > 55) {
                            today.setDate(today.getDate() + 56);
                            initDate(today, (diff - 60) + 4);
                            return;
                        }
                        initDate(date);
                    },
                    id: 'datePicker'
                });
            };

            var getCarShop = function() {
                $apis.getCarShpList.send().then(function(data) {
                    //获取4s店列表
                });
                console.log("get");
                $scope.carShopList = [];
                for (var i = 0; i < 10; i++) {
                    $scope.carShopList.push({
                        name: "深圳宝源宝马4S店",
                        address: "深圳市福田区梅林街道北环大道7108号",
                        distance: "902m",
                        icon: "/images/none.jpg",
                        select: i == 0 ? true : false,
                        times: ["9:00-12:00", "12:00-15:00", "15:00-17:30"],
                        disableIndex: 1 //不可预定的索引
                    });
                };
            };
            $scope.choiceCarShop = function(item) {
                angular.forEach($scope.carShopList, function(item, i) {
                    item.select = false;
                });
                item.select = true;
            };

            $scope.order = function(item, index) {
                if (index === item.disableIndex) {
                    return;
                }
                item.time = item.times[index];
                item.date = $scope.pickdate.format("yyyy-MM-dd");
                item.week = getWeek($scope.pickdate);
                order.set(item);
                $state.go("orderEdit");
            };

            initDate(new Date());
            getCarShop();
        }
    ]);