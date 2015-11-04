angular.module('app').controller('ConfirmCtrl', function ($scope, $modalInstance, dialogText,$log) {


    $scope.dialogText = dialogText;

    $scope.ok = function () {
         
        $modalInstance.close("confirm");
    };

    $scope.cancel = function () {
         
        $modalInstance.close('cancel');
    };
});