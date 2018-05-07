/*global angular*/

angular.module("managerApp",["ngRoute"]).config(function($routeProvider){
    
    $routeProvider
        .when("/", {
            
           templateUrl: "/home.html" 
            
        }).when("/analytics" ,{
            
            templateUrl: "/graphics.html"
            
            
        }).when("/api/v1/rape-stats",{
            
            templateUrl: "/rape-manager/front-end/normal/rapeList.html",
            controller: "rapeListCtrl"
            
        }).when("/api/v1/rape-stats/edit/:country/:year", {
            
            templateUrl: "/rape-manager/front-end/normal/rapeEdit.html",
            controller: "rapeEditCtrl"
            
        }).when("/api/v1/secure/rape-stats",{
            
            templateUrl: "/rape-manager/front-end/secure/rapeSecureList.html",
            controller: "rapeSecureListCtrl"
            
            
        }).when("/api/v1/secure/rape-stats/edit/:country/:year", {
            
            templateUrl: "/rape-manager/front-end/secure/rapeSecureEdit.html",
            controller: "rapeSecureEditCtrl"
            
        }).when("/analytics/rape-stats/geo",{
            
        templateUrl: "/rape-manager/analytics/rapeGeo.html",
        controller: "rapeGeoCtrl"
        
            
        }).when("/analytics/rape-stats/high", {
                      
           templateUrl: "/rape-manager/analytics/rapeHigh.html",
           controller: "rapeHighCtrl"
           
            
        }).when("/analytics/rape-stats/rgraph",{
            
            templateUrl: "/rape-manager/analytics/rapeRGraph.html",
            controller: "rapeRGraphCtrl"
            
        }).when("/api/v1/taxes-stats",{
            
            templateUrl: "/taxes-manager/front-end/normal/list.html",
            controller: "listadoCtrl"
        
        }).when("/api/v1/taxes-stats/:country/:year", {
            
            templateUrl: "/taxes-manager/front-end/normal/taxEdit.html",
            controller: "editarCtrl"
            
        }).when("/data",{
            templateUrl: "/taxes-manager/front-end/normal/Grafica.html",
            controller: "analitycs-jll"
        });
        
        
    console.log("App initialized and configured");    
    
}) ;