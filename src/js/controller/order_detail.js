angular.module("ctApp")
	.controller("orderSuccess", [
		"$scope",
		"$state",
		"$apis",
		"$timeout",
		function($scope, $state, $apis, $timeout) {
			var types = ["保养","喷漆","美容","陪同协助"];
			$scope.shop = {
				name:"深圳宝源宝马4S店",
				address:"深圳市福田区梅林街道北环大道7108号",
				type:types[1],//0-保养，1-喷漆，2-美容，3-陪同协助
				date:"2017-04-19",
				time:"19:00-12:00",
				icon:"/images/none.jpg",
				canceled:false
			};

			$scope.canceling = false;
			$scope.cancelOrder = function(){
				if($scope.canceling){
					return;
				}
				$scope.canceling = true;
				var load = weui.loading("正在取消...");
				$timeout(function(){
					$scope.canceling = false;
					$scope.shop.canceled = true;
					load.hide();
				},2000);
			};

			$timeout(function(){
				var date = $scope.shop.date.split("-");
				var time = $scope.shop.time.split("-")[0].split(":");
				$(".count-time").countTime({
					text:"还剩：",
					EndTime: new Date(date[0],date[1]-1,date[2],time[0],time[1]), //设置结束时间；
					callback:function(){     //当时间结束时候回调的函数   
						
					},
				});
			},10);
			
		}
	]);