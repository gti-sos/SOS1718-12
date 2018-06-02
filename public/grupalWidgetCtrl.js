/*global angular*/
/*global Plotly*/
angular
    .module("managerApp")
    .controller("grupalWidgetCtrl", ["$http", "$scope", function($http, $scope) {


        var api1 = "/api/v1/taxes-stats";
        var api = "/api/v2/rape-stats";
        var hospital = "/api/v1/hospital-stats"
        var hospdata = [];
        var hospdata2=[];
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
                        var data5=[];
                        taxData.map(function(d) {
                            data1.push(d['country']);
                        });

                        taxData.map(function(d) {
                            data3.push(Number(d['year']));
                        });

                        rapeData.map(function(d) {
                            data4.push(Number(d['year']));

                        });
                        rapeData.map(function(d) {
                            data5.push(Number(d['number-of-rape']));

                        });


                        $http.get(hospital).then(function(response) {

                    var hospitald= response.data;
                    
                hospitald.map(function(d) {
                            hospdata.push(d['country']);

                        });
                hospitald.map(function(d) {
                            hospdata2.push(Number(d['year']));

                        });
                            var trace1 = {
                                x: data3,
                                y: data4,
                                mode: 'markers',
                                type: 'scatter',
                                name: 'Taxes-Stats(year,country)',
                                text: data1,
                                marker: { size: 12 }
                            };

                            var trace2 = {
                                x: data4,
                                y: data4,
                                mode: 'markers',
                                type: 'scatter',
                                name: 'Rape-Stats (year,Number of rape)',
                                text: data5,
                                marker: { size: 12 }
                            };
                            var trace3 = {
                                x: hospdata2,
                                y: data4,
                                mode: 'markers',
                                type: 'scatter',
                                name: 'Hospital-Stats(year,country)',
                                text: hospdata,
                                marker: { size: 12 }
                            };
                           
                         var data = [ trace1, trace2,trace3];

                            var layout = {
                                xaxis: {
                                    range: data2
                                },
                                yaxis: {
                                    range: data3
                                },
                                title: 'Integracion Grupal'
                            };

                            Plotly.newPlot('grupal', data, layout);

                        });

                    });


                // });

            })
    }]);
