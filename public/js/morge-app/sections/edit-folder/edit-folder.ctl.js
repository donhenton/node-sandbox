angular.module('app').controller('EditFolderController',
        function (FolderService, UtilityService, $log, $scope, folderItem) {
            var vm = this;
            vm.folder = folderItem.folder;
            vm.newEntry = {};
            vm.invalidUrl = {"url": ""};
            vm.invalidBoard = {"url": ""};
            vm.invalidPin = {"url": ""}
            vm.generalEntryForm = {};
            vm.feedbackMessage = null;


            /**
             * take an array of urls and return a string
             * with a carriage return at the end of an array item
             *  
             * 
             * @param {type} arrayOfUrls
             * @returns {undefined}
             */
            function toDataDisplay(arrayOfUrls)
            {

                var returnString = ""
                for (var i = 0; i < arrayOfUrls.length; i++)
                {
                    var u = arrayOfUrls[i];
                    u = u.trim();
                    if (u != "")
                    {
                        returnString = returnString + u + "\n";
                    }
                }
                return returnString;
            }

            /**
             * take carriage return items and 
             * returns an array suitable for saving
             * 
             * @param {type} items
             * @returns {undefined}
             */
            function fromDataDisplay(items)
            {
                items = items + "";
                var urlArray = items.split(/[\n]/g);
                return urlArray;
            }

            vm.newEntry.urls = toDataDisplay(vm.folder.images.urls);
            vm.newEntry.pinterestBoards = toDataDisplay(vm.folder.images.pinterestBoards);
            vm.newEntry.pinterestPins = toDataDisplay(vm.folder.images.pins);
            vm.newEntry.name = vm.folder.name;
            vm.newEntry.id = vm.folder.id;

            vm.clearMessage = function ()
            {
                vm.feedbackMessage = null;

            }

            vm.saveChanges = function ()
            {
                // $log.debug(vm.generalEntryForm.$invalid)  
                var saveData = {};
                saveData.urls = fromDataDisplay(vm.generalEntryForm.urls.$viewValue);
                saveData.pinterestBoards = fromDataDisplay(vm.generalEntryForm.pinterestBoards.$viewValue);
                saveData.pinterestPins = fromDataDisplay(vm.generalEntryForm.pinterestPins.$viewValue);
                saveData.name = vm.folder.name;
                saveData.id = vm.folder.id;
                var validationValue = checkTheForm(saveData);
                if (validationValue.okay)
                {
                    FolderService.completeEdit(saveData);
                    vm.feedbackMessage = "Changes saved!";
                }
                else
                {
                    vm.feedbackMessage = "Errors Present: " + validationValue.errorMessage;

                }

            }

            /**
             * 
             * check that urls are properly formatted 
             * 
             * 
             * conditional for allowing form submit button
             * @returns {Boolean}
             */
            function checkTheForm(saveData)
            {

                var returnValue = {};
                var urlTest = UtilityService.checkUrlArray(saveData.urls);
                var boardTest = UtilityService.checkUrlArray(saveData.pinterestBoards);
                var pinTest = UtilityService.checkUrlArray(saveData.pinterestPins);
                returnValue.okay = false;
                returnValue.errorMessage = null;
                if (urlTest.fail === false && pinTest.fail === false && boardTest.fail === false)
                {
                    returnValue.okay = true;
                }
                else
                {
                    if (urlTest.url !== null)
                    {
                        returnValue.errorMessage = "image problem: " + urlTest.url;
                    }
                    if (boardTest.url !== null)
                    {
                        returnValue.errorMessage = "board problem: " + boardTest.url;
                    }
                    if (pinTest.url !== null)
                    {
                        returnValue.errorMessage = "pin problem: " + pinTest.url;
                    }
                }
                // $log.debug("check the form says urlTest " + urlTest.fail + " boardTest " + boardTest.fail + " pass value " + returnValue.okay);
                // $log.debug("url fail "+urlTest.url+" board fail "+boardTest.url);

                return returnValue;
            }


        });



