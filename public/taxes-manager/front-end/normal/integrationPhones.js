/*global angular*/
     angular
     .module("managerApp")
     .controller("integrationPhones",["$scope","$http","$location",function($scope,$http,$location){
         getPoems();
         console.log("integrationPhones is already initialized!");
    function getPoems(){
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v1/taxes-stats/phoneProxy')
                        .then(function(response) {
                        
                        $scope.mashapeP=response.data;    
                 
      
                       console.log(response.data);


 
                });
            
}


}]);