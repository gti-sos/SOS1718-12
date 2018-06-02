/*global angular*/

/* global $*/
/*global RGraph*/

     angular
     .module("managerApp")
     .controller("integracionRapeTax",["$scope","$http","$location",function($scope,$http,$location){
    
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v1/taxes-stats/integracionProxy')
                        .then(function(response) {


var api1="/api/v1/taxes-stats";
var api = "https://sos1718-12.herokuapp.com/api/v2/rape-stats";
var api2="https://sos1718-12.herokuapp.com/api/v1/hospital-stats";
/****************************/
$http
                .get(api1)
                .then(function(response) {

                    var taxData = response.data;

                    $http
                        .get(api)
                        .then(function(response) {
                    
                    $http
                        .get(api2)
                        .then(function(response) {

                            var rapeData = response.data;
                            var categories=[];
                            var data1 = [];
                            var categories2 = [];
                            var data2 = [];
                            var data3 = [];
                            var data4 = [];
                            var data5 = [];
                            taxData.map(function(d) {
                                //categories.push(d['country']);
                                data1.push(d['country']);
                            });
                            
                            taxData.map(function(d) {
                                //categories.push(d['country']);
                                data3.push(Number(d['year']));
                            });
                            
                            rapeData.map(function(d) {
                                //categories2.push(Number(d['year']));
                                data2.push(d['country']);
                               
                            });
                            rapeData.map(function(d) {
                                //categories2.push(Number(d['year']));
                                data4.push(Number(d['year']));
                               
                            });
                            rapeData.map(function(d) {
                                //categories2.push(Number(d['year']));
                                data4.push(Number(d['number-of-rape']));
                               
                            });
                            
                            
                            //console.log(categories);
                            //console.log(data1);
                            //console.log(data2);


var trace1 = {
  x: data3,
  y: data3,
  mode: 'markers',
  type: 'scatter',
  name: 'Team A',
  text: data1,
  marker: { size: 12 }
};

var trace2 = {
  x: data4,
  y: [1,2,3,4,5,6],
  mode: 'markers',
  type: 'scatter',
  name: 'Team B',
  text: data2,
  marker: { size: 12 }
};

var data = [ trace1, trace2 ];

var layout = { 
  xaxis: {
    range: data3 
  },
  yaxis: {
    range: data4
  },
  title:'Data Labels Hover'
};

Plotly.newPlot('myDiv', data, layout);









});
         

/**********************/


});
 
});


/****************************/





    }]);
