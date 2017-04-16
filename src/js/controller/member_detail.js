angular.module("ctApp")
	.controller("memberDetail", [
		"$scope",
		"$state",
		"$apis",
		function($scope, $state, $apis) {

			$scope.form = {
				carName:"宝马BWM 1 4.6L 自动VX-R 1232",
				mobile:"18565767510"
			};

			$scope.editCar = function(){
				$state.go("carEdit");
			};

			$scope.editMobile = function(){
				$state.go("mobileEdit");
			};

			$scope.submit = function(){
				WeixinJSBridge.call('closeWindow');//跳出进入公众号首页
			}
		}
	]);