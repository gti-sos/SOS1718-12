angular.module("managerApp").controller("integrationMashape3", ["$scope", "$http","$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var api ="api/v1/taxes-stats";
    var mashape3 = {
            method: 'GET',
            url: "https://montanaflynn-fifa-world-cup.p.mashape.com/games",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }}; 
   
$http.get(api).then(function(response){
    
    var taxData = response.data;
    
     
   
$http
(mashape3).
then(function(response){   
    var mashape = response.data;
console.log("Grafica TreeMap highChart Inicializada");    
console.log(mashape);

var datosmashape=[];
var datosTaxes=[];
        
        
                    console.log(response.data);

                   
                    
        console.log(datosmashape); 
        console.log(datosTaxes);
        
                   
                   


var x = [];
var y=[];
mashape.map(function(d) {
                        
                        x.push(Number(d['id']));
                    });
taxData.map(function(d) {
                        
                        
                         x.push(d['country']);
                    });
console.log(x);
console.log(y);
var trace = {
    x: x,
    
    type: 'histogram',
	cumulative: {enabled: true}
  };
var data2 = [trace];
Plotly.newPlot('myDiv', data2);

});
    
});
}]);