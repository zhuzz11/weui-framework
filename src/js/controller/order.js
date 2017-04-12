angular.module("ctApp")
	.controller("order", [
		"$scope",
		"$state",
		"$apis",
		"$timeout",
		function($scope, $state, $apis, $timeout) {
			$scope.orderdate = [];

			$scope.choiceDate = function(item){
				angular.forEach($scope.orderdate,function(item,i){
					item.select = false;
				});
				item.select = true;
			}
			var initDate = function() {
				var date = new Date();
				for (var i = 0; i < 5; i++) {
					date.setDate(i);
					var w = date.getDay();
					$scope.orderdate.push({
						date: date.format("MM-dd"),
						week: i == 0 ? "今天" : getWeek(w),
						select: i == 0 ? true : false
					});
				}
			}
			var getWeek = function(d) {
				var w = "";
				switch (d) {
					case 0:
						w = "周一";
						break;
					case 1:
						w = "周二";
						break;
					case 2:
						w = "周三";
						break;
					case 3:
						w = "周四";
						break;
					case 4:
						w = "周五";
						break;
					case 5:
						w = "周六";
						break;
					case 6:
						w = "周七";
						break;
				}
				return w;
			}
			initDate();
		}
	]);