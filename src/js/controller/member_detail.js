angular.module("ctApp")
	.controller("memberDetail", [
		"$scope",
		"$state",
		"$apis",
		function($scope, $state, $apis) {

			var id = $state.params.id;
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
						openid: "",
						id:id
					}
				}).then(function() {
					$scope.form = {
						carNo: "",
						mobile: ""
					};
				}, function() {
				});
			}();
		}
	]);