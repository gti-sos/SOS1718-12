/*global angular*/
/*global google*/

angular
    .module("managerApp")
    .controller("mashape1Ctrl", ["$http", "$scope", function($http, $scope) {

        //Variables de mi API
        var totalRape = 0;

        //Variables de la API a integrar zipf
        var perMillion1;
        var perMillion2;
        var res = [];
        var datosNum = [];

        var url = 'https://wordsapiv1.p.mashape.com/words/ok/frequency';
        var url2 = 'https://wordsapiv1.p.mashape.com/words/death/frequency';

        var mashape = {
            method: 'GET',
            url: url,
            headers: {
                "X-Mashape-Key": "gD0CFZrjgamshfYyL0fjaBgtlmXfp1mfzq1jsn9dtw6km09cS7", //get an api key at mashape.com
                "Accept": "application/json"
            }
        };


        var mashape2 = {

            method: 'GET',
            url: url2,
            headers: {
                "X-Mashape-Key": "gD0CFZrjgamshfYyL0fjaBgtlmXfp1mfzq1jsn9dtw6km09cS7", //get an api key at mashape.com
                "Accept": "application/json"
            }

        };

        $http(mashape)
            .then(function(response) {
                var y = response.data;
                console.log(y);
                perMillion1 = y.frequency.perMillion;
                console.log("el response es");
                console.log(response);
            });

        $http
            .get("/api/v2/rape-stats")
            .then(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    var x = response.data[i];
                    res.push([x.country, 'Europe', parseFloat(x["number-of-rape"] / 100), parseFloat(x["number-of-rape"] / 1000)]);
                    totalRape = totalRape + Number(x["number-of-rape"] / 100);
                    datosNum.push([x['number-of-rape'], x.country, x.rate, x.rate]);
                }
                console.log(datosNum);
            });

        $http(mashape2)
            .then(function(response) {
                console.log(response.data);
                var k = response.data;

                perMillion2 = k.frequency.perMillion;

                console.log(perMillion2);

                google.charts.load('current', { 'packages': ['treemap'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable([
                        ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
                        ['Global', null, 0, 0],
                        [perMillion2, 'Death', perMillion2, perMillion2],
                        ['Death', 'Global', perMillion2, perMillion2],
                        ['OK', 'Global', perMillion1, perMillion1],
                        [perMillion1, 'OK', perMillion1, perMillion1],
                        ['Europe', 'Global', totalRape, 0],
                        res[0], res[2], res[4], res[5], res[7], res[9], res[11],
                        datosNum[0], datosNum[2], datosNum[4], datosNum[5], datosNum[7], datosNum[9], datosNum[11]

                    ]);

                    var tree = new google.visualization.TreeMap(document.getElementById('mashapes'));

                    tree.draw(data, {
                        minColor: '#f00',
                        midColor: '#ddd',
                        maxColor: '#0d0',
                        headerHeight: 20,
                        fontColor: 'black',
                        showScale: true
                    });

                }

                
            });
    }]);
