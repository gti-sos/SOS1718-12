/*global angular*/
/*global Highcharts*/
     angular
     .module("managerApp")
     .controller("integrationCorsCtrl",["$scope","$http","$location",function($scope,$http,$location){
    var api1="/api/v1/taxes-stats";
    var api = "https://sos1718-03.herokuapp.com/api/v1/pollution-cities";
    
    

            $http
                .get(api1)
                .then(function(response) {

                    var taxData = response.data;

                    $http
                        .get(api)
                        .then(function(response) {

                            var pollutionData = response.data;
                            var categories=[];
                            var data = [];
                            var categories2 = [];
                            var data2 = [];
                            
                            taxData.map(function(d) {
                                categories.push(d['country']);
                                data.push(d['country']);
                            })
                            
                            
                            /*
                            pollutionData.map(function(d) {
                                categories2.push(Number(d['year']));
                                data.push(Number(d['year']));
                               
                            })
                            */
                            //console.log(categories);
                            //console.log(data1);
                            console.log(data);
                            console.log(categories2);
                            
 
//HIGHCHART CORS
Highcharts.chart('container', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'IntegrationCors'
    },
    subtitle: {
        text: 'pollution Ft Taxes'
    },
    xAxis: {
        categories :categories
    }/*,
    yAxis: {
        categories2: [categories2],
        title: {
            text: 'nitrous'
        },
        
    }*/,
    series: [{
        name: 'Pollutions',
        marker: {
            symbol: 'square'
        },
        data: response.data.map(function(d) {
            return parseInt(d.nitrous);
        })

    },
    {
        name:'Countries',
        data:response.data.map(function(d) {
            return d.country;
        })
    }]
});
/**********************/


});
 
});
}]);