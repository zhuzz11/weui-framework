angular.module("ctApp")
	.controller("carEdit", [
		"$scope",
		"$state",
		"$apis",
		function($scope, $state, $apis) {

			$scope.carNoList =[];
			$scope.isEditing = false;
			$scope.setDefault = function(item){
				angular.forEach($scope.carNoList,function(item,i){
					item.isDefault = false;
				});
				item.isDefault = true;
			};
			$scope.edit = function(item){
				if($scope.isEditing){
					weui.topTips('请先完成编辑', 3000);
					return;
				}
				angular.forEach($scope.carNoList,function(item,i){
					item.isEditing = false;
				});
				item.isEditing = true;
				$scope.isEditing = true;
			};
			$scope.cancel = function(item){
				item.isEditing = false;
				$scope.isEditing = false;
			}
			var initCarNoList = function(){
				for (var i = 0;i<16;i++) {
					$scope.carNoList.push({
						isDefault:i==0?true:false,
						name:"粤B123NJ",
						isEditing:false
					});
				};
			}

			initCarNoList();

		}
	]);