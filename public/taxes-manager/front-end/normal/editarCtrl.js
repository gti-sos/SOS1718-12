/*global angular*/
/* global Materialize */
angular.module("managerApp")
.controller("editarCtrl",["$scope","$http","$routeParams","$location",function($scope,$http,$routeParams,$location){
    console.log("Edit controller initialized");
    var api = "/api/v1/taxes-stats";

function refresh() {
            $http.get(api + "/" + $routeParams.country + "/" + $routeParams.year).then(function(response) {
                console.log(response);
                $scope.updatedTax = response.data;
               
            });
        }

  
        
         $scope.updateTax= function() {
            var updatedTaxAux = {};
            updatedTaxAux.country = $scope.updatedTax.country;
            updatedTaxAux.year = $scope.updatedTax.year;
            updatedTaxAux.region = $scope.updatedTax.region;
            updatedTaxAux.income_group = $scope.updatedTax.income_group;
            updatedTaxAux.country_code = $scope.updatedTax.country_code;
            console.log($scope.updatedTax);
             
            $http.put(api + "/" + updatedTaxAux.country + "/" + updatedTaxAux.year, updatedTaxAux).then(function(response) {
                $scope.status = "Status: " + response.status;
                $location.path("/api/v1/taxes-stats");
                 alert('editado correctamente');
                //Materialize.toast('<i class="material-icons">error_outline</i> Stat updated!', 2500);
            }, function(response) {
                switch (response.status) {
                    case 400:
                        //Materialize.toast('<i class="material-icons">error_outline</i> Make sure to set all atributes!', 2500);
                        alert('Make sure to set all atributes!');
                        break;
                    default:
                        //Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 2500);
                        alert('Error getting data');
                        break;
                }
            });
        };
        
       refresh();
       
}]);

