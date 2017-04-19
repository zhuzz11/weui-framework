angular.module("ctApp")
	.controller("orderList", [
		"$scope",
		"$state",
		"$apis",
		function($scope, $state, $apis) {

			$scope.orderList = [];

			$scope.goOrderDetail = function() {
				$state.go("orderDetail");
			};
			var initOrderList = function() {
				$scope.orderList = [];
				$apis.getOrderList.send({
					userId: "?"
				}).then(function(data) {
					if (data && data.resultCode == "0000") {
						var ret = data.resultObject;
						for (var i = 0; i < ret.length; i++) {
							var item = ret[i];
							$scope.orderList.push({
								id: item.bespeakId,
								bespeakNo: item.bespeakNo,
								name: item.merchantName,
								shortName: item.merchantShortName
								address: item.merchantAddress,
								state: item.bespeakState,
								date: item.bespeakDate,
								icon: item.merchantLogoUrl,
								type: item.itemName,
								itemCode: item.itemCode,
								merchantId: item.merchantId
							});
						}
					} else {
						weui.toast(data.resultMsg, 3000);
					}
				}, function(err) {

				});

				//测试
				for (var i = 0; i < 15; i++) {
					$scope.orderList.push({
						name: "深圳宝源宝马4S店,深圳宝源宝马4S店",
						address: "深圳市福田区梅林街道北环大道7108号",
						state: "已完成",
						date: "2017-05-09",
						icon: "/images/none.jpg",
						type: "保养"
					});
				};
			};
			initOrderList();
		}
	]);