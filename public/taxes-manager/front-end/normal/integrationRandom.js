
/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationRandom",["$scope","$http","$location",function($scope,$http,$location){
      
      console.log("integrationRandom is already initialized!");   
         getQuotes();
           function getQuotes(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v2/taxes-stats/integrationRandom')
                        .then(function(response) {
                        
                        $scope.mashapeR=response.data;    
                 
      
                       console.log(response.data);


 
                });
         
         
           }    
}]);