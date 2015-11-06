angular.module('app').controller('LoadFoldersController',
        function (DialogService, FolderService, $log, type) {
            var vm = this;
            vm.folders = FolderService.getFolders();
            // vm.newEntry = {"boardSelections":{},"urlEntries":[]}
            vm.newEntry = {};
            vm.invalidUrl = {"url": ""};
            vm.type = type;
            vm.headerDescription = "zzzz";
            vm.feedbackMessage = "";

            vm.clearMessage = function ()
            {
                vm.feedbackMessage = "";

            }
            //boards,images,pins
            if (vm.type === 'boards')
            {
                vm.headerDescription = "Add Pinterest Board Urls to Folders"
            }
            if (vm.type === 'images')
            {
                vm.headerDescription = "Add Image Urls to Folders"
            }
            if (vm.type === 'pins')
            {
                vm.headerDescription = "Add Pinterest Pin Urls to Folders"
            }

            vm.saveUrls = function ()
            {
                var entryCopy = {};
                entryCopy["folderSelections"] = vm.newEntry.folderSelections;
                entryCopy["urlEntries"] = vm.newEntry.urlEntries;

                entryCopy.urlEntries = entryCopy.urlEntries.split(/[\n\r]+/g);

                //boards,images,pins

                entryCopy.urlType = vm.type;


                FolderService.bulkAddToFolders(entryCopy)
                //$log.debug(info);
                //{"folderSelections":["1","2","6"],"urlEntries":"http://fred,\nhttp://ned,\nhttp://zed"} 
                vm.feedbackMessage = "Changes saved!";
                vm.newEntry = {};

            }





        });



