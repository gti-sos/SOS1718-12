/*global angular*/
/* global $*/
/*global Highcharts*/
     angular
     .module("managerApp")
     .controller("integrationProxyCtrl",["$scope","$http","$location",function($scope,$http,$location){
    
         $http
                        .get('https://sos2018jllopis-jllopis1.c9users.io/api/v2/taxes-stats/integracionProxy')
                        .then(function(response) {


var api1="/api/v2/taxes-stats";
    var api = "https://sos1718-11.herokuapp.com/api/v2/basketball-stats";
/****************************/
$http
                .get(api1)
                .then(function(response) {

                    var taxData = response.data;

                    $http
                        .get(api)
                        .then(function(response) {

                            var basketData = response.data;
                            var categories=[];
                            var data1 = [];
                            var categories2 = [];
                            var data2 = [];
                            
                            taxData.map(function(d) {
                                //categories.push(d['country']);
                                data1.push(Number(d['year']));
                            })
                            
                            
                            
                            basketData.map(function(d) {
                                //categories2.push(Number(d['year']));
                                data2.push(Number(d['first']));
                               
                            })
                            
                            //console.log(categories);
                            //console.log(data1);
                            //console.log(data2);
                            console.log(data1);
                            
                        

Highcharts.chart('container', {

    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
    },

    legend: {
        enabled: false
    },

    title: {
        text: 'Relation between Year(Taxes-stats) & First(Basketball-stats)'
    },

    subtitle: {
        text: 'Sos1718-12'
    },

    xAxis: {
        gridLineWidth: 1,
        title: {
            text: 'Posicion'
        },
        labels: {
            format: '{value}'
        },
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 65,
            label: {
                rotation: 0,
                y: 15,
                style: {
                    fontStyle: 'italic'
                },
                text: 'Data'
            },
            zIndex: 3
        }]
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Numbers'
        },
        labels: {
            format: '{values}'
        },
        maxPadding: 0.2,
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 50,
            label: {
                align: 'right',
                style: {
                    fontStyle: 'italic'
                },
                text: 'data',
                x: -10
            },
            zIndex: 3
        }]
    },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
            '<tr><th>Posicion:</th><td>{point.x}</td></tr>' +
            '<tr><th>Data Type:</th><td>{point.y}</td></tr>' ,
        footerFormat: '</table>',
        followPointer: true
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },

    series: [{
        data:data1
    },
    {
         data:data2
    }]

});
});
         

/**********************/


});
 
});


/****************************/









         
         
         
         
         
}]);