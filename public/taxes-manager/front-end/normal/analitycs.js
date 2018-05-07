/* global angular */
/* global Highcharts */

/*global google*/


angular.module("managerApp").controller("analitycs", ["$scope", "$http","$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var api ="api/v1/taxes-stats";
    
    
//Grafica HighChart
    
var data = []; 
$http.get(api).then(function(response){

console.log("Grafica highChart Inicializada");
console.log(response.data);
console.log(response.data.map(function(d) { return d.year }));
console.log(response.data.map(function(d) { return d.country}));
console.log(response.data.map(function(d) { return d.region}));
console.log(response.data.map(function(d) { return d.income_group}));
console.log(response.data.map(function(d) { return d.country_code}));


Highcharts.chart('container', {

    title: {
        text: 'Taxes-stats'
    },

    xAxis: {
        categories : response.data.map(function(d) {
            return (d.country);
        },)
       // tickInterval: 1
    },

    yAxis: {
        type: 'logarithmic',
        minorTickInterval: 0.2
    },
  
    tooltip: {
        headerFormat: '<b>{taxes.name}</b><br />',
        pointFormat: 'country = {point.x}, year = {point.y}'
    },

    series: [{
        name:'Año',
        data: response.data.map(function(d) {
            return parseInt(d.year);
        })
        
       
    }]
});
});


    
    
    $http.get(api).then(function(response) {
         var years = response.data.map(function(d) {
         return parseInt(d.year)
     });
     var countries = response.data.map(function(d) {
         return parseInt(d.country)
     });
     
    //Google GeoChart
   
    /*       
        console.log("Google Chart inicializado Correctamente");
        console.log(response.data.filter(d => d.country_txt == "Spain").length);
        console.log(response.data.map(function(d) { return d.year }));
        console.log(response.data.map(function(d) { return d["country"] }));
        
        
        google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var datosFinales = [
                        ['Country', 'Year']
                    ];

                    console.log(response.data);
                    response.data.forEach(function(item) {
                        datosFinales.push([item.country, Number(item.year)]);
                    });


                    var data = google.visualization.arrayToDataTable(datosFinales);
                    console.log(data)
       // var data = google.visualization.arrayToDataTable(googleChartData)

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }
    });
    
 */
 
       
        
        google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var datos = [
                        ['Country', 'Year']
                    ];
                    console.log(response.data);

                    response.data.map(function(d) {
                        var total = "year:"+ Number(d['year']) +","+ "region:"+ d['region'] + ","+"income_group :" + d['income_group'] + ","+"country_code:"+ d['country_code'];
                        datos.push([d['country'], total]);
                    });


                    var data = google.visualization.arrayToDataTable(datos);
                    console.log(datos)
       // var data = google.visualization.arrayToDataTable(googleChartData)

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }
    });
 
      
    //C3.js
  
    $http.get(api).then(function (response){
        
        var countries = [['Countries']];
        
         response.data.forEach(function(item) {
                        countries.push(item.country);
                    });
                    var years = [['Years']];
        response.data.forEach(function(item) {
                        years.push(Number(item.year));
                    });
        var datosFinales = [
                        ['Country:Punto', 'Year']
                    ];

                    console.log(response.data);
                    response.data.forEach(function(item) {
                        datosFinales.push([item.country, Number(item.year)]);
                    });
        var chart = c3.generate({
  data: {
    rows: 
 datosFinales
  
,
    keys: {
      //x: 'name', // it's possible to specify 'x' when category axis
      value: ['Countries']
    }
  },
  axis: {
    x: {
       type: 'country'
    }
  }
});
     
});




}]);