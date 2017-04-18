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
			$scope.registed = false;
			$scope.form = {
				name:"",
				mobile:$scope.registed ? "18565767510" : "",
				sex:0,//0-男,1-女
				carNo:""
			};
			$scope.choiceCar = function(){
				$state.go("carEdit");
			};

			$scope.choiceSex = function(type){
				$scope.form.sex = type;
			};

			var reg_mobile = /^\d{11}$/;

			$timeout(function(){
				weui.form.checkIfBlur('#order-edit-page-form', {
					regexp: {
						MOBILE: reg_mobile
					}
				});
			},2000);

			$scope.sending = false;
			$scope.timer = null;
			$scope.second = 0;
			$scope.getMobileCode = function(){
				var mobile = $("#order-edit-page-mobile").val();
				if(mobile == ""){
					weui.topTips('请输入手机号');
					return;
				}
				if (!reg_mobile.test(mobile)) {
					weui.topTips('手机号格式不正确');
					return;
				}
				if($scope.sending || $scope.second > 0){
					return;
				}
				$scope.sending = true;
				mobilecode.send(mobile,function(){
					$scope.second = 60;
					$scope.timer = $interval(function(){
						if($scope.second>1){
							$scope.second --;
						}else{
							$interval.cancel($scope.timer);
							$scope.timer = null;
							$scope.second = 0;
						}
					},1000);
					$scope.sending = false;
				},function(){
					$scope.second = 10;
					$scope.timer = $interval(function(){
						if($scope.second>1){
							$scope.second --;
						}else{
							$interval.cancel($scope.timer);
							$scope.timer = null;
							$scope.second = 0;
						}
					},1000);
					$scope.sending = false;
				});
			};
			
			$scope.submit = function(){
				weui.form.validate('#order-edit-page-form', function(error) {
					if (!error) {//hide-form
						var load = weui.loading("正在提交");
						$timeout(function(){
							load.hide();
							$state.go("orderDetail");
						},1000);
					}
					// return true; // 当return true时，不会显示错误
				},{
					regexp: {
						MOBILE: reg_mobile
					}
				});
			};
		}
	]);