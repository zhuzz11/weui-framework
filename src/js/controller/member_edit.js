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
				if (mobile == "") {
					weui.topTips('请输入手机号');
					return;
				}
				if (!reg_MOBILE.test(mobile)) {
					weui.topTips('手机号格式不正确');
					return;
				}
				if ($scope.sending || $scope.second > 0) {
					return;
				}
				$scope.sending = true;
				mobilecode.send(mobile, function() {
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
			};

			//提交
			$scope.submit = function() {
				weui.form.validate('#member-edit-page-form1', function(error) {
					if (!error) { //hide-form
						var mobile = $("#member-edit-page-mobile").val();
						var carNo = $("#member-edit-page-car").val();
						if ("" !== mobile) {
							weui.form.validate('#member-edit-page-form2', function(error) {
								if (!error) {
									$scope.submitBody(carNo, mobile, $scope.data.code);
								}
							}, {
								regexp: {
									MOBILE: reg_MOBILE
								}
							});
						} else {
							$scope.submitBody(carNo);
						}
					}
				}, {
					regexp: {
						CAR: reg_CAR
					}
				});
			};

			$scope.submitBody = function(carNo,mobile,code) {
				
				$apis.userBind.send({
					loaddingTitle: "提交中...",
					body: {
						mobile: mobile,
						carNo: carNo,
						openId: "?"
					}
				}).then(function(data) {
					if(data && data.resultCode == "0000"){
						weui.toast('提交成功', 2000);
						$state.go("memberDetail",{
							id:data.resultObject.idUser
						});
					}else{
						weui.toast(data.resultMsg, 3000);
					}
					
				}, function(err) {
					weui.topTips("提交失败");
				});

				//测试代码
				var loading = weui.loading('提交中...');
				setTimeout(function() {
					loading.hide();
					weui.toast('提交成功', 3000);
					$state.go("memberDetail",{
							id:123456
						});
				}, 1500);
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

			$scope.closeArea = function() {
				var divs = $("#member-edit-page-area-keyboard").find("div");
				$(divs[0]).addClass("weui-animate-fade-out");
				$(divs[1]).addClass("weui-animate-slide-down");
				$timeout(function() {
					$scope.areaShow = false;
				}, 350);
			};

			$scope.choiceItem = function(item) {
				$scope.closeArea();
				$scope.prefix = item.name;
			};
		}
	]);