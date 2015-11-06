angular
        .module('app.services')

        .factory('BoardsService', boardsService);



function boardsService($log)
{
    var data = {
        
        "getBoards": getBoards


    };
    
    var sampleData = [];
     

    function getBoards() {
        return sampleData;
    }
    

    return data;


}

