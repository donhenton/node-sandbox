/**
 * a collection of shared utility routines
 * 
 * @param {type} param1
 * @param {type} param2
 */
angular
        .module('app.services')
        .factory('UtilityService', utilService);


function utilService()
{
    var data = {
        "isUrlOkay": isUrlOkay,
        "checkUrlList": checkUrlList,
        "checkUrlArray": checkUrlArray

    };

    /**
     * check that a string is a url
     * @param {type} url
     * @returns {unresolved}
     */
    function isUrlOkay(url)
    {
        var regex = new RegExp("(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})");
        return !(url.match(regex) === null)

    }

    /**
     * check that an array of strings are all urls. if one of them is
     * not a string, then return false and include the failing url.
     * @param {type} urls
     * @returns {utilService.checkUrlArray.returnInfo|Boolean}
     */
    function checkUrlArray(urls)
    {
        var returnInfo = {"url": null, "fail": false};
        if (typeof urls !== 'undefined') {


            var currentUrl;

            for (var i = 0; i < urls.length; i++)
            {

                currentUrl = urls[i]
                if (!isUrlOkay(urls[i]) && urls[i])
                {

                    returnInfo.url = urls[i];
                    returnInfo.fail = true;
                    return returnInfo;
                }
            }

            return returnInfo;


        }

        returnInfo.fail = true;
        return returnInfo;

    }


    /**
     * 
     * @param {type} listOfUrls a list of urls each terminated by '\n'
     * @returns {utilService.checkUrlList.returnInfo}
     */
    function checkUrlList(listOfUrls)
    {
        
        var urls = listOfUrls.split(/[\n]/g);
        return checkUrlArray(urls);


    }






    return data;
}