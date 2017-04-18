angular.module("ctApp")
	.controller("mobileVerify", [
		"$scope",
		"$state",
		"$apis",
		"mobilecode",
		"$interval",
		"$timeout",
		function($scope, $state, $apis, mobilecode, $interval, $timeout) {

			$scope.oldItem = {
				mobile:"18565767510",
				code:"",
				sending:false,
				timer:null,
				second:0
			}

			//获取手机验证码
			$scope.getMobileCode = function(type){
				if(/^\d{11}$/.test($scope[type].mobile)){
					if($scope[type].sending || $scope[type].second>0){//正在发送或正在倒计时
						return;
					}
					$scope[type].sending = true;
					mobilecode.send($scope[type].mobile,function(){
						$scope[type].second = 10;
						$scope[type].timer = $interval(function(){
							if($scope[type].second>1){
								$scope[type].second --;
							}else{
								$interval.cancel($scope[type].timer);
								$scope[type].timer = null;
								$scope[type].second = 0;
							}
						},1000);
						$scope[type].sending = false;
					},function(){
						$scope[type].second = 10;
						$scope[type].timer = $interval(function(){
							if($scope[type].second>1){
								$scope[type].second --;
							}else{
								$interval.cancel($scope[type].timer);
								$scope[type].timer = null;
								$scope[type].second = 0;
							}
						},1000);
						$scope[type].sending = false;
					});
				}else{
					weui.topTips('请输入正确的手机号');
				}
			}

			$timeout(function() {
				weui.form.checkIfBlur('#mobile-old-form');
			}, 1500);

			$scope.verify = function(){
				weui.form.validate('#mobile-old-form', function(error) {
					if (!error) {//hide-form
						var loading = weui.loading('提交中...');
						$timeout(function() {
							loading.hide();
							$state.go("mobileEdit");
						}, 1500);
					}
				});
			};

		}
	]);