
/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationWow",["$scope","$http","$location",function($scope,$http,$location){
      
      console.log("integrationWow is already initialized!");   
         getCountries();
           function getCountries(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v1/taxes-stats/integrationWow')
                        .then(function(response) {
                        
                        $scope.mashapeW=response.data;    
                 
      
                       console.log(response.data);


 
                });
         
         
           }    
}]);