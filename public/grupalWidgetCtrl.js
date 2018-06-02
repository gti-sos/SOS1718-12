/*global angular*/
/*global Plotly*/
angular
    .module("managerApp")
    .controller("grupalWidgetCtrl", ["$http", "$scope", function($http, $scope) {

        /*$http
            .get('https://sos2018jllopis-jllopis1.c9users.io/api/v1/taxes-stats/integracionProxy')
            .then(function(response) {

*/
        var api1 = "/api/v1/taxes-stats";
        var api = "/api/v2/rape-stats";
        var hospital = "/api/v1/hospital-stats"
        var hospdata = [];
        /****************************/

        $http
            .get(api1)
            .then(function(response) {

                var taxData = response.data;

                $http
                    .get(api)
                    .then(function(response) {

                        var rapeData = response.data;
                        var data1 = [];
                        var data2 = [];
                        var data3 = [];
                        var data4 = [];
                        taxData.map(function(d) {
                            data1.push(d['country']);
                        });

                        taxData.map(function(d) {
                            data3.push(Number(d['year']));
                        });

                        rapeData.map(function(d) {
                            data2.push(d['country']);

                        });
                        rapeData.map(function(d) {
                            data4.push(Number(d['year']));

                        });
                        rapeData.map(function(d) {
                            data4.push(Number(d['number-of-rape']));

                        });


                        $http.get(hospital).then(function(response) {



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
                                y: [1, 2, 3, 4, 5, 6],
                                mode: 'markers',
                                type: 'scatter',
                                name: 'Team B',
                                text: data2,
                                marker: { size: 12 }
                            };
                            
                           

                            var data = [trace1, trace2];

                            var layout = {
                                xaxis: {
                                    range: data3
                                },
                                yaxis: {
                                    range: data4
                                },
                                title: 'Data Labels Hover'
                            };

                            Plotly.newPlot('grupal', data, layout);

                        });

                    });


                // });

            })
    }]);
