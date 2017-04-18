angular.module("ctApp")
	.controller("memberDetail", [
		"$scope",
		"$state",
		"$apis",
		function($scope, $state, $apis) {

			$scope.form = {
				carNo:"粤B123NJ",
				mobile:"18565767510"
			};

			$scope.editCar = function(){
				$state.go("carEdit");
			};

			$scope.editMobile = function(){
				$state.go("mobileVerify",{
					mobile:$scope.form.mobile
				});
			};

			$scope.submit = function(){
				WeixinJSBridge.call('closeWindow');//跳出进入公众号首页
			}
		}
	]);