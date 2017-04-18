angular.module("ctApp")
	.controller("mobileVerify", [
		"$scope",
		"$state",
		"$apis",
		"mobilecode",
		"$interval",
		"$timeout",
		function($scope, $state, $apis, mobilecode, $interval, $timeout) {

			$("#mobile-verify-page-mobile").val($state.params.mobile);

			$scope.oldItem = {
				code:"",//验证码
				sending: false,//正在发送？
				timer: null,//间隔定时器
				second: 0//倒计时
			};

			var reg_mobile = /^\d{11}$/;

			//获取手机验证码
			$scope.getMobileCode = function() {
				var mobile = $("#mobile-verify-page-mobile").val();
				if(mobile == ""){
					weui.topTips('请输入手机号');
					return;
				}
				if (reg_mobile.test(mobile)) {
					if ($scope.oldItem.sending || $scope.oldItem.second > 0) { //正在发送或正在倒计时
						return;
					}
					$scope.oldItem.sending = true;
					mobilecode.send(mobile, function() {
						$scope.oldItem.second = 60;
						$scope.oldItem.timer = $interval(function() {
							if ($scope.oldItem.second > 1) {
								$scope.oldItem.second--;
							} else {
								$interval.cancel($scope.oldItem.timer);
								$scope.oldItem.timer = null;
								$scope.oldItem.second = 0;
							}
						}, 1000);
						$scope.oldItem.sending = false;
					}, function() {
						$scope.oldItem.second = 60;
						$scope.oldItem.timer = $interval(function() {
							if ($scope.oldItem.second > 1) {
								$scope.oldItem.second--;
							} else {
								$interval.cancel($scope.oldItem.timer);
								$scope.oldItem.timer = null;
								$scope.oldItem.second = 0;
							}
						}, 1000);
						$scope.oldItem.sending = false;
					});
				} else {
					weui.topTips('手机号格式不正确');
				}
			};

			$timeout(function() {
				weui.form.checkIfBlur('#mobile-old-form', {
					regexp: {
						MOBILE: reg_mobile
					}
				});
			}, 1500);

			$scope.verify = function() {
				weui.form.validate('#mobile-old-form', function(error) {
					if (!error) { //hide-form
						var loading = weui.loading('提交中...');
						$timeout(function() {
							loading.hide();
							$state.go("mobileEdit");
						}, 1500);
					}
				},{
					regexp: {
						MOBILE: reg_mobile
					}
				});
			};

		}
	]);