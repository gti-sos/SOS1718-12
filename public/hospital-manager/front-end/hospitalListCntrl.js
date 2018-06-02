angular
    .module("managerApp")
    .controller("hospitalListCntrl", ["$scope", "$http", function($scope, $http) {
        console.log("Cotroller initialized");
        $scope.url = "/api/v2/hospital-stats";
        $scope.refresh = refresh();

        $scope.create = function() {

            $http
                .get($scope.url + "/loadInitialData")
                .then(function(response) {
                    console.log("Created");

                    refresh();
                });


        };


        function refresh() {
            
                $http
                    .get($scope.url)
                    .then(function successCallback(response) {
                        
                        $scope.hospitals = response.data;
                        if ($scope.hospitals.isEmpty) {
                            document.getElementById("createInitialData").disabled = true;
                        }
                        else {
                            document.getElementById("createInitialData").disabled = false;

                        }

                    }, function errorCallback(response) {
                        console.log("Error al cargar los datos");
                        $scope.hospitals= [];

                    });
            
               
            
        }



        $scope.add = function(newStat) {

            $scope.newStat.expense = Number($scope.newStat.expense);
            $scope.newStat.bed = Number($scope.newStat.bed);
            $scope.newStat.attack = Number($scope.newStat.attack);

            $http
                .post($scope.url, $scope.newStat)
                .then(function(response) {
                    console.log("Created");
                    alert("Añadido correctamente");
                    refresh();
                }, function(response) {
                    switch (response.status) {
                        case 409:
                            alert("Error, you are trying to add a existing country");
                            break;
                        case 400:
                            alert("You have not fill all data");
                            break;
                        default:
                            alert("Error try again");
                            break;
                    }
                });
        };
        $scope.delete = function(country) {

            $http
                .delete($scope.url + "/" + country)
                .then(function(response) {
                    console.log("Deleted" + country);
                    alert("Eliminado correctamente");
                    refresh();
                });
        };
        $scope.deleteAll = function() {

            $http
                .delete($scope.url)
                .then(function successCallback(response) {
                    console.log("Deleted");
                    document.getElementById("createInitialData").disabled = false;
                    alert("Eliminados todos los datos");
                }, function errorCallback(response) {
                    console.log("Error al borrar datos");

                    refresh();

                });
            refresh();

        };


        $scope.busqueda = function(dato) {
            var url = $scope.url + "/" + dato;
            $http
                .get(url)
                .then(function successCallback(response) {
                    console.log(url);
                    $scope.hospitals = response.data;
                    console.log("Busqueda con exito");

                }, function errorCallback(response) {

                    console.log("Search Fail");
                    refresh();

                });
        };

        $scope.getData = function() {

            $http
                .get($scope.url)
                .then(function(response) {
                    $scope.hospitals = response.data;

                    if ($scope.hospitals.isEmpty) {
                        document.getElementById("createInitialData").disabled = false;
                    }
                    else {
                        document.getElementById("createInitialData").disabled = true;
                    }

                    console.log("Showing data ");


                });


        };

        $scope.paginacion = function() {

            $http
                .get($scope.url + "&limit=" + $scope.limit + "&offset=" + $scope.offset)
                .then(function(response) {
                    $scope.hospitals = response.data;
                });

        };
        //Paginación
        $scope.viewby = 0;
        $scope.totalItems = function() {
            return $scope.hospitalss.length;
        };
        $scope.currentPage = 1;
        $scope.itemsPerPage = function() {
            return $scope.limit;
        };
        $scope.maxSize = 5; //Number of pages buttons to show

        $scope.offset = 0;




        $scope.newPage = function(pageNo) {
            var viewby = $scope.viewby;
            $scope.currentPage = pageNo;
            $scope.offset = pageNo * viewby - parseInt($scope.viewby);
            $scope.limit = $scope.viewby;
            $http
                .get($scope.url + "&limit=" + $scope.limit + "&offset=" + $scope.offset)
                .then(function(response) {
                    $scope.hospitals = response.data;
                });

        };

        $scope.nextPage = function(pageNo) {
            $scope.currentPage = pageNo;
            $scope.offset = parseInt($scope.offset) + parseInt($scope.viewby);
            console.log($scope.offset);
            $scope.limit = $scope.viewby;
            $http
                .get($scope.url + "&limit=" + $scope.limit + "&offset=" + $scope.offset)
                .then(function(response) {
                    $scope.hospitals = response.data;
                });

        };

        $scope.previousPage = function(pageNo) {
            var viewby = $scope.viewby;
            $scope.currentPage = pageNo;
            $scope.offset -= viewby;

            $http
                .get($scope.url + "&limit=" + $scope.limit + "&offset=" + $scope.offset)
                .then(function(response) {
                    $scope.hospitals = response.data;
                });

        };

        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1;
            $scope.offset = 0;
            var pages = [];
            $http
                .get($scope.url)
                .then(function(response) {
                    for (var i = 1; i <= response.data.length / $scope.viewby; i++) {
                        pages.push(i);

                    }
                    if (pages.length * $scope.viewby < response.data.length) {
                        pages.push(pages.length + 1);
                    }
                    $scope.pages = pages;
                    document.getElementById("pagination").style.display = "block";
                    document.getElementById("pagination").disabled = false;
                });


            $http
                .get($scope.url + "&limit=" + num + "&offset=" + $scope.offset)
                .then(function(response) {
                    $scope.hospitals = response.data;
                });

        };


        refresh();

    }]);
