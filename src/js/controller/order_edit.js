angular.module("ctApp")
	.controller("orderEdit", [
		"$scope",
		"$state",
		"$apis",
		"$timeout",
		"$interval",
		"order",
		"mobilecode",
		function($scope, $state, $apis, $timeout, $interval, order, mobilecode) {
			$scope.order = order.get();
			$scope.registed = true;
			$scope.form = {
				name:"",
				mobile:$scope.registed ? "18565767510" : "",
				sex:0,//0-男,1-女
				carNo:""
			}
			$scope.choiceCar = function(){

			};

			$scope.choiceSex = function(type){
				$scope.form.sex = type;
			};

			$timeout(function(){
				weui.form.checkIfBlur('#order-form', {
					regexp: {
						MOBILE: /^[0-9]{11}$/
					}
				});
			},2000);

			$scope.sending = false;
			$scope.timer = null;
			$scope.second = 60;
			$scope.getMobileCode = function(){
				if(/^\d{11}$/.test($scope.form.mobile)){
					if($scope.sending){
						return;
					}
					$scope.sending = true;
					mobilecode.send($scope.form.mobile,function(){
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
			
			$scope.submit = function(){
				weui.form.validate('#order-form', function(error) {
					if (!error) {//hide-form
						var load = weui.loading("正在提交");
						$timeout(function(){
							load.hide();
							$state.go("orderSuccess");
						},1000);
					}
					// return true; // 当return true时，不会显示错误
				});
			};
		}
	]);