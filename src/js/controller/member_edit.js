angular.module("ctApp")
	.controller("memberEdit", [
		"$scope",
		"$state",
		"$apis",
		"$timeout",
		function($scope, $state, $apis, $timeout) {
			$scope.data = {
				carNo:"",
				mobile:"",
				code:""
			}
			$scope.matchCar = "";

			weui.form.checkIfBlur('#edit-form', {
				regexp: {
					MOBILE: /^\s*$|^[0-9]{11}$/
				}
			});

			$scope.mobileBlur = function(){
				validate.checkMobile($scope.data.mobile);
			};

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

			$scope.timer = 0;
			//搜索车牌对应的车型
			$scope.searchCar = function(){
				$timeout.cancel($scope.timer);
				$scope.timer = $timeout(function(){
					console.log($scope.data.carNo);
					$scope.matchCar = "宝马BWM 1 4.6L 自动VX-R 1232";
				},200);
			}

			//获取手机验证码
			$scope.getMobileCode = function(){

			}

			//提交
			$scope.submit = function() {
				weui.form.validate('#edit-form', function(error) {
					if (!error) {//hide-form
						if(validate.checkMobile($scope.data.mobile)){
							var loading = weui.loading('提交中...');
							setTimeout(function() {
								loading.hide();
								weui.toast('提交成功', 3000);
							}, 1500);
						}
					}
					// return true; // 当return true时，不会显示错误
				}, {
					regexp: {
						MOBILE: /^\s*$|^[0-9]{11}$/
					}
				});
			}
		}
	]);