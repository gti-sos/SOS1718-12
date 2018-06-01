angular.module("managerApp").controller("integrationChuck", ["$scope", "$http","$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var api ="api/v1/taxes-stats";
    var mashapeChuck = {
            method: 'GET',
            url: "https://matchilling-chuck-norris-jokes-v1.p.mashape.com/jokes/categories",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
$http.
      get(api)
      .then(function(response){
          
    var taxData = response.data;
    
 $http
(mashapeChuck).
then(function(response){ 
    var tax=[];
    taxData.map(function(d) {
                        
                        
                         tax.push(Number(d['year']));
                    });
    var mashape = response.data;
    //Grafica Google Chart Word Trees
    var mashaChuck = [];
    
    console.log(mashape);
    console.log(mashaChuck);
   
   //PIE CHART CON PLOTLY
   
   var data = [{
  values: tax,
  labels: mashape,
  type: 'pie'
}];

Plotly.newPlot('myDiv', data);
    
    
    
    
    
    
}); 
    
    
});  
}]);