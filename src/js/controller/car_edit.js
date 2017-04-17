angular.module("ctApp")
    .controller("carEdit", [
        "$scope",
        "$state",
        "$apis",
        function($scope, $state, $apis) {

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
                    isEditing: true,
                    isNew: true
                });
                $scope.isEditing = true;
            };

            $scope.choiceArea = function(item) {
                $scope.tempItem = item;
                $scope.areaShow = true;
            };

            $scope.choiceItem = function(item) {
                $scope.areaShow = false;
                $scope.tempItem.prefix = item.name;
            };

            var initCarNoList = function() {
                for (var i = 0; i < 5; i++) {
                    $scope.carNoList.push({
                        isDefault: i === 0 ? true : false,
                        name: "粤B123NJ",
                        prefix:"粤",
                        suffix:"B123NJ",
                        isEditing: false
                    });
                }
            };

            initCarNoList();

        }
    ]);
