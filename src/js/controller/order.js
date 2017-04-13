angular.module("ctApp")
    .controller("order", [
        "$scope",
        "$state",
        "$apis",
        "$timeout",
        function($scope, $state, $apis, $timeout) {
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
                //do something
            };
            $scope.choiceDate = function(item) {
                angular.forEach($scope.orderdate, function(item, i) {
                    item.select = false;
                });
                item.select = true;
                $scope.pickdate = item.date;
                //do something
            };

            var isToday = function(d) {
                var date = new Date();
                if (date.getFullYear() == d.getFullYear() && date.getMonth() == d.getMonth() && date.getDate() == d.getDate()) {
                    return true;
                }
                return false;
            };

            var initDate = function(d,index) {
				$scope.orderdate = [];
				if(index === undefined){
					index = 0;
				}
                for (var i = 0; i < 5; i++) {
                    var date = new Date(d.getFullYear(),d.getMonth(),d.getDate());
                    date.setDate(d.getDate() + i);
                    var w = date.getDay();

                    $scope.orderdate.push({
						date:date,
                        datef: date.format("MM-dd"),
                        week: isToday(date) ? "今天" : getWeek(w),
                        select: i === index ? true : false
                    });
                }

            };

            var weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            var getWeek = function(d) {
                return weekArray[d];
            };

			$scope.dateChange = function() {
				var today = new Date();
				var diff = $scope.pickdate.dateDiff(today);

				if (diff > 60) {
					weui.topTips('请设置2个月以内的日期', 3000);
					$scope.pickdate = $scope.oringinDate;
					$scope.dateChange();
					return;
				}
				if (diff < 0) {
					weui.topTips('请设置有效日期', 3000);
					$scope.pickdate = $scope.oringinDate;
					initDate($scope.oringinDate);
					return;
				}
				if(diff > 55){
					today.setDate(today.getDate()+57);
					initDate(today,(diff-60)+4);
					$scope.oringinDate = $scope.pickdate;
					return;
				}
				initDate($scope.pickdate);
				$scope.oringinDate = $scope.pickdate;
				
			};
			var initCarShop = function(){
				for (var i = 0;i < 6; i++) {
					$scope.carShopList.push({
						name:"深圳宝源宝马4S店",
						address:"深圳市福田区梅林街道北环大道7108号",
						distance:"902m",
						icon:"/images/icon_nav_special.png",
						select:i==0?true:false
					});
				};
			};
			$scope.choiceCarShop = function(item){
				angular.forEach($scope.carShopList, function(item, i) {
                    item.select = false;
                });
                item.select = true;
			};

            initDate(new Date());
            initCarShop();
        }
    ]);
