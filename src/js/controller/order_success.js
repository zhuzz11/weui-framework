angular.module("ctApp")
	.controller("orderSuccess", [
		"$scope",
		"$state",
		"$apis",
		"$timeout",
		function($scope, $state, $apis, $timeout) {
			$scope.shop = {
				name:"深圳宝源宝马4S店",
				address:"深圳市福田区梅林街道北环大道7108号",
				type:1,//0-保养，1-喷漆，2-美容，3-陪同协助
				date:"2017-04-17",
				time:"09:00-12:00",
				icon:"/images/icon_nav_special.png"
			};
		}
	]);