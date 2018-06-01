
/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationBook",["$scope","$http","$location",function($scope,$http,$location){
      
      console.log("integrationBook is already initialized!");   
         getBooks();
           function getBooks(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v1/taxes-stats/integrationBook')
                        .then(function(response) {
                        
                        $scope.mashapeB=response.data;    
                 
      
                       console.log(response.data);


 
                });
         
         
           }    
}]);