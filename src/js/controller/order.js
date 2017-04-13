angular.module("ctApp")
	.controller("order", [
		"$scope",
		"$state",
		"$apis",
		"$timeout",
		function($scope, $state, $apis, $timeout) {
			$scope.orderdate = [];
			$scope.carShopList = [1,2,3,4,5,6];
			$scope.navButtonList = [{
				label:"距离优先",
				select:true
			},{
				label:"评价优先",
				select:false
			},{
				label:"人气优先",
				select:false
			}];
			$scope.choicePriority = function(item){
				angular.forEach($scope.navButtonList,function(item,i){
					item.select = false;
				});
				item.select = true;
				//do something
			};
			$scope.choiceDate = function(item){
				angular.forEach($scope.orderdate,function(item,i){
					item.select = false;
				});
				item.select = true;
				//do something
			};
			var initDate = function() {
				for (var i = 0; i < 5; i++) {
					var date = new Date();
					date.setDate(date.getDate() + i);
					var w = date.getDay();
					$scope.orderdate.push({
						date: date.format("MM-dd"),
						week: i == 0 ? "今天" : getWeek(w),
						select: i == 0 ? true : false
					});
				}
			};

			var weekArray = ["周日","周一","周二","周三","周四","周五","周六"];
			var getWeek = function(d) {
				return weekArray[d];
			};
			initDate();
		}
	]);