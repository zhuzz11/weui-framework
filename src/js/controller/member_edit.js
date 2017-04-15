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
				carNo:"",
				mobile:"",
				code:""
			}
			$scope.matchCar = "";

			weui.form.checkIfBlur('#mobile-form', {
				regexp: {
					MOBILE: /^\d{11}$/
				}
			});
			weui.form.checkIfBlur('#car-form');


			//校验手机号码
			var validate = {
				checkMobile : function(mobile){
					if(mobile != "" && !/^[0-9]{11}$/.test(mobile)){
						weui.topTips('请填写正确的手机号码', 3000);
						return false;
					}
					return true;
				}
			};

			$scope.cartimer = null;
			//搜索车牌对应的车型
			$scope.searchCar = function(){
				$timeout.cancel($scope.timer);
				$scope.cartimer = $timeout(function(){
					console.log($scope.data.carNo);
					$scope.matchCar = "宝马BWM 1 4.6L 自动VX-R 1232";
					$timeout.cancel($scope.cartimer);
					$scope.cartimer = null;
				},200);
			}

			//获取手机验证码
			$scope.sending = false;
			$scope.timer = null;
			$scope.second = 60;
			$scope.getMobileCode = function(){
				if(/^\d{11}$/.test($scope.data.mobile)){
					if($scope.sending){
						return;
					}
					$scope.sending = true;
					mobilecode.send($scope.data.mobile,function(){
						$scope.second = 60;
						$scope.timer = $interval(function(){
							if($scope.second>1){
								$scope.second --;
							}else{
								$interval.cancel($scope.timer);
								$scope.timer = null;
							}
						},1000);
						$scope.sending = false;
					},function(){
						$scope.sending = false;
					});
				}else{
					weui.topTips('请输入正确的手机号');
				}
			}

			//提交
			$scope.submit = function() {
				weui.form.validate('#car-form', function(error) {
					if (!error) {//hide-form
						var mobile = $("#mobile").val();
						$scope.data.mobile = mobile;//这里需要取得值，不然会得到undefined，未知原因？。
						if("" !== $scope.data.mobile){
							weui.form.validate('#mobile-form', function(error) {
								if (!error) {
									var loading = weui.loading('提交中...');
									setTimeout(function() {
										loading.hide();
										weui.toast('提交成功', 3000);
									}, 1500);
								}
								// return true; // 当return true时，不会显示错误
							});
						}
					}
				});
			}
		}
	]);