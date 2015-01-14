(function () {
    
     var serviceController = function ($scope, $log,socketConnectorFactory   ) {
    
    
         $scope.test = "test get a job " ;
    
    
     };
     
     
    serviceController.$inject = ['$scope', '$log' ,'socketConnectorFactory' ];
    angular.module('serviceApp')
            .controller('serviceController', serviceController);
     
    
}());

