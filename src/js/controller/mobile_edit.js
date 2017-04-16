angular.module("ctApp")
	.controller("mobileEdit", [
		"$scope",
		"$state",
		"$apis",
		"mobilecode",
		"$interval",
		function($scope, $state, $apis, mobilecode, $interval) {

			$scope.oldItem = {
				mobile:"",
				code:"",
				sending:false,
				timer:null,
				second:60
			}
			$scope.newItem = {
				mobile:"",
				code:"",
				sending:false,
				timer:null,
				second:60
			}
			//获取手机验证码
			$scope.getMobileCode = function(type){
				if(/^\d{11}$/.test($scope[type].mobile)){
					if($scope[type].sending){
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
							}
						},1000);
						$scope[type].sending = false;
					});
				}else{
					weui.topTips('请输入正确的手机号');
				}
			}

			weui.form.checkIfBlur('#mobile-edit-form');
			//提交
			$scope.submit = function() {
				weui.form.validate('#mobile-edit-form', function(error) {
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