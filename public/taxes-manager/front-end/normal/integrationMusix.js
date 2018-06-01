
/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationMusix",["$scope","$http","$location",function($scope,$http,$location){
      
      console.log("integrationMusix is already initialized!");   
         getCountries();
           function getCountries(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v1/taxes-stats/integrationMusix')
                        .then(function(response) {
                        
                        $scope.mashapeMu=response.data;    
                 
      
                       console.log(response.data);


 
                });
         
         
           }    
}]);