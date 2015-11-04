angular
        .module('app.routes', ['ngRoute','app.constants'])
        .config(routes);

function routes($routeProvider,FOLDER_PREFIX) {
    $routeProvider.
            when('/', {
                templateUrl: FOLDER_PREFIX +  'sections/main/main.tpl.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .when('/folder-contents/:id', {
                templateUrl: FOLDER_PREFIX +  'sections/folder-contents/folder-contents.tpl.html',
                controller: 'FolderContentsController',
                controllerAs: 'folderContents',
                resolve: {
                    folderItem: function (FolderService, $route,$log) {
                        
                        var folderData = 
                                {
                            "folder": 
                              FolderService.getFolder($route.current.params.id)
                        };
                        
                       
                        
                        return folderData;
                    }

                }


            })
             .when('/edit-folder/:id', {
                templateUrl: FOLDER_PREFIX +  'sections/edit-folder/edit-folder.tpl.html',
                controller: 'EditFolderController',
                controllerAs: 'editFolder',
                resolve: {
                    folderItem: function (FolderService, $route,$log) {
                        
                        var folderData = 
                                {
                            "folder": 
                              FolderService.getFolder($route.current.params.id)
                        };
                        
                       
                        
                        return folderData;
                    }

                }


            })
            //images,urls,boards
            .when('/load-folders/:type', {
                templateUrl: FOLDER_PREFIX +  'sections/load-folders/load-folders.tpl.html',
                controller: 'LoadFoldersController',
                controllerAs: 'loadFolders',
                resolve: {
                    type: function ($route) {
                        return $route.current.params.type
                    }

                }
            })

            .otherwise({
                redirectTo: '/'
            });
}