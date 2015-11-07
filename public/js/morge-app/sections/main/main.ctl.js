angular.module('app').controller('MainController', function (DialogService,
        FolderService, $scope, $log, $timeout) {
    var vm = this;
    vm.results = [];
    vm.saveMessage = "";

    vm.results = FolderService.getFolders();

    if (vm.results === null)
    {
        FolderService.init()
                .success(function (data, status, headers, config) {

                    vm.results = data.folderData;
                    FolderService.setFullData(data);

                }).error(function (data, status, headers, config) {
            $log.debug("error in init call " + status);
        });
    }



    $scope.$on('folderDeleted', function (ev,folderName) {
        vm.saveMessage = "Folder '"+ folderName+"' Deleted";
        $timeout(function () {
            vm.saveMessage = "";
        }, 1500);

    });




    vm.openAddDialog = function ()
    {
        var newFolder = FolderService.createEmptyFolderStructure();


        var result = DialogService.showFolderDialog(newFolder);

        result.then(function (result) {

            newFolder.name = result;
            FolderService.saveFolder(newFolder);
            vm.saveData();
        });


    };

    vm.saveData = function ()
    {

        FolderService.saveData(vm.results)
                .success(function (data, status, headers, config) {

                    vm.saveMessage = "Changes Saved";
                    $timeout(function () {
                        vm.saveMessage = "";
                    }, 1500);

                }).error(function (data, status, headers, config) {
            $log.debug("error in persist call " + status + " " +
                    angular.toJson(data)
                    );
        });



    }


});



