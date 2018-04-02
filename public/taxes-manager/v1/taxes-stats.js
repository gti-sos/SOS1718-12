//Url Base 
var BASE_API_PATH_TAXES_STATS = "/api/v1/taxes-stats";

var taxesApi={};
module.exports = taxesApi;


taxesApi.register = function(app, db) {
console.log("Registering routes for taxes API...");


// Inicializa DB

    app.get(BASE_API_PATH_TAXES_STATS + "/loadInitialData", (req, res) => {
    
    
    var countriesinitials = [{ "country" : "spain",
      "year": "2016",
      "region" : "europe",
      "income_group": "high",
      "country_code" : "esp",
        
    },
    {"country" : "germany",
      "year": "2016",
      "region" : "europe",
      "income_group": "high",
      "country_code" : "ale",
        
    },
    {"country" : "england",
      "year": "2016",
      "region" : "europe",
      "income_group": "high",
      "country_code" : "ing",
    },
    {"country" : "island",
      "year": "2016",
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
//GET LISTA RECURSOS
app.get(BASE_API_PATH_TAXES_STATS, (req,res) => {
   if (!db) {
        console.log("BD is empty");
        res.sendStatus(404);
    }else{
        
    
    db.find({}).toArray((err, countries) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        } else{
            
            if (countries.length === 0) {
                    console.log("INFO: Sending stats");
                    res.sendStatus(404);
                }else{
                     res.send(countries.map((c)=>{
                     delete c._id;
                     return c;
            
                 }));
                }
         }
        
    });
    }
});

//GET A UN RECURSO (COUNTRY)

app.get(BASE_API_PATH_TAXES_STATS +"/:country",(req,res)=> {
    var country = req.params.country;
    console.log(Date() + "- GET /taxes-stats/"+country);
    db.find({"country" : country}).toArray((err,countries)=>{
        
        if(err){
            console.error("ERROR ACCESING DB!");
            res.sendStatus(500);
            return;
        } else {
            if(countries.length ===0){
                
                res.sendStatus(404);
            }else{
                res.send(countries.map((c)=>{
                     delete c._id;
                    return c;
              })[0]);
            }
        }
       
    });
    
});





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