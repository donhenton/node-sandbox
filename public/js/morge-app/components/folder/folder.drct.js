angular.module('app').directive('folder', function (DialogService, FolderService, $log,$location,FOLDER_PREFIX) {
    //folderItem will be the attribute on the tag called folder


    return {
        templateUrl: FOLDER_PREFIX + 'components/folder/folder.tpl.html',
        restrict: 'E',
        scope: {
            "folder": '='
        },
        controller: function ($scope, $attrs, $element) {
            //$scope.folder contains the folder object in the display


            $scope.openConfirmDialog = function (selectedFolderItem)
            {
                var confirmResult = DialogService.showConfirmDialog("Delete '"
                        + selectedFolderItem.name + "' ? All data will be lost.")

                confirmResult.then(function (result) {
                    //$log.debug("result is "+result)
                    if (result == 'confirm')
                    {
                        FolderService.removeFolder(selectedFolderItem);
                        FolderService.saveData();
                        $scope.$emit('folderDeleted',selectedFolderItem.name);
                    }
                });

            };

          
 

        }
    };
});