
/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationMess",["$scope","$http","$location",function($scope,$http,$location){
      
      console.log("integrationMess is already initialized!");   
         getQuotes();
           function getQuotes(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v1/taxes-stats/integrationMessages')
                        .then(function(response) {
                        
                        $scope.mashapeMe=response.data;    
                 
      
                       console.log(response.data);


 
                });
         
         
           }    
}]);