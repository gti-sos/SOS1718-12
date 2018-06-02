/*global angular*/

angular.module("managerApp", ["ngRoute"]).config(function($routeProvider) {

    $routeProvider
        .when("/", {

            templateUrl: "/home.html"

        }).when("/integrations", {

            templateUrl: "/graphics.html"


        }).when("/analytics", {

            templateUrl: "/grupalWidget.html",
            controller: "grupalWidgetCtrl"


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

        }).when("/analytics/clash", {

            templateUrl: "/rape-manager/analytics/integrations/clashApi.html",
            controller: "clashApiCtrl"

        }).when("/analytics/ghibli", {

            templateUrl: "/rape-manager/analytics/integrations/ghibli.html",
            controller: "ghibliCtrl"

        }).when("/analytics/beers", {

            templateUrl: "/rape-manager/analytics/integrations/beers.html",
            controller: "beersCtrl"











        }).when("/api/v1/taxes-stats", {

            templateUrl: "/taxes-manager/front-end/normal/list.html",
            controller: "listadoCtrl"

        }).when("/api/v1/taxes-stats/:country/:year", {

            templateUrl: "/taxes-manager/front-end/normal/taxEdit.html",
            controller: "editarCtrl"

        }).when("/analytics/taxes-stats/data", {
            templateUrl: "/taxes-manager/front-end/normal/Grafica.html",
            controller: "analitycs-jll"
        }).when("/integrationProxy", {
            templateUrl: "/taxes-manager/front-end/normal/integrationProxy.html",
            controller: "integrationProxyCtrl"

        }).when("/integrationCors", {
            templateUrl: "/taxes-manager/front-end/normal/integrationCors.html",
            controller: "integrationCorsCtrl"


        }).when("/analytics/integrationPhone", {
            templateUrl: "/taxes-manager/front-end/normal/integrationPhone.html",
            controller: "integrationPhones"
        }).when("/analytics/integrationMashape3", {
            templateUrl: "/taxes-manager/front-end/normal/integrationMashape3.html",
            controller: "integrationMashape3"

        }).when("/analytics/integrationChuck", {
            templateUrl: "/taxes-manager/front-end/normal/integrationChuck.html",
            controller: "integrationChuck"

        }).when("/analytics/integrationRandom", {
            templateUrl: "/taxes-manager/front-end/normal/integrationRandom.html",
            controller: "integrationRandom"

        }).when("/analytics/integrationWow", {
            templateUrl: "/taxes-manager/front-end/normal/integrationWow.html",
            controller: "integrationWow"

        }).when("/analytics/integrationIndian", {
            templateUrl: "/taxes-manager/front-end/normal/integrationIndian.html",
            controller: "integrationIndian"

        }).when("/analytics/integrationCountries", {
            templateUrl: "/taxes-manager/front-end/normal/integrationCountries.html",
            controller: "integrationCountries"

        }).when("/analytics/integrationMusix", {
            templateUrl: "/taxes-manager/front-end/normal/integrationMusix.html",
            controller: "integrationMusix"

        }).when("/analytics/integrationRobo", {
            templateUrl: "/taxes-manager/front-end/normal/integrationRobo.html",
            controller: "integrationRobo"

        }).when("/analytics/integrationBook", {
            templateUrl: "/taxes-manager/front-end/normal/integrationBook.html",
            controller: "/analytics/integrationBook"

        }).when("/analytics/integrationMess", {
            templateUrl: "/taxes-manager/front-end/normal/integrationMess.html",
            controller: "integrationMess"

        }).when("/analytics/integrationInsults", {
            templateUrl: "/taxes-manager/front-end/normal/integrationInsults.html",
            controller: "integrationInsults"

        }).when("/analytics/integrationFamous", {
            templateUrl: "/taxes-manager/front-end/normal/integrationFamous.html",
            controller: "integrationFamous"

        }).when("/analytics/integrationHack", {
            templateUrl: "/taxes-manager/front-end/normal/integrationHack.html",
            controller: "integrationHack"

        }).when("/analytics/integrationWeather", {
            templateUrl: "/taxes-manager/front-end/normal/integrationWeather.html",
            controller: "integrationWeather"

        }).when("/analytics/integracionRapeTax", {
            templateUrl: "/taxes-manager/front-end/normal/integracionRapeTax.html",
            controller: "integracionRapeTax"
        
        }).when("/hospitals",{
        templateUrl : "/hospital-manager/front-end/hospitalList.html",
        controller : "hospitalListCntrl"
        
        }).when("/hospitals/edit/:country",{
        templateUrl : "/hospital-manager/front-end/hospitalEdit.html",
        controller : "hospitalEditCtrl"
        });


    console.log("App initialized and configured");

});
