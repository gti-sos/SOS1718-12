/*global angular*/

angular.module("managerApp", ["ngRoute"]).config(function($routeProvider) {

    $routeProvider
        .when("/", {

            templateUrl: "/home.html"

        }).when("/analytics", {

            templateUrl: "/graphics.html"


        }).when("/api/v2/rape-stats", {

            templateUrl: "/rape-manager/front-end/normal/rapeList.html",
            controller: "rapeListCtrl"

        }).when("/api/v2/rape-stats/edit/:country/:year", {

            templateUrl: "/rape-manager/front-end/normal/rapeEdit.html",
            controller: "rapeEditCtrl"

        }).when("/api/v2/secure/rape-stats", {

            templateUrl: "/rape-manager/front-end/secure/rapeSecureList.html",
            controller: "rapeSecureListCtrl"


        }).when("/api/v2/secure/rape-stats/edit/:country/:year", {

            templateUrl: "/rape-manager/front-end/secure/rapeSecureEdit.html",
            controller: "rapeSecureEditCtrl"

        }).when("/analytics/rape-stats/geo", {

            templateUrl: "/rape-manager/analytics/rapeGeo.html",
            controller: "rapeGeoCtrl"


        }).when("/analytics/rape-stats/high", {

            templateUrl: "/rape-manager/analytics/rapeHigh.html",
            controller: "rapeHighCtrl"


        }).when("/analytics/rape-stats/rgraph", {

            templateUrl: "/rape-manager/analytics/rapeRGraph.html",
            controller: "rapeRGraphCtrl"

        }).when("/analytics/proxyRD", {

            templateUrl: "/rape-manager/analytics/integrations/proxyRD.html",
            controller: "proxyRDCtrl"

        }).when("/analytics/normalRW", {

            templateUrl: "/rape-manager/analytics/integrations/normalRW.html",
            controller: "normalRWCtrl"

        }).when("/analytics/mashape1", {

            templateUrl: "/rape-manager/analytics/integrations/mashape1.html",
            controller: "mashape1Ctrl"

        }).when("/analytics/mashape2", {

            templateUrl: "/rape-manager/analytics/integrations/mashape2.html",
            controller: "mashape2Ctrl"

        }).when("/analytics/progweb1", {

            templateUrl: "/rape-manager/analytics/integrations/ProgWeb1.html",
            controller: "ProgWeb1Ctrl"

        }).when("/analytics/progweb2", {

            templateUrl: "/rape-manager/analytics/integrations/ProgWeb2.html",
            controller: "ProgWeb2Ctrl"

        }).when("/api/v1/taxes-stats", {

            templateUrl: "/taxes-manager/front-end/normal/list.html",
            controller: "listadoCtrl"

        }).when("/api/v1/taxes-stats/:country/:year", {

            templateUrl: "/taxes-manager/front-end/normal/taxEdit.html",
            controller: "editarCtrl"

        }).when("/analytics/taxes-stats/data", {
            templateUrl: "/taxes-manager/front-end/normal/Grafica.html",
            controller: "analitycs-jll"
<<<<<<< HEAD
        }).when("/integrationProxy",{
            templateUrl:"/taxes-manager/front-end/normal/integrationProxy.html",
            controller:"integrationProxyCtrl"
            
        }).when("/integrationCors",{
            templateUrl:"/taxes-manager/front-end/normal/integrationCors.html",
            controller:"integrationCorsCtrl"
            });
        
        
    console.log("App initialized and configured");    
    
}) ;
=======
        });


    console.log("App initialized and configured");

});
>>>>>>> f680f9f46f0392ccbc049986ec8e89665308784a
