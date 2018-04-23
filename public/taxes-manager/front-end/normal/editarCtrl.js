/*global angular*/

angular.module("managerApp")
.controller("editarCtrl",["$scope","$http","$routeParams","$location",function($scope,$http,$routeParams,$location){
    console.log("Edit controller initialized");
    $scope.url  = "api/v1/taxes-stats/";

    function refresh(){
   $http
       .get($scope.url + $routeParams.country + "/" + Number($routeParams.year))
       .then(function successCallback(response) {
           
               $scope.updatedTax = response.data[0];
               console.log("Recurso  encontrado");
               console.log($routeParams.country);
               console.log($routeParams.year);
               
           }, function errorCallback(response) {
               console.log("Recurso No encontrado");
               $scope.updatedTax = [];

           });
}
    
    $scope.updateTax = function(updatedTax){
      
            $http
                .put($scope.url  + updatedTax.country + "/" + Number(updatedTax.year) , {
                    country: updatedTax.country,
                    year: updatedTax.year,
                    region: updatedTax.region,
                    income_group: updatedTax.income_group,
                    country_code: updatedTax.country_code
                })
                .then(function(response) {
                    console.log("Stat Updated 2");
                    switch (response.status) {
                        case 400:
                            alert("Bad request");
                            break;
                        default:
                            alert("OK");
                            break;
                    }
                    $location.path("/api/v1/taxes-stats");

                });
        };
       refresh();
    
}]);

