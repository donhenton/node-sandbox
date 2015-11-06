angular.module('app').controller('EditFolderCtrl', function ($scope, $modalInstance, folder) {


    $scope.folderName = folder.name;

    $scope.ok = function () {
        folder.name = $scope.folderName;
        $modalInstance.close($scope.folderName);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});