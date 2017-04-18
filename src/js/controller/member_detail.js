angular.module("ctApp")
	.controller("memberDetail", [
		"$scope",
		"$state",
		"$apis",
		function($scope, $state, $apis) {

			$scope.form = {
				carNo: "",
				mobile: ""
			};

			$scope.editCar = function() {
				$state.go("carEdit");
			};

			$scope.editMobile = function() {
				$state.go("mobileVerify", {
					mobile: $scope.form.mobile
				});
			};

			$scope.submit = function() {
				WeixinJSBridge.call('closeWindow'); //跳出进入公众号首页
			}

			var init = function() {
				$apis.userInfo.send({
					isShowLoadding: false,
					body: {
						openid: ""
					}
				}).then(function() {
					$scope.form = {
						carNo: "粤B54321",
						mobile: "18565767510"
					};
				}, function() {
					$scope.form = {
						carNo: "粤B12345",
						mobile: "18565767510"
					};
				});
			}();
		}
	]);