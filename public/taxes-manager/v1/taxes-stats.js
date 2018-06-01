var request = require("request");

//Url Base 
var BASE_API_PATH_TAXES_STATS = "/api/v1/taxes-stats";

var taxesApi={};
module.exports = taxesApi;


taxesApi.register = function(app, db) {
//console.log("Registering routes for taxes API...");
/*****CORS*******/
var cors = require("cors");
app.use(cors());
/**************INTEGRACIONES**************/

 var basket = "https://sos1718-11.herokuapp.com/api/v2/basketball-stats";
 var pollution = "https://sos1718-03.herokuapp.com/api/v1/pollution-cities";
   
    //BasketBall-Stats
    
    app.use(BASE_API_PATH_TAXES_STATS + "/integracionProxy", function(req, res) {
        req.pipe(request(basket)).pipe(res);
    });
    //Pollutions-stats
    
    app.use(BASE_API_PATH_TAXES_STATS + "/cors", function(req, res) {
        req.pipe(request(pollution)).pipe(res);
    });
    //Rape-Stats
    
    var rape = "https://sos1718-12.herokuapp.com/api/v2/rape-stats";
    
    app.use(BASE_API_PATH_TAXES_STATS + "/integracionRapeTax", function(req, res) {
        req.pipe(request(rape)).pipe(res);
        
    });
   //Integración Candlestick con Mashape POEMS
   
   var mashapePafmon = {
            method: 'GET',
            url: "https://pafmon-walt-whitman-poems.p.mashape.com/poems/o-me-o-life",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
   
  
   
   app.use(BASE_API_PATH_TAXES_STATS + "/phoneProxy", function(req, res) {
        req.pipe(request(mashapePafmon)).pipe(res);
         console.log(mashapePafmon);
    });
   
   //Integracion Mashape
   
   var mashapeTree = {
            method: 'GET',
            url: "https://simple-weather.p.mashape.com/weatherdata?lat=1.0&lng=1.0",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
   app.use(BASE_API_PATH_TAXES_STATS + "/integrationMashape2", function(req, res) {
        req.pipe(request(mashapeTree)).pipe(res);
         console.log(mashapeTree);
    });
    //Integracion con Mashape FIFA WORLD CUP
   var mashape3 = {
            method: 'GET',
            url: "https://montanaflynn-fifa-world-cup.p.mashape.com/games",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
   app.use(BASE_API_PATH_TAXES_STATS + "/integrationMashape3", function(req, res) {
        req.pipe(request(mashape3)).pipe(res);
         console.log(mashape3);
    });
    
    //Integracion Mashape con Chuck Norris
    var mashapeChuck = {
            method: 'GET',
            url: "https://matchilling-chuck-norris-jokes-v1.p.mashape.com/jokes/categories",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
      app.use(BASE_API_PATH_TAXES_STATS + "/integrationChuck", function(req, res) {
        req.pipe(request(mashapeChuck)).pipe(res);
         console.log(mashapeChuck);
    });
    //Integracion Mashape con RandomQuotes
    
    var mashapeRandom = {
            method: 'GET',
            url: "https://quotes.p.mashape.com/",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
    app.use(BASE_API_PATH_TAXES_STATS + "/integrationRandom", function(req, res) {
        req.pipe(request(mashapeRandom)).pipe(res);
         console.log(mashapeRandom);
    });
//Integracion WOW
var mashapeWow = {
            method: 'GET',
            url: "https://omgvamp-hearthstone-v1.p.mashape.com/info",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
app.use(BASE_API_PATH_TAXES_STATS + "/integrationWow", function(req, res) {
        req.pipe(request(mashapeWow)).pipe(res);
         console.log(mashapeWow);
    });
    
    //Integracion Mashape Rest Countries
    
    var mashapeCountries = {
            method: 'GET',
            url: "https://restcountries-v1.p.mashape.com/all",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
   app.use(BASE_API_PATH_TAXES_STATS + "/integrationCountries", function(req, res) {
        req.pipe(request(mashapeCountries)).pipe(res);
         console.log(mashapeCountries);
    }); 
    
    //integracion Mashape MusiXMatch
    
    var mashapeMusix = {
            method: 'GET',
            url: "https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/artist.get?artist_id=1039",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
    app.use(BASE_API_PATH_TAXES_STATS + "/integrationMusix", function(req, res) {
        req.pipe(request(mashapeMusix)).pipe(res);
         console.log(mashapeMusix);
    });
    //integracion Mashape Robohash Image Generator
    var mashapeRobo = {
            method: 'GET',
            url: "https://robohash.p.mashape.com/index.php",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
    app.use(BASE_API_PATH_TAXES_STATS + "/integrationRobo", function(req, res) {
        req.pipe(request(mashapeRobo)).pipe(res);
         console.log(mashapeRobo);
    });
    
    //integracion Mashape Bookmarks
    
    var mashapeBook = {
            method: 'GET',
            url: "https://bettingodds-bettingoddsapi-v1.p.mashape.com/bookmakers",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
    app.use(BASE_API_PATH_TAXES_STATS + "/integrationBook", function(req, res) {
        req.pipe(request(mashapeBook)).pipe(res);
         console.log(mashapeBook);
    });
    
    //integracion Mashape Messages
    var mashapeMess = {
            method: 'GET',
            url: "https://quotes.p.mashape.com/",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
    app.use(BASE_API_PATH_TAXES_STATS + "/integrationMessages", function(req, res) {
        req.pipe(request(mashapeMess)).pipe(res);
         console.log(mashapeMess);
    });
    
    //Integracion Mashape Random Insults
    
    var mashapeInsults = {
            method: 'GET',
            url: "https://community-dweetio.p.mashape.com/dweet/for/test",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
    app.use(BASE_API_PATH_TAXES_STATS + "/integrationInsults", function(req, res) {
        req.pipe(request(mashapeInsults)).pipe(res);
         console.log(mashapeInsults);
    });
    
   //Integracion Mashape Random Famous Quotes
   
   var mashapeFamous = {
            method: 'GET',
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
            app.use(BASE_API_PATH_TAXES_STATS + "/integrationFamous", function(req, res) {
        req.pipe(request(mashapeFamous)).pipe(res);
         console.log(mashapeFamous);
    });
   //Integracion Mashape HackerNews
   
   var mashapeHack = {
            method: 'GET',
            url: "https://community-hacker-news-v1.p.mashape.com/updates.json?print=pretty",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
  app.use(BASE_API_PATH_TAXES_STATS + "/integrationHack", function(req, res) {
        req.pipe(request(mashapeHack)).pipe(res);
         console.log(mashapeHack);
    });
    //Integracion Mashape Weather
    
    var mashapeWeather = {
            method: 'GET',
            url: "https://simple-weather.p.mashape.com/weatherdata?lat=40.0000000.0&lng=-4.0000000",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
    app.use(BASE_API_PATH_TAXES_STATS + "/integrationWeather", function(req, res) {
        req.pipe(request(mashapeWeather)).pipe(res);
         console.log(mashapeWeather);
    });
    //integracion Mashape Indian Stock
    
    //https://indianstockexchange.p.mashape.com/index.php?id=1
    
    var mashapeIndian = {
            method: 'GET',
            url: "https://indianstockexchange.p.mashape.com/index.php?id=1",
            headers: {
                "X-Mashape-Key": "ydbYFXozzWmshYW0ogiIH3b0RTd5p1zHerUjsnRnQ52luyL5Js", 
                "Accept": "application/json"
            }};
    
    app.use(BASE_API_PATH_TAXES_STATS + "/integrationIndian", function(req, res) {
        req.pipe(request(mashapeIndian)).pipe(res);
         console.log(mashapeIndian);
    });
/*****************************ENLACE-POSTMAN****************************/


app.get(BASE_API_PATH_TAXES_STATS + "/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/392119/taxes-stats/RVu1HWcs");
});
/*******************************BUSCADOR*******************************/
 var buscador = function(base, aux_set, param_from, param_to, param_country, param_year, param_region, param_income, param_countrycode) {

        console.log("Búsqueda con parametros: from = " + param_from + " ,to = " + param_to + ", country = " + param_country + ", year = " + param_year + ", region = " + param_region, ", income_group = " + param_income, ", country_code = " + param_countrycode + ".");
        
        
        var f = parseInt(param_from);
        var t = parseInt(param_to);
       
        

        if (param_from != undefined || param_to != undefined || param_country != undefined || param_year != undefined) {

            for (var j = 0; j < base.length; j++) {
                var year = base[j].year;
              
              
                var country = base[j].country;

                // FROM + TO + COUNTRY
                if (param_from != undefined && param_to != undefined && param_country != undefined && param_year == undefined) {

                    if (f <= year && t >= year && param_country == country) {
                        aux_set.push(base[j]);
                    }

                    // FROM + COUNTRY
                }
                else if (param_from != undefined && param_to == undefined && param_country != undefined && param_year == undefined) {

                    if (f <= year && param_country == country) {
                        aux_set.push(base[j]);
                    }

                    // TO + COUNTRY
                }
                else if (param_from == undefined && param_to != undefined && param_country != undefined && param_year == undefined) {

                    if (t >= year && param_country == country) {
                        aux_set.push(base[j]);
                    }

                    //FROM + TO
                }
                else if (param_from != undefined && param_to != undefined && param_country == undefined && param_year == undefined) {

                    if (f <= year && t >= year) {
                        aux_set.push(base[j]);
                    }

                    // FROM
                }
                else if (param_from != undefined && param_to == undefined && param_country == undefined && param_year == undefined) {

                    if (f <= year) {
                        aux_set.push(base[j]);
                    }

                    // TO
                }
                else if (param_from == undefined && param_to != undefined && param_country == undefined && param_year == undefined) {

                    if (t >= year) {
                        aux_set.push(base[j]);
                    }
                    // COUNTRY + YEAR    
                }
                else if (param_from == undefined && param_to == undefined && param_country != undefined && param_year != undefined) {
                    if (param_country == country && param_year == base[j].year) {
                        aux_set.push(base[j]);
                    }

                    // COUNTRY  
                }
                else if (param_from == undefined && param_to == undefined && param_country != undefined && param_year == undefined) {

                    if (param_country == country) {
                        aux_set.push(base[j]);
                    }

                    // YEAR    
                }
                else if (param_from == undefined && param_to == undefined && param_country == undefined && param_year != undefined) {

                    if (param_year == base[j].year) {
                        aux_set.push(base[j]);
                    }
                }

            }

            if ((param_region != undefined || param_income != undefined || param_countrycode != undefined ) && aux_set.length > 0) {


                for (var j = 0; j < aux_set.length; j++) {
                    if (param_region != undefined && param_income== undefined && param_countrycode == undefined  && aux_set.length >= 0) {
                        if (aux_set[j].region != param_region) {
                            aux_set.splice(j, 1);
                        }
                    }
                    else if (param_region == undefined && param_income != undefined && param_countrycode == undefined  && aux_set.length >= 0) {
                        if (aux_set[j].incomegroup != param_income) {
                            aux_set.splice(j, 1);
                        }
                    }
                    else if (param_region == undefined && param_income == undefined && param_countrycode != undefined  && aux_set.length >= 0) {
                        if (aux_set[j].country_code != param_countrycode) {
                            aux_set.splice(j, 1);
                        }
                    }
                    
                }

            }

        }
        else if (param_region != undefined || param_income != undefined || param_countrycode != undefined ) {

            for (var i = 0; i < base.length; i++) {
                if (param_region != undefined && param_income == undefined && param_countrycode == undefined ) {
                    if (base[i].region == param_region) {
                        aux_set.push(base[i]);
                    }
                }
                else if (param_region == undefined && param_income != undefined && param_countrycode == undefined ) {
                    if (base[i].income_group == param_income) {
                        aux_set.push(base[i]);
                    }
                }
                else if (param_region == undefined && param_income == undefined && param_countrycode != undefined ) {
                    if (base[i].country_code == param_countrycode) {
                        aux_set.push(base[i]);
                    }
                }
                
            }
        }
        return aux_set;

    };
/*************************LOADINITIALDATA***************************/

// Inicializa DB

    app.get(BASE_API_PATH_TAXES_STATS + "/loadInitialData", (req, res) => {
    
    
    var countriesinitials = [{ "country" : "spain",
      "year": "2012",
      "region" : "europe",
      "income_group": "high",
      "country_code" : "esp",
        
    },
    {"country" : "germany",
      "year": "2013",
      "region" : "europe",
      "income_group": "high",
      "country_code" : "ale",
        
    },
    {"country" : "england",
      "year": "2014",
      "region" : "europe",
      "income_group": "high",
      "country_code" : "ing",
    },
    {"country" : "island",
      "year": "2015",
      "region" : "europe",
      "income_group": "high",
      "country_code" : "isl",
    },
    {"country" : "denmmark",
      "year": "2016",
      "region" : "europe",
      "income_group": "high",
      "country_code" : "denmmark",
    }
   
];
            db.insert(countriesinitials, function(err, newDoc) {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                else {
                    res.sendStatus(201);
                    console.log("INSERTED " + countriesinitials.length);
                }
            });
        
    });








/****************************************************GET*******************************************/
// GET a recurso base

    app.get(BASE_API_PATH_TAXES_STATS , (req, res) => {

        //if (!checkApiKey(req, res)) return;

        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.fromYear;
        var to = req.query.toYear;
        var country = req.query.country;
        var year = req.query.year;
        var region = req.query.region;
        var inc = req.query.inc;
        var coun = req.query.coun;
        

        var aux = [];
        var aux2 = [];


        if (limit || offset >= 0) {
            db.find({}).skip(offset).limit(limit).toArray(function(err, countries) {

                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (countries.length === 0) {
                        res.sendStatus(204);
                    }
                    else if (from || to || country || year || region || inc || coun ) {

                        aux = buscador(countries, aux, from, to, country, year, region, inc, coun);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404); // No content 
                        }
                    }
                    else {
                        res.send(countries);
                    }
                }
            });

        }
        else {

            db.find({}).toArray(function(err, countries) {
                if (err) {
                    console.error('ERROR from database');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (countries.length == 0) {
                        res.sendStatus(204);
                        return;
                    }
                    else if (from || to || country || year || region || inc || coun) {
                        aux = buscador(countries, aux, from, to, country, year, region, inc, coun);
                        if (aux.length > 0) {
                            if (country != undefined && year != undefined) {
                                res.send(aux[0]);
                            }
                            else {
                                res.send(aux);
                            }
                        }
                        else {
                            res.sendStatus(404); //No content //poner array vacio
                        }
                    }
                    else {
                        res.send(countries);
                    }
                }
            });
        }


    });
// GET a recurso concreto 1 parámetro
//console.log("A");
    app.get(BASE_API_PATH_TAXES_STATS + "/:parametro", (req, res) => {

        //if (!checkApiKey(req, res)) return;

        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.fromYear;
        var to = req.query.toYear;
        var country = req.query.parametro;
        var parametro = req.params.parametro;
        var year = req.query.year;
        var region = req.query.region;
        var inc = req.query.income;
        var coun= req.query.countrycode;
        

        var aux = [];
        var aux2 = [];

console.log("B");
        if (limit || offset >= 0) {
            db.find({ $or: [{ "country": parametro }, { "year": parametro }] }).skip(offset).limit(limit).toArray(function(err, countries) {
console.log("c");
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (countries.length === 0) {
                        res.sendStatus(404);
                    }
                    else if (from || to || year || region || inc || coun ) {

                        aux = buscador(countries, aux, from, to, country, year, region, inc, coun); 
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404); // No content 
                        }
                    }
                    else {
                        res.send(countries);
                    }
                }
            });

        }
        else {

            db.find({ $or: [{ "country": parametro }, { "year": parametro }] }).toArray(function(err, countries) {
console.log("D");
                if (err) {
                    console.error('ERROR from database');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (countries.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    else if (from || to || year || region || inc || coun) {
                        aux = buscador(countries, aux, from, to, country, year, region, inc, coun);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                        else {
                            res.sendStatus(404); //No content
                        }
                    }
                    else {
                        res.send(countries);
                    }
                }
            });
        }
console.log("E");      
    });
//console.log("F");
  // GET a recurso concreto 2 parámetros

    app.get(BASE_API_PATH_TAXES_STATS + "/:country/:year", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        var country = req.params.country;
        var year = req.params.year;
        db.find({ "country": country, "year": year }).toArray((err, countries) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (countries.length == 0) {
                res.sendStatus(404);
                return;
            }
            else {
                console.log(Date() + " - GET /taxes-stats " + country + "/" + year);
                res.send(countries[0]);
               
                
            }

        });
    });
 /************************************************DELETE********************************/
//DELETE A LISTA DE RECURSOS


app.delete(BASE_API_PATH_TAXES_STATS,(req, res) => {
       
        console.log(Date() + " - DELETE /taxes-stats");

        db.remove({},{ multi: true },(err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else {
                console.log("DELETED " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });
    

//DELETE a un recurso;
app.delete(BASE_API_PATH_TAXES_STATS + "/:country", (req, res) => {
        
        var country = req.params.country;
       
        console.log(Date() + " - DELETE /taxes-stats/" + country);

        db.remove({"country": country },{ multi: true},function(err, numRemoved) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0 ) {
                res.sendStatus(404);
                return;
            }
            else {
                console.log("DELETED " + numRemoved.result.n);
                res.sendStatus(200);
                
            }
        });
    });

//DELETE A DOS PARAMETROS


// DELETE a recurso concreto 2 parámetros

    app.delete(BASE_API_PATH_TAXES_STATS + "/:countries/:year", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        var country = req.params.country;
        var year = req.params.year;
        console.log(Date() + " - DELETE /taxes-stats/" + country + "/" + year);

        db.remove({ "country": country, "year": year }, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                res.sendStatus(404);
                return;
            }
            else {
                console.log("DELETED " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });
/*********************************************POST**********************************************/
//POST A RECURSO
  

    app.post(BASE_API_PATH_TAXES_STATS , (req, res) => {
        //if (!checkApiKey(req, res)) return;
        console.log(Date() + " - POST /countries");
        var tax = req.body;

        if (!tax.country || !tax.year || !tax.region || !tax.income_group || !tax.country_code) {
            res.sendStatus(400);
            return;
        }
        else {
            db.find({ "country": tax.country,"year": tax.year }).toArray((err,countries) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                else if (countries.length != 0) {
                    res.sendStatus(409);
                    return;
                }
                else {
                    db.insert(tax, function(err, newDoc) {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        else {
                            res.sendStatus(201);
                            console.log("INSERTED");
                        }

                    });
                }

            });
        }
    });
//POST A UN RECURSO 

//country

app.post(BASE_API_PATH_TAXES_STATS + "/:country",(req,res)=>{
   var country = req.params.country;
   console.log(Date() + "- POST /taxes-stats/"+country);
res.sendStatus(405);
});


//Country&year
app.post(BASE_API_PATH_TAXES_STATS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    console.log(Date() + " - POST /taxes-stats/" + country + "/" + year);
    res.sendStatus(405);
});

/****************************************PUT*****************************************************/
//PUT LISTA DE RECURSOS


app.put(BASE_API_PATH_TAXES_STATS,(req,res)=>{
    console.log(Date() + "- PUT /taxes-stats");
    res.sendStatus(405);
    
});
// PUT a recurso concreto 2 parámetros

    app.put(BASE_API_PATH_TAXES_STATS + "/:country/:year", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        var country = req.params.country;
        var year = req.params.year;
        var tax = req.body;
        console.log(Date() + " - PUT /taxes-stats/" + country + year);

        if (!tax.country || !tax.year || !tax.region || !tax.income_group || !tax.country_code || country != tax.country || year != tax.year) {
            res.sendStatus(400);
            return;
        }
        else {
            db.update({ "country": country, "year": year }, tax, (err, numUpdated) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;

                }
                else if (numUpdated.result.n == 0) {
                    res.sendStatus(404);
                    return;
                }
                else {
                    console.log("UPDATED " + numUpdated.result.n);
                    res.sendStatus(200);
                }
            });
        }
    });


};