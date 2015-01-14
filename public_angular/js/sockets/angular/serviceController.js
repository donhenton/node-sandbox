(function () {
    
     var serviceController = function ($scope, $log,connectorService   ) {
    
    
         $scope.test = "test get a job " ;
    
    
     };
     
     
    serviceController.$inject = ['$scope', '$log' ,'connectorService' ];
    angular.module('serviceApp')
            .controller('serviceController', serviceController);
     
    
}());

