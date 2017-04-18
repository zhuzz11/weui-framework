angular.module("ctApp")
	.controller("mobileEdit", [
		"$scope",
		"$state",
		"$apis",
		"mobilecode",
		"$interval",
		"$timeout",
		function($scope, $state, $apis, mobilecode, $interval, $timeout) {

			$scope.newItem = {
				code: "",
				sending: false,
				timer: null,
				second: 0
			};

			var reg_mobile = /^\d{11}$/;

			//获取手机验证码
			$scope.getMobileCode = function() {
				var mobile = $("#mobile-edit-page-mobile").val();
				if (mobile == "") {
					weui.topTips('请输入手机号');
					return;
				}
				if (!reg_mobile.test(mobile)) {
					weui.topTips('手机号格式不正确');
					return;
				}
				if ($scope.newItem.sending || $scope.newItem.second > 0) { //正在发送或正在倒计时
					return;
				}
				$scope.newItem.sending = true;
				mobilecode.send(mobile, function() {
					$scope.newItem.second = 10;
					$scope.newItem.timer = $interval(function() {
						if ($scope.newItem.second > 1) {
							$scope.newItem.second--;
						} else {
							$interval.cancel($scope.newItem.timer);
							$scope.newItem.timer = null;
							$scope.newItem.second = 0;
						}
					}, 1000);
					$scope.newItem.sending = false;
				}, function() {
					$scope.newItem.second = 10;
					$scope.newItem.timer = $interval(function() {
						if ($scope.newItem.second > 1) {
							$scope.newItem.second--;
						} else {
							$interval.cancel($scope.newItem.timer);
							$scope.newItem.timer = null;
							$scope.newItem.second = 0;
						}
					}, 1000);
					$scope.newItem.sending = false;
				});
			};

			weui.form.checkIfBlur('#mobile-edit-page-form', {
				regexp: {
					MOBILE: reg_mobile
				}
			});

			//提交
			$scope.submit = function(type) {
				weui.form.validate('#mobile-edit-page-form', function(error) {
					if (!error) { //hide-form
						var loading = weui.loading('提交中...');
						$timeout(function() {
							loading.hide();
							weui.toast('修改成功', 3000);
							$state.go("memberDetail");
						}, 1500);
					}
				}, {
					regexp: {
						MOBILE: reg_mobile
					}
				});
			};
		}
	]);