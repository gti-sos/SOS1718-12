
/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationCountries",["$scope","$http","$location",function($scope,$http,$location){
      
      console.log("integrationCountries is already initialized!");   
         getCountries();
           function getCountries(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v1/taxes-stats/integrationCountries')
                        .then(function(response) {
                        
                        $scope.mashapeC=response.data;    
                 
      
                       console.log(response.data);


 
                });
         
         
           }    
}]);