/*global angular*/
     angular
     .module("managerApp")
     .controller("listadoCtrl",["$scope","$http","$location",function($scope,$http,$location){
                
                console.log("listadoCtrl is already initialized!");
                
                var api= "/api/v1/taxes-stats";
                
                //Borrar tax
                 $scope.deleteTax=function(country){
                     
                     console.log("Country to be delete:" + country);
                     $http.delete(api+"/"+country).then(function(response){
                   $scope.status= "Status:" + response.status;
                   getTaxes();
                }); 
                   
                }
                //Borrar todos los recursos
                $scope.deleteTaxAll=function(country){
                     
                     console.log("Country to be delete:" + country);
                     $http.delete(api).then(function(response){
                   $scope.status= "Status:" + response.status;
                    
                   getTaxes();
                }); 
                   
                }
                
                
                /*
                //Añadir Tax
                
                 $scope.addTax=function(){
                   $http.post(api,$scope.newTax).then(function(response){
                    $scope.status=response.status;
                    console.log("Created");
                    alert("Añadido correctamente");
                    getTaxes();
                    $location.path("/");
                
        };
         */   
         $scope.addTax = function(newTax) {

    

    $http
        .post(api,$scope.newTax)

        .then(function(response) {
            console.log("Created");
            getTaxes();
            alert("Añadido correctamente");


        }, function(response) {

            switch (response.status) {
                case 409:
                    alert("Error, you are trying to add a existing country");
                    break;
                case 400:
                    alert("You have not fill all data");
                    break;
                default:
                    alert("Error try again");
                    break;
            }
        });
};
                //Listado
                function getTaxes(){
                   $http.get(api).then(function(response){
                    $scope.taxesstats=response.data;
                }); 
                }
                getTaxes();
                
                
  }]);