/*global angular*/
/*global Highcharts*/

angular
    .module("managerApp")
    .controller("clashApiCtrl", ["$http", "$scope", function($http, $scope) {


        //Url de la api del clash: http://www.clashapi.xyz/api/arenas

        var conjunto1 = [];
        var conjunto2 = [];
        var urlExt = "http://www.clashapi.xyz/api/arenas";

        $http
            .get(urlExt)
            .then(function(response) {

                for (var j = 0; j < response.data.length; j++) {
                    var y = response.data[j];
                    conjunto1.push([y.minTrophies]);
                }

                $http
                    .get("/api/v2/rape-stats")
                    .then(function(response) {

                        for (var i = 0; i < response.data.length; i++) {
                            var x = response.data[i];
                            conjunto2.push([x.year, x["total-since-two-thousand"] / 1000]);

                        }

                        console.log(conjunto1);
                        console.log("");
                        console.log(conjunto2);
                    });

            });

    }]);
