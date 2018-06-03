angular.module("managerApp").controller("integrationHearth", ["$scope", "$http","$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var api ="api/v2/taxes-stats";
    var mashapePafmon = {
            method: 'GET',
            url: "https://pafmon-walt-whitman-poems.p.mashape.com/poems/o-me-o-life",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
$http.
      get(api)
      .then(function(response){
          
    var taxData = response.data;
    
 $http
(mashapePafmon).then(function(response){ 
    
    var wowData = response.data;
    var mashapeprueba=[];
    
    var tax=[];
    
    taxData.map(function(d) {
                        
                        
                         tax.push(Number(d['year']));
                    });
                    

                                     
 
                        
                        
                         
                
    
    console.log(taxData);
    console.log(wowData.text);
  
    
   
    //Grafica Google Chart Word Trees
    
 new RGraph.SVG.Radar({
        id: 'chart-container',
        data: [
            tax
        ],
        options: {
            filled: true,
            tickmarks: false,
            labels: wowData.title,
            linewidth: 0,
            colors: ['#0f0','red','cyan','blue'],
            filledOpacity: 0.3
        }
    }).draw();
}); 
    
    
});  
}]);