
/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationHack",["$scope","$http","$location",function($scope,$http,$location){
      
      console.log("integrationCountries is already initialized!");   
         getHack();
           function getHack(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v2/taxes-stats/integrationHack')
                        .then(function(response) {
                        
                        $scope.mashapeH=response.data;    
                 
      
                       console.log(response.data);


 
                });
         
         
           }    
}]);