angular.module('app').directive('imageWidget', function ($log, $timeout) {

/**
 * create a pinterest board widget
 * @param {type} url
 * @returns {String}
 */
    var createBoardText = function (url)
    {
        var text = "<a href='" + url + "' " + "data-pin-do='embedBoard' \n\
     data-pin-board-width='450' \n\
     data-pin-scale-height='320' \n\
     data-pin-scale-width='50'></a>";

        return text;

    }

/**
 * create a pinterest widget for an image
 * @param {type} id
 * @returns {undefined}
 */
    var createImageText = function (url)
    {
       return "<a href='" +
                url + "' data-pin-do='embedPin'></a>"


    }

    return {
        restrict: 'E',
        scope: {"url": '=', "type": '@'},
        compile: function (element, attributes)
        {



            var linkFunction = function ($scope, element, attributes) {
               // $log.debug($scope.$parent.$last)
                if ($scope.$parent.$last === true) {
                    $timeout(function () {
                       // $log.debug("send emit")
                        $scope.$emit('imagesCompleted');
                        
                    },20);
                }
                var text = "X"
                if ($scope.type === 'board')
                {
                   
                    text = createBoardText($scope.url);
                    
                }
                else
                {
                    text =  createImageText($scope.url);
                    
                }



                element.html(text);

            }

            return linkFunction;


        }
    };
});