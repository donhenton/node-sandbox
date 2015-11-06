angular.module('app').controller('BrowseImagesController', function ($scope,$log, images, $window) {

    var vm = this;
    vm.images = images.data;
    vm.maxImages = 10;
    vm.imageBuffer = new Array(vm.maxImages);
    vm.currentPage = 1;
    vm.totalImages = images.data.length;
    vm.folder = images.folder
    // console.log(images.length)
    // $window.parsePinBtns();


    /**
     * this event handler handles the completed
     * load of image pins. The event originates 
     * in the image-widget-drct.js file
     */
    $scope.$on('imagesCompleted', function (ev) {
      
      //this is the renamed pinterest provided build 
      //function see the data-pin-build tag of the 
      // pinit script in index.html
      // that tag exposes the build function under the name
      // that is the attribute value. the function is attached to the
      // global window object
      // this code is reached one type with this undefined
      
      if (typeof parsePinBtns != 'undefined')
      {
            parsePinBtns();
            
           //  parsePinBtns_grid(document,vm.imageBuffer); 
      }
    });

    vm.pageChanged = function ()
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
        var start = (vm.currentPage - 1) * vm.maxImages;

        for (var i = start; i < start + maxLoop; i++)
        {
            if (i < vm.images.length)
            {
                vm.imageBuffer[i - start] = vm.images[i];
            }
        }
        
        //check if nulls exist and cut the array to non-null
        var nullIdx = -1;
        var delCount = 0;
        for (var i = 0; i < vm.maxImages; i++)
        {
             if (vm.imageBuffer[i]== null)
             {
                 if (nullIdx == -1)
                 {
                     nullIdx = i;
                 }                
                 delCount = delCount +1;
             }
        }
        if (nullIdx > -1)
        {
            vm.imageBuffer.splice(nullIdx,delCount);
        }

    }
    vm.pageChanged();
});