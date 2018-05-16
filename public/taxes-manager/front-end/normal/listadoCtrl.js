/*global angular*/
     angular
     .module("managerApp")
     .controller("listadoCtrl",["$scope","$http","$location",function($scope,$http,$location){
                
          
           console.log("listadoCtrl is already initialized!");
           
           var api= "/api/v1/taxes-stats";
           
          getTaxes();
          
          
     //LoadInitialData 
     
     $scope.loadInitialData = function() {
       $http.get("/api/v1/taxes-stats/loadInitialData").then(function(response) {
           $scope.status = "Status: " + response.status;
           getTaxes();
           alert('Created');
           
       });
   };  
        
         //Listado
        
           function getTaxes(){
              $http.get(api).then(function(response){
               $scope.taxesstats=response.data;
           }); 
           }
      

       //Borrar Un Recurso Concreto
       
       $scope.deleteTax = function(country) {

        $http.delete(api + "/" + country)

            .then(function successCallback(response) {
                console.log("borrado del dato completado con éxito");
                getTaxes();
                alert("Dato borrado correctamente");


            }, function errorCallback(response) {
                alert("no se ha borrado el dato");
                console.log("No se ha podido borrar el dato en concreto");


            });

    };
          //Borrar todos los recursos 
          
           $scope.deleteTaxAll=function(country){
                
                console.log("Country to be delete:" + country);
                $http.delete(api).then(function(response){
              $scope.status= "Status:" + response.status;
              alert('taxes deleted');
              getTaxes();
              
           }); 
              
           };
           
           //Post A un recurso
           
            $scope.addTax = function(newTax) {
                  $http
                       .post(api,$scope.newTax)

                         .then(function(response) {
                              console.log("Created");
                                getTaxes();
                                alert("Añadido correctamente");


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
                
     //Busquedas
     
     //PorAÑO (DesdeHasta)
     
    $scope.searchYear = function(from, to) {

        $http.get(api + "?" + "fromYear=" + from + "&" + "toYear=" + to)

            .then(function successCallback(response) {
                console.log("busqueda por años realizada correctamente");
                alert("búsqueda con éxito");
                $scope.taxesstats = response.data;

            }, function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas");
                $scope.taxesstats = [];

            });


    };
    
     //PorPAIS
     
        $scope.searchCountry = function(country) {

        $http.get(api + "?" + "country=" + country)

            .then(function successCallback(response) {
                console.log("busqueda por países realizada correctamente");
                alert("búsqueda con éxito");
                $scope.taxesstats = response.data;
                 

            },function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas países");
                alert( country + " " + "No existe");
                $scope.taxesstats = [];
            });


    };
    
    //PorRegion
      $scope.searchRegion = function(region) {

        $http.get(api + "?" + "region=" + region)

            .then(function successCallback(response) {
                console.log("busqueda por países realizada correctamente");
                alert("búsqueda con éxito");
                $scope.taxesstats = response.data;
                 

            },function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas países");
                alert( region + " " + "No existe");
                $scope.taxesstats = [];
            });


    };
    
 //PorIncomeGroup
 
 $scope.searchIncome = function(inc) {

        $http.get(api + "?" + "inc=" + inc)

            .then(function successCallback(response) {
                console.log("busqueda por Income realizada correctamente");
                alert("búsqueda con éxito");
                $scope.taxesstats = response.data;
                 

            },function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas países");
                alert( "Income_group" + " " + "No existe");
                $scope.taxesstats = [];
            });


    };
//PorCountryCode

$scope.searchCountryCode = function(coun) {

        $http.get(api + "?" + "coun=" + coun)

            .then(function successCallback(response) {
                console.log("busqueda por Codigo realizada correctamente");
                alert("búsqueda con éxito");
                $scope.taxesstats = response.data;
                 

            },function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas países");
                alert( "Country_Code" + " " + "No existe");
                $scope.taxesstats = [];
            });
};
    

//PorYear
     
        $scope.searchOneYear = function(year) {

        $http.get(api + "?" + "year=" + year)

            .then(function successCallback(response) {
                console.log("busqueda por Año realizada correctamente");
                alert("búsqueda con éxito");
                $scope.taxesstats = response.data;
                 

            },function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas países");
                alert( year + " " + "No existe");
                $scope.taxesstats = [];
            });


    };
    
//PORTODO

$scope.searchTotal = function(country, year,region,inc,coun) {

        $http.get(api + "?" + "country=" + country + "&" + "year=" + year +"&" + 
        "region=" + region + "&" + "inc=" + inc + "&" + "coun=" + coun )

            .then(function successCallback(response) {
                console.log("busqueda por totales realizada correctamente");
                alert("búsqueda con éxito");
                $scope.database = response.data;

            }, function errorCallback(response) {
                console.log("Error al cargar los datos,fallo búsquedas");
                $scope.database = [];

            });


    };
       /****Paginación***/


    $scope.pagination = function(limit, offset) {
        console.log("Hemos entrado en el pagination");

        $scope.currentPage = 1;
        $scope.offset = offset;
        var pages = [];
        if ($scope.limit > 0) {
            $http
                .get(api)
                .then(function(response) {
                    console.log("dentro del get de pagination");

                    for (var i = 1; i <= ((response.data.length - $scope.offset) / $scope.limit); i++) {
                        pages.push(i);

                    }
                    if (pages.length * $scope.limit < response.data.length - $scope.offset) {
                        pages.push(pages.length + 1);
                    }
                    $scope.pages = pages;
                    document.getElementById("numberPagination").disabled = false;
                });

            $http.get(api+ "?limit=" + $scope.limit + "&offset=" + $scope.offset)
                .then(function successCallback(response) {
                    console.log("estamos dentro del limit y offset y hemos cogido los datos correctamente");
                    alert("Paginación realizada correctamente");
                    $scope.taxesstats = response.data;

                }, function errorCallback(response) {
                    console.log("Error al cargar los datos, no se encuentran");
                    $scope.taxesstats = [];

                });

        }
        else {
            getTaxes();
        }

    };
    
    $scope.newPage = function(pageNumber) {
        console.log("estamos dentro del new page y el limit y offset son de " + $scope.limit + " y " + $scope.offset);

        var limit = $scope.limit;
        $scope.currentPage = pageNumber;
        //cambiamos el offset para que nos muestre los siguientes elementos
        $scope.offset = pageNumber * limit - parseInt($scope.limit);
        $http
            .get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset)
            .then(function(response) {
                $scope.taxesstats = response.data;
            });

    };

  $scope.nextPage = function(pageNumber) {
        console.log("estamos dentro del next page y el limit y offset son de " + $scope.limit + " y " + $scope.offset);
        $scope.currentPage = pageNumber;
        $scope.offset = parseInt($scope.offset) + parseInt($scope.limit);
        $http
            .get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset)
            .then(function(response) {
                $scope.taxesstats = response.data;
            });

    };
    
  $scope.previousPage = function(pageNumber) {
        console.log("estamos dentro del previous page y el limit y offset son de " + $scope.limit + " y " + $scope.offset);

        var viewby = $scope.limit;
        $scope.currentPage = pageNumber;
        $scope.offset -= viewby;

        $http
            .get(api+ "?" + "limit=" + $scope.limit + "&offset=" + $scope.offset)
            .then(function(response) {
                $scope.taxesstats = response.data;
            });

    };
    
    
    
    
   
    
             
  }]);