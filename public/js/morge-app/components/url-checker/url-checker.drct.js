/*
 * angular directive that will check if a collection of entries in 
 * a url entry textarea meet a url checking regex. Reports the url currently
 * in error to the controller. To do this the controller must define
 * invalidUrl = {"url": ""};
 * see load-folders.ctl
 */

angular.module('app').directive('urlChecker', function ($log, $timeout, UtilityService) {




    return {
        restrict: 'A',
        scope: {
            urlChecker: "="
        },
        require: 'ngModel',
        //https://gist.github.com/CMCDragonkai/6282750

        link: function (scope, element, attrs, $ctrl) {
            $ctrl.$validators.urlChecker = function (urls) {
                //urls is the contents of the text area,
                //so it is \n terminated list of strings
                if (typeof urls === 'undefined')
                {
                    
                    // arriving in bulk load area with an empty list
                    scope.urlChecker.url ="";
                    return true;
                }
                
                
                var valReturn =
                UtilityService.checkUrlList(urls);
                if (valReturn.fail)
                {
                    scope.urlChecker.url = valReturn.url;
                }
                else
                {
                     scope.urlChecker.url ="";

                }
                return !valReturn.fail;
            }

        }
    };














});