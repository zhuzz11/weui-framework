angular.module("ctApp")
	.controller("orderList", [
		"$scope",
		"$state",
		"$apis",
		function($scope, $state, $apis) {

			$scope.orderList = [];

			$scope.goOrderDetail = function(){
				$state.go("orderSuccess");
			};
			var initOrderList = function(){
				$scope.orderList = [];
                for (var i = 0; i < 15; i++) {
                    $scope.orderList.push({
                        name: "深圳宝源宝马4S店,深圳宝源宝马4S店",
                        address: "深圳市福田区梅林街道北环大道7108号",
                        state: "已完成",
                        date:"2017-05-09",
                        icon: "/images/none.jpg",
                        type:"保养"
                    });
                };
			};
			initOrderList();
		}
	]);