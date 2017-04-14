angular.module("ctApp")
	.controller("orderEdit", [
		"$scope",
		"$state",
		"$apis",
		"$timeout",
		"order",
		"mobilecode",
		function($scope, $state, $apis, $timeout, order, mobilecode) {
			$scope.order = order.get();
			$scope.registed = false;
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

			$scope.getMobileCode = function(){
				if(/^\d{11}$/.test($scope.form.mobile)){
					mobilecode.send($scope.form.mobile);
				}else{
					weui.topTips('请输入正确的手机号');
				}
			}
			
			$scope.submit = function(){
				weui.form.validate('#order-form', function(error) {
					if (!error) {//hide-form
						
					}
					// return true; // 当return true时，不会显示错误
				});
			};
		}
	]);