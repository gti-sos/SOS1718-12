console.log("K14");
angular.module("managerApp").controller("integrationChuck", ["$scope", "$http","$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var api ="api/v2/taxes-stats";
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
    
 console.log("q83");
 
 $http
(mashapeChuck).
then(function(response){ 
    var tax=[];
    console.log("l12");
    taxData.map(function(d) {
            console.log("C");           
                        
                         tax.push(Number(d['year']));
                    });
    var mashape = response.data;
    //Grafica Google Chart Word Trees
    var mashaChuck = [];
    console.log("m23");
    console.log(mashape);
    console.log(mashaChuck);
   
   //PIE CHART CON PLOTLY
 console.log("i23");
   var data = [{
  values: tax,
  labels: mashape,
  type: 'pie'
}];
console.log("ñ19");
Plotly.newPlot('myDiv', data);
console.log("r67"); 
    
    
    
    
    
}); 
console.log("p89");
    
});  
console.log("k23");
}]);
