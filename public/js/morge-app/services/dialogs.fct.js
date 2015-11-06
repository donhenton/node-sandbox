angular
        .module('app.services')
        .factory('DialogService', dialogService);



function dialogService($uibModal,FOLDER_PREFIX)
{
    var data = {
        "showFolderDialog": showFolderDialog,
        "showConfirmDialog": showConfirmDialog


    };
 
    function showConfirmDialog(dialogText)
    {
        var modalInstance =
                $uibModal.open({
                    templateUrl: FOLDER_PREFIX+'sections/dialogs/confirm.tpl.html',
                    controller: 'ConfirmCtrl',
                    size: 'med',
                    resolve: {
                        dialogText: function () {
                            return dialogText;
                        }
                    }
                });
       
        
        return modalInstance.result;
    };

    function showFolderDialog(selectedFolderItem)
    {
         
        var modalInstance =
                $uibModal.open({
                    templateUrl:FOLDER_PREFIX+ 'sections/dialogs/editfolder.tpl.html',
                    controller: 'EditFolderCtrl',
                    size: 'lg',
                    resolve: {
                        folder: function () {
                            return selectedFolderItem;
                        }
                    }
                });
       
        
        return modalInstance.result;

    }

    return data;


}

