angular.module('app').controller('FolderContentsController',
        function (DialogService, FolderService,
                MessagePumpService, $log, $scope, folderItem) {
            var vm = this;
            vm.folder = folderItem.folder;
            vm.slides = [];
            vm.imageCards = [];
            vm.pinCards = [];

            ///pinterest pins  

            vm.maxPins = 4;
            vm.pinBuffer = new Array(vm.maxPins);
            vm.currentPinPage = 1;
            vm.totalPins = vm.folder.images.pins.length;
            vm.pinCounter = 0;
            //apparently this is only called once/////////////////
            //listening to events from the pinterest code see pin_sample_main
            MessagePumpService.register(respondToPinterest,
                    "PINTEREST_DONE", "editFolder");

                    
            //not used at this time        
            function respondToPinterest(ev)
            {

                vm.pinCounter = vm.pinCounter + 1;
               // $log.debug("got pinterest done " 
               //         + ev+" total "+vm.totalPins+" ct "+vm.pinCounter);
                if (vm.pinCounter === vm.totalPins)
                {
                    vm.pinCounter = 0;
                   // $log.debug("final hit " + vm.totalPins)
                }


            }

            vm.pinPageChanged = function ()
            {


                for (var i = 0; i < vm.maxPins; i++)
                {
                    vm.pinBuffer[i] = null;
                }
                var maxLoop = 0;
                if (vm.totalPins < vm.maxPins)
                {
                    maxLoop = vm.totalPins;
                }
                else
                {
                    maxLoop = vm.maxPins;
                }
                var start = (vm.currentPinPage - 1) * vm.maxPins;

                for (var i = start; i < start + maxLoop; i++)
                {
                    if (i < vm.folder.images.pins.length)
                    {
                        vm.pinBuffer[i - start] = vm.folder.images.pins[i];
                    }
                }

                //check if nulls exist and cut the array to non-null
                var nullIdx = -1;
                var delCount = 0;
                for (var i = 0; i < vm.maxPins; i++)
                {
                    if (vm.pinBuffer[i] == null)
                    {
                        if (nullIdx == -1)
                        {
                            nullIdx = i;
                        }
                        delCount = delCount + 1;
                    }
                }
                if (nullIdx > -1)
                {
                    vm.pinBuffer.splice(nullIdx, delCount);
                }
                vm.pinCards = [];
                for (var i = 0; i < vm.pinBuffer.length; i++)
                {
                    var card = {};

                    card["src"] = vm.pinBuffer[i];

                    vm.pinCards.push(card);

                }



            }
            vm.pinPageChanged();


            /////////////////image urls/////////////////////////////////////ß
            vm.maxImages = 4;
            vm.imageBuffer = new Array(vm.maxImages);
            vm.currentImagePage = 1;
            vm.totalImages = vm.folder.images.urls.length;

            vm.imagePageChanged = function ()
            {


                for (var i = 0; i < vm.maxImages; i++)
                {
                    vm.imageBuffer[i] = null;
                }
                var maxLoop = 0;
                if (vm.totalImages < vm.maxImages)
                {
                    maxLoop = vm.totalImages;
                }
                else
                {
                    maxLoop = vm.maxImages;
                }
                var start = (vm.currentImagePage - 1) * vm.maxImages;

                for (var i = start; i < start + maxLoop; i++)
                {
                    if (i < vm.folder.images.urls.length)
                    {
                        vm.imageBuffer[i - start] = vm.folder.images.urls[i];
                    }
                }

                //check if nulls exist and cut the array to non-null
                var nullIdx = -1;
                var delCount = 0;
                for (var i = 0; i < vm.maxImages; i++)
                {
                    if (vm.imageBuffer[i] == null)
                    {
                        if (nullIdx == -1)
                        {
                            nullIdx = i;
                        }
                        delCount = delCount + 1;
                    }
                }
                if (nullIdx > -1)
                {
                    vm.imageBuffer.splice(nullIdx, delCount);
                }
                vm.imageCards = [];
                for (var i = 0; i < vm.imageBuffer.length; i++)
                {
                    var card = {};

                    card["src"] = vm.imageBuffer[i];

                    vm.imageCards.push(card);

                }



            }
            vm.imagePageChanged();
            //////////////////image urls///////////////////////////////////



            for (var i = 0; i < vm.folder.images.pinterestBoards.length; i++)
            {
                var slide = {};
                slide.active = false;
                slide["image"] = vm.folder.images.pinterestBoards[i];
                vm.slides.push(slide);

            }

//
//
//            for (var i = 0; i < vm.folder.images.pins.length; i++)
//            {
//                var card = {};
//
//                card["src"] = vm.folder.images.pins[i];
//
//                vm.pinCards.push(card);
//
//            }


            vm.refreshBoards = function ()
            {
                if (typeof parsePinBtns != 'undefined')
                {
                    //  $log.debug("call parse")
                    parsePinBtns();

                }
            }

            vm.refreshBoards();

            $scope.$on('imagesCompleted', function (ev) {

                vm.refreshBoards();
            });

            //$watch(a,b)
            // a is what is watched
            // b is the call back which is past current and previous values
            $scope.$watch(function () {
                for (var i = 0; i < vm.slides.length; i++) {
                    if (vm.slides[i].active) {
                        return  vm.slides[i];
                    }
                }
            }, function (currentSlide, previousSlide) {
                if (currentSlide !== previousSlide) {

                    vm.refreshBoards();
                }
            });


        });



