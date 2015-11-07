angular
        .module('app.services')

        .factory('FolderService', folderService);



function folderService($log, $http)
{
    var data = {
        "createEmptyFolderStructure": createEmptyFolderStructure,
        "getFolder": getFolder,
        "removeFolder": removeFolder,
        "saveFolder": saveFolder,
        "bulkAddToFolders": bulkAddToFolders,
        "completeEdit": completeEdit,
        "init": init,
        "getFolders": getFolders,
        "setFullData": setFullData,
        "saveData": saveData


    };
    var idCounter = -1;
    var folderData = null;
    var localData = null;


    function saveData(changedFolders)
    {
        angular.forEach(folderData, function (folder, key) {
            //urls,pins,pinterestBoards
              cleanBlanks(folder.images.urls,"urls");
              cleanBlanks(folder.images.pins,"pins");
              cleanBlanks(folder.images.pinterestBoards,"boards");
            
        });
        
        
        
        return  $http.put(g_morgueUrlBase + "saveData", localData);
    }

    function setFullData(d)
    {

        localData = d;
        folderData = d.folderData;
        angular.forEach(folderData, function (value, key) {
            // value.name = value.name + key;
            var idAsInt = parseInt(value.id)
            if (idCounter < idAsInt)
            {
                idCounter = idAsInt;
            }
        });
    }

    function init()
    {
        if (localData == null)
        {

            return  $http.get(g_morgueUrlBase + "getData");
        }
        else
        {
            //return a promise whose resolve is 
        }
    }

    function getFolders()
    {
        return folderData;
    }

    /*
     * add urls to the folder data
     * 
     *  urlType: pinterestBoards, urls
     *  folderSelection: [ folderid1,folderid2...] the folders to send this urls into
     *  urlEntries: the urls to send in as an array
     *  bulk load
     * 
     * @param {type} data
     * @returns {undefined}
     */

    function bulkAddToFolders(dataToAdd)
    {
        //images,urls,boards
        for (var i = 0; i < dataToAdd.folderSelections.length; i++)
        {

            var targetFolder = getFolder(dataToAdd.folderSelections[i]);
            if (targetFolder !== null)
            {
                var loadTarget = null;
                if (dataToAdd.urlType === 'boards')
                {

                    loadTarget = targetFolder.images.pinterestBoards;
                }
                if (dataToAdd.urlType === 'images')
                {

                    loadTarget = targetFolder.images.urls;
                }
                if (dataToAdd.urlType === 'pins')
                {

                    loadTarget = targetFolder.images.pins;
                }

                loadTarget.push.apply(loadTarget, dataToAdd.urlEntries);

            }


        }

    }
    ;

    /**
     * 
     *  {"name": "Sci-fi and space ships", "id": 1, "images": {"urls": urlData, "pins": pinData, "pinterestBoards": boardData}},
     * 
     * create an empty folder structure
     * @returns {folderService.createEmptyFolderStructure.newItem}
     */
    function createEmptyFolderStructure()
    {
        idCounter = idCounter + 1;
        var newItem = {"name": "", "id": idCounter};
        newItem.images = {};
        newItem.images.urls = [];
        newItem.images.pinterestBoards = [];
        newItem.images.pins = [];

        return newItem;


    }


    function saveFolder(folder) {
        folderData.push(folder)
    }
    ;
    function removeFolder(folder)
    {
        angular.forEach(folderData, function (value, key)
        {
            if (value.id === folder.id)
            {
                // $log.debug("id is "+value.id)
                folderData.splice(key, 1);

            }
        });
    }
    function getFolder(id)
    {
        var value = null;
        for (var i = 0; i < folderData.length; i++)
        {
            if (folderData[i].id === id)
            {
                // $log.debug("value "+folderData[i].id+" id "+id +" "+(folderData[i].id == id))
                value = folderData[i];
                break;
            }
        }
        return value;
    }

    function cleanBlanks(arrayValue, type)
    {
        angular.forEach(arrayValue, function (value, key)
        {
            if (value.trim() === "")
            {
                $log.debug(type+" hit blank at index is "+key+" old len "+arrayValue.length)
                arrayValue.splice(key, 1);
                
            } 
        });

    }

    /**
     * data 
     *     urls comma separated urls list should replace current list
     *     pinterestBoards comma separatged list should replace current list
     *     name folder name
     *     id folder id
     *     
     * @param {type} data
     * @returns {undefined}
     */
    function completeEdit(data)
    {
        var folderIdx = -1;
        for (var i = 0; i < folderData.length; i++)
        {
            if (data.id === folderData[i].id)
            {
                folderIdx = i;
                break;
            }
        }

        if (folderIdx > -1)
        {

            var currentFolder = folderData[i];
            currentFolder.name = data.name;
            currentFolder.images.urls = data.urls;
            currentFolder.images.pinterestBoards = data.pinterestBoards;
            currentFolder.images.pins = data.pinterestPins;

        }



    }

    return data;


}

