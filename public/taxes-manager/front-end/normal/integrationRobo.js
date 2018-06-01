
/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationRobo",["$scope","$http","$location",function($scope,$http,$location){
      
      console.log("integrationRobo is already initialized!");   
         getRobo();
           function getRobo(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v1/taxes-stats/integrationRobo')
                        .then(function(response) {
                        
                        $scope.mashapeRo=response.data;    
                 
      
                       console.log(response.data);


 
                });
         
         
           }    
}]);