/*global angular*/

angular
    .module("managerApp")
    .controller("hospitalEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("EditCotroller initialized");

        $scope.url = "/api/v2/hospital-stats";



        function refresh() {

            $http
                .get($scope.url + "/" + $routeParams.country)
                .then(function successCallback(response) {
                    $scope.updateStat = response.data[0];

                }, function errorCallback(response) {
                    console.log("Entra1");
                    $scope.updateStat = [];

                });



        }
        $scope.update = function(newStat) {
            $scope.newStat.expense = Number($scope.newStat.expense);
            $scope.newStat.bed = Number($scope.newStat.bed);
            $scope.newStat.attack = Number($scope.newStat.attack);
            

            $http
                .put($scope.url + "/" + newStat.country, {
                    country: newStat.country,
                    year: newStat.year,
                    expense: newStat.expense,
                    bed: newStat.bed,
                    attack: newStat.attack
                })
                .then(function(response) {
                    console.log("Stat Updated 2");
                    switch (response.status) {
                        case 400:
                            alert("Please fill all the fields");
                            break;
                        default:
                            alert("OK");
                            break;
                    }
                    $location.path("/");

                });
        };




        refresh();

    }]);