angular.module('app').controller('MainController', function (DialogService,FolderService,$log) {
    var vm = this;
    vm.results = FolderService.getFolders();
   
   vm.openAddDialog = function()
   {
     var newFolder = FolderService.createEmptyFolderStructure();
      
     
     var result = DialogService.showFolderDialog(newFolder);
     
      result.then(function (result) {
          
            newFolder.name = result;
           FolderService.saveFolder(newFolder);
        } );
     
     
   };


});



