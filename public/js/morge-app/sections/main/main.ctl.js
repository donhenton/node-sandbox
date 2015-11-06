angular.module('app').controller('MainController', function (DialogService, FolderService, $log) {
    var vm = this;
    vm.results = [];
    FolderService.init()
    .success(function (data, status, headers, config) {

        vm.results =  data.folderData;
        FolderService.setFolderData(vm.results);

    }).error(function (data, status, headers, config) {
                $log.debug("error in init call " + status);
            });



    vm.openAddDialog = function ()
    {
        var newFolder = FolderService.createEmptyFolderStructure();


        var result = DialogService.showFolderDialog(newFolder);

        result.then(function (result) {

            newFolder.name = result;
            FolderService.saveFolder(newFolder);
        });


    };
    
    vm.persistChanges = function()
    {
        //FolderService.persistChanges(vm.results);
    }


});



