
/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationInsults",["$scope","$http","$location",function($scope,$http,$location){
      
      console.log("integrationInsults is already initialized!");   
         getCountries();
           function getCountries(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v2/taxes-stats/integrationInsults')
                        .then(function(response) {
                        
                        $scope.mashapeIn=response.data;    
                 
      
                       console.log(response.data);


 
                });
         
         
           }    
}]);