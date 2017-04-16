angular.module("ctApp")
	.controller("mobileEdit", [
		"$scope",
		"$state",
		"$apis",
		"mobilecode",
		"$interval",
		function($scope, $state, $apis, mobilecode, $interval) {
			$scope.verified = false;
			$scope.oldItem = {
				mobile:"",
				code:"",
				sending:false,
				timer:null,
				second:0
			}
			$scope.newItem = {
				mobile:"",
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

			setTimeout(function() {
				weui.form.checkIfBlur('#mobile-old-form');
			}, 1500);

			$scope.verify = function(){
				weui.form.validate('#mobile-old-form', function(error) {
					if (!error) {//hide-form
						var loading = weui.loading('提交中...');
						setTimeout(function() {
							loading.hide();
							$scope.verified = true;
							setTimeout(function() {
								weui.form.checkIfBlur('#mobile-new-form');
							}, 1500);
						}, 1500);
					}
				});
			};

			//提交
			$scope.submit = function(type) {
				weui.form.validate('#mobile-new-form', function(error) {
					if (!error) {//hide-form
						var loading = weui.loading('提交中...');
						setTimeout(function() {
							loading.hide();
							weui.toast('修改成功', 3000);
							$state.go("memberDetail");
						}, 1500);
					}
				});
			}
		}
	]);