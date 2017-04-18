angular.module("ctApp")
	.controller("memberEdit", [
		"$scope",
		"$state",
		"$apis",
		"$timeout",
		"$interval",
		"mobilecode",
		function($scope, $state, $apis, $timeout, $interval, mobilecode) {
			$scope.data = {
				carNo: "",
				mobile: "",
				code: ""
			};

			var reg_CAR = /^[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
				reg_MOBILE = /^\d{11}$/;

			weui.form.checkIfBlur('#member-edit-page-form2', {
				regexp: {
					MOBILE: reg_MOBILE
				}
			});
			weui.form.checkIfBlur('#member-edit-page-form1', {
				regexp: {
					CAR: reg_CAR
				}
			});

			//获取手机验证码
			$scope.sending = false;
			$scope.timer = null;
			$scope.second = 0;
			$scope.getMobileCode = function() {
				var mobile = $("#member-edit-page-mobile").val();
				if(mobile == ""){
					weui.topTips('请输入手机号');
					return;
				}
				$scope.data.mobile = mobile; //这里需要取得值，不然会得到undefined，未知原因？。
				if (reg_MOBILE.test($scope.data.mobile)) {
					if ($scope.sending || $scope.second > 0) {
						return;
					}
					$scope.sending = true;
					mobilecode.send($scope.data.mobile, function() {
						$scope.second = 60;
						$scope.timer = $interval(function() {
							if ($scope.second > 1) {
								$scope.second--;
							} else {
								$interval.cancel($scope.timer);
								$scope.timer = null;
								$scope.second = 0;
							}
						}, 1000);
						$scope.sending = false;
					}, function() {
						$scope.second = 60;
						$scope.timer = $interval(function() {
							if ($scope.second > 1) {
								$scope.second--;
							} else {
								$interval.cancel($scope.timer);
								$scope.timer = null;
								$scope.second = 0;
							}
						}, 1000);
						$scope.sending = false;
					});
				} else {
					weui.topTips('手机号格式不正确');
				}
			};

			//提交
			$scope.submit = function() {
				weui.form.validate('#member-edit-page-form1', function(error) {
					if (!error) { //hide-form
						var mobile = $("#member-edit-page-mobile").val();
						$scope.data.mobile = mobile; //这里需要取得值，不然会得到undefined，未知原因？。
						if ("" !== $scope.data.mobile) {
							weui.form.validate('#member-edit-page-form2', function(error) {
								if (!error) {
									var loading = weui.loading('提交中...');
									setTimeout(function() {
										loading.hide();
										weui.toast('提交成功', 3000);
										$state.go("memberDetail");
									}, 1500);
								}
							}, {
								regexp: {
									MOBILE: reg_MOBILE
								}
							});
						} else {
							var loading = weui.loading('提交中...');
							setTimeout(function() {
								loading.hide();
								weui.toast('提交成功', 3000);
								$state.go("memberDetail");
							}, 1500);
						}
					}
				}, {
					regexp: {
						CAR: reg_CAR
					}
				});
			};

			var areas = ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀", "豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂", "湘", "赣", "闽", "陕", "甘", "宁", "蒙", "津", "贵", "云", "桂", "琼", "青", "新", "藏", "台"];
			$scope.areaList = [];
			$scope.prefix = areas[0];

			var initAreaList = function() {
				for (var i = 0; i < areas.length; i++) {
					$scope.areaList.push({
						name: areas[i]
					});
				}
			};
			initAreaList();

			$scope.openArea = function(item) {
				$scope.areaShow = true;
			};

			$scope.closeArea = function(item) {
				$scope.areaShow = false;
			};

			$scope.choiceItem = function(item) {
				$scope.areaShow = false;
				$scope.prefix = item.name;
			};
		}
	]);