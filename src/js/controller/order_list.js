angular.module("ctApp")
	.controller("orderList", [
		"$scope",
		"$state",
		"$apis",
		function($scope, $state, $apis) {

			$scope.orderList = [];

			var initOrderList = function(){
				$scope.orderList = [];
                for (var i = 0; i < 10; i++) {
                    $scope.orderList.push({
                        name: "深圳宝源宝马4S店",
                        address: "深圳市福田区梅林街道北环大道7108号",
                        state: "已完成",
                        icon: "/images/none.jpg",
                        select: i == 0 ? true : false,
                        times: ["9:00-12:00", "12:00-15:00", "15:00-17:30"],
                        disableIndex: 1 //不可预定的索引
                    });
                };
			};
			initOrderList();
		}
	]);