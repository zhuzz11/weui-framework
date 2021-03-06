angular.module("ctApp")
    .controller("carEdit", [
        "$scope",
        "$state",
        "$apis",
        "$timeout",
        function($scope, $state, $apis, $timeout) {

            $scope.carNoList = [];
            $scope.areaShow = false;
            $scope.isEditing = false;
            $scope.tempItem = null;
            $scope.originItem = null; //取消时恢复数据使用
            var areas = ["京", "沪", "浙", "苏", "粤", "鲁", "晋", "冀", "豫", "川", "渝", "辽", "吉", "黑", "皖", "鄂", "湘", "赣", "闽", "陕", "甘", "宁", "蒙", "津", "贵", "云", "桂", "琼", "青", "新", "藏", "台"];
            $scope.areaList = [];

            var initAreaList = function() {
                for (var i = 0; i < areas.length; i++) {
                    $scope.areaList.push({
                        name: areas[i]
                    });
                }
            };
            initAreaList();
            $scope.setDefault = function(item) {
                if (item.isEditing) {
                    return;
                }
                angular.forEach($scope.carNoList, function(item, i) {
                    item.isDefault = false;
                });
                item.isDefault = true;
            };
            $scope.edit = function(item) {
                if ($scope.isEditing) {
                    weui.topTips('请先完成编辑', 3000);
                    return;
                }
                $scope.originItem = angular.copy(item);
                angular.forEach($scope.carNoList, function(item, i) {
                    item.isEditing = false;
                });
                item.isEditing = true;
                $scope.isEditing = true;
            };
            $scope.cancel = function(item) {
                $scope.closeArea();
                if (item.isNew) {
                    $scope.isEditing = false;
                    $scope.carNoList.splice(-1, 1);
                    return;
                }
                angular.copy($scope.originItem, item);
                item = $scope.originItem;
                item.isEditing = false;
                $scope.isEditing = false;
            };
            $scope.newCar = function() {
                if ($scope.isEditing) {
                    weui.topTips('请先完成编辑', 3000);
                    return;
                }
                $scope.carNoList.push({
                    isDefault: false,
                    name: "",
                    prefix: areas[0],
                    suffix: "",
                    isEditing: true,
                    isNew: true
                });
                $scope.isEditing = true;
            };

            $scope.openArea = function(item) {
                $scope.tempItem = item;
                $scope.areaShow = true;
            };

            $scope.closeArea = function() {
                var divs = $("#car-edit-page-area-keyboard").find("div");
                $(divs[0]).addClass("weui-animate-fade-out");
                $(divs[1]).addClass("weui-animate-slide-down");
                $timeout(function() {
                    $scope.areaShow = false;
                }, 350);
            };

            $scope.choiceItem = function(item) {
                $scope.closeArea();
                $scope.tempItem.prefix = item.name;
            };

            var initCarNoList = function() {
                $apis.getCarNoList.send({
                    body:{

                    }
                }).then(function(data){
                    if(data && data.resultCode == "0000"){
                        
                    }else{
                        weui.toast(data.resultMsg, 3000);
                    }
                },function(){

                });
                for (var i = 0; i < 5; i++) {
                    $scope.carNoList.push({
                        isDefault: i === 0 ? true : false,
                        name: "粤B123NJ",
                        prefix: "粤",
                        suffix: "B123NJ",
                        isEditing: false
                    });
                }
            };

            initCarNoList();

        }
    ]);
