
/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationFamous",["$scope","$http","$location",function($scope,$http,$location){
      
      console.log("integrationFamous is already initialized!");   
         getFamous();
           function getFamous(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v2/taxes-stats/integrationFamous')
                        .then(function(response) {
                        
                        $scope.mashapeF=response.data;    
                 
      
                       console.log(response.data);


 
                });
         
         
           }    
}]);