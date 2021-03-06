angular.module("ctApp")
    .controller("order", [
        "$scope",
        "$state",
        "$apis",
        "$timeout",
        "order",
        function($scope, $state, $apis, $timeout, order) {
            var type = $state.params.type;
            $scope.orderdate = [];
            $scope.pickdate = new Date();
            $scope.oringinDate = new Date();
            $scope.carShopList = [];
            $scope.pos = null;
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
                getLocation(getCarShop);
            };

            $scope.choiceDate = function(item) {
                angular.forEach($scope.orderdate, function(item, i) {
                    item.select = false;
                });
                item.select = true;
                $scope.pickdate = item.date;
                $timeout(function(){
                    getLocation(getCarShop);
                },0);
                
            };

            var sameDate = function(d1, d2) {
                if (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate()) {
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
                        week: sameDate(date, new Date()) ? "今天" : getWeek(date),
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
                        if (sameDate(date, $scope.oringinDate)) {
                            return;
                        }
                        $scope.oringinDate = date;
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

            var getCarShop = function(pos) {
                $scope.carShopList = [];
                $apis.getCarShopList.send({
                    body: {
                        latitude: pos ? pos.latitude : null,
                        longitude: pos ? pos.longitude : null,
                        itemCode: "01",
                        userId: 10001,
                        bespeakDate: $scope.pickdate.format("yyyy-MM-dd")
                    }
                }).then(function(data) {
                    //获取4s店列表
                    if (data && data.resultCode == "0000") {
                        var ret = data.resultObject;
                        for (var i = 0; i < ret.length; i++) {
                            var item = ret[i];
                            $scope.carShopList.push({
                                merchantId: item.merchantId,
                                name: item.name,
                                address: item.address,
                                distance: item.distance,
                                icon: item.logoUrl,
                                starGrade: item.starGrade,
                                select: i == 0 ? true : false,
                                times: item.timeRuleModelList
                            });
                        }
                    } else {
                        weui.topTips(data.resultMsg || "服务异常", 3000);
                    }
                });

                //测试

                /*for (var i = 0; i < 10; i++) {
                    var timeRuleModelList = [{
                        beginTime: "9:00",
                        endTime: "12:00",
                        surplus: 0
                    }, {
                        beginTime: "12:00",
                        endTime: "15:00",
                        surplus: 1
                    }, {
                        beginTime: "15:00",
                        endTime: "17:30",
                        surplus: 2
                    }];
                    $scope.carShopList.push({
                        merchantId: "12334",
                        name: "深圳宝源宝马4S店",
                        address: "深圳市福田区梅林街道北环大道7108号",
                        distance: "902m",
                        icon: "/images/none.jpg",
                        starGrade: "",
                        select: i == 0 ? true : false,
                        times: timeRuleModelList
                    });
                }*/
            };

            var getLocation = function(cb) {
                if (!$scope.pos) {
                    if (angular.isFunction(cb)) {
                        cb($scope.pos);
                    }
                    return;
                }
                var loading = weui.loading("loading...");
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(pos) {
                        // 成功回调函数，接受一个地理位置的对象作为参数。  
                        // https://developer.mozilla.org/cn/docs/Web/API/Position 参数说明
                        $scope.pos = pos.coords;
                        if (angular.isFunction(cb)) {
                            cb($scope.pos);
                        }

                        //alert(pos.coords.latitude + '  ' + pos.coords.longitude);
                    }, function(err) {
                        // 错误的回调
                        if (angular.isFunction(cb)) {
                            cb($scope.pos);
                        }

                        //alert("定位失败");
                        // https://developer.mozilla.org/cn/docs/Web/API/PositionError 错误参数  
                    }, {
                        enableHighAccuracy: true, // 是否获取高精度结果  
                        timeout: 5000, //超时,毫秒  
                        maximumAge: 0 //可以接受多少毫秒的缓存位置  
                            // 详细说明 https://developer.mozilla.org/cn/docs/Web/API/PositionOptions  
                    });
                } else {
                    if (angular.isFunction(cb)) {
                        cb($scope.pos);
                    }
                    //alert('抱歉！您的浏览器无法使用定位功能');
                }
            };

            $scope.choiceCarShop = function(item) {
                angular.forEach($scope.carShopList, function(item, i) {
                    item.select = false;
                });
                item.select = true;
            };

            $scope.order = function(item, time) {
                if (time.surplus <= 0) {
                    return;
                }
                item.time = time.beginTime + "-" + time.endTime;
                item.date = $scope.pickdate.format("yyyy-MM-dd");
                item.week = getWeek($scope.pickdate);
                order.set(item);
                $state.go("orderEdit");
            };

            initDate(new Date());
        }
    ]);