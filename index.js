var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");


var app = express();
app.use(bodyParser.json());


app.get("/hello", (req, res) => {
    res.send("Hello World");
});


app.use("/", express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT);


/*********API MANUEL CON NEDB*********/

var rape = require("./public/rape-manager/v1/rape.js");

/****Gets***/
app.get("/api/v1/rape-stats/loadInitialData", rape.getInitialData);
app.get("/api/v1/rape-stats", rape.getAllData);
app.get("/api/v1/rape-stats/:name/:year", rape.getSingleDataNameYear);
app.get("/api/v1/rape-stats/:name", rape.getData);

/**Post**/
app.post("/api/v1/rape-stats", rape.postDataGroup);
app.post("/api/v1/rape-stats/:name", rape.postDenied);
app.post("/api/v1/rape-stats/:name/:year", rape.postDenied);

/***Put****/
app.put("/api/v1/rape-stats", rape.putDenied);
app.put("/api/v1/rape-stats/:name", rape.putDenied);
app.put("/api/v1/rape-stats/:name/:year", rape.putSingleData);

/***Delete**/
app.delete("/api/v1/rape-stats", rape.deleteAll);
//app.delete("/api/v1/rape-stats/:country" ,rape.deleteData);
app.delete("/api/v1/rape-stats/:name/:year", rape.deleteData);

/*********API VERONICA*********/

var h = "/api/v1/hospital-stats";
var hospital = require("./public/hospital-manager/v1/hospital.js");

app.get(h + "/loadInitialData", hospital.getInitialData);
app.get(h, hospital.getCollection);
app.get(h + "/:country", hospital.getRecurso);
app.get(h + "/:country/:year", hospital.getRecursoConcreto);

app.post(h, hospital.postCollection);
app.post(h + "/:country", hospital.postRecurso);

app.put(h, hospital.putCollection);
app.put(h + "/:country", hospital.putRecurso);
app.put(h + "/:country/:year", hospital.putRecursoConcreto);

app.delete(h,hospital.deleteCollection);
app.delete(h+"/:country",hospital.deleteRecurso);
app.delete(h+"/:country/:year",hospital.deleteRecursoConcreto);
/*********API JOSE*********/
var BASE_API_PATH_TAXES_STATS = "/api/v1/taxes-stats";

var countries = [country" : "spain",
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
    }];
/*******************************LoadInitialData***************************/

app.get(BASE_API_PATH_TAXES_STATS + "/loadInitialData", function (req, res){
     var inicializacion = [
    { "country" : "spain",
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
    }];
    
    countries=inicializacion;
        console.log("INFO: Initializing data.");
      res.sendStatus(201); //created!
       res.send(countries);
     console.log("INFO: Data initialized.");
                 
});  



/*******************GET***********************/

app.get(BASE_API_PATH_TAXES_STATS,(req,res)=>{
    /*
    dbcountries.find({},(err,countries)=>{
    if(err){
        console.error("error accesing db");
        res.sendStatus(500);
        return;
    }
    */
    res.send(countries);
});

//GET A UN RECURSO

//Country

app.get(BASE_API_PATH_TAXES_STATS+"/:country",(req,res)=>{
    
    var country = req.params.country;
    console.log(Date() + "- GET /taxes-stats/"+country);
    res.send(countries.filter((c)=>  {
    
    return(c.country == country);
    
    
    
})[0]);

});


//Year

app.get(BASE_API_PATH_TAXES_STATS + "/:year",(req,res)=>{
    
    var year = req.params.year;
    console.log(Date() + "- GET /taxes-stats/"+year);
    res.send(countries.filter((c)=>  {
    
    return(c.year == year);
    
    
    
})[0]);
});


app.get(BASE_API_PATH_TAXES_STATS + "/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    console.log(Date() + "- GET /taxes-stats/"+ country + "/" + year);
    res.send(countries.filter((c)=>  {
    
    res.send(countries.filter((c) => {
        return (c.country == country);
    }).filter((c) => {
        return (c.year == year);
     }));
    
    
    
}));
});

/*************************POST***********************/
app.post(BASE_API_PATH_TAXES_STATS,(req,res)=>{
    
    console.log(Date() + "- POST /taxes-stats");
    var country = req.body;
    countries.push(country);
    res.sendStatus(201);
    
});
//POST A UN RECURSO 

//country

app.post(BASE_API_PATH_TAXES_STATS + "/:country",(req,res)=>{
   var country = req.params.country;
   console.log(Date() + "- POST /taxes-stats/"+country);
res.sendStatus(405);
});

//year 
app.post(BASE_API_PATH_TAXES_STATS + "/:year", (req, res) => {
    var year = req.params.year;
    console.log(Date() + " - POST /taxes-stats/" + year);
    res.sendStatus(405);
});


//Country&year
app.post(BASE_API_PATH_TAXES_STATS + "/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = req.params.year;
    console.log(Date() + " - POST /taxes-stats/" + country + "/" + year);
    res.sendStatus(405);
});

/***************PUT****************/


app.put(BASE_API_PATH_TAXES_STATS,(req,res)=>{
    console.log(Date() + "- PUT /taxes-stats");
    res.sendStatus(405);
    
});
//PUT A UN RECURSO

//Country
app.put(BASE_API_PATH_TAXES_STATS + "/:country",(req,res)=>{
   
   var country = req.params.country;
   var name = req.body;
   
   console.log(Date() + "- PUT /taxes-stats/"+country);
   if(country!=name.country){
       res.sendStatus(409);
       console.warn(Date()+"Hacking attemp!");
       return;
       
   }
   countries=countries.map((c)=>{
       
       if(c.country==name.country)
       return name;
       else
       return c;
       
   });
   res.sendStatus(200);
    
});

//year 

app.put(BASE_API_PATH_TAXES_STATS + "/:year",(req,res)=>{
   
   var year = req.params.year;
   var name = req.body;
   
   console.log(Date() + "- PUT /taxes-stats/"+year);
   
   if(year!=name.year){
       res.sendStatus(409);
       console.warn(Date()+"Hacking attemp!");
       return;
       
   }
   countries=countries.map((c)=>{
       
       if(c.year==name.year)
       return name;
       else
       return c;
       
   });
    res.sendStatus(200);
});

//Country&year

app.put(BASE_API_PATH_TAXES_STATS + "/:country/:year",(req,res)=>{
   var country = req.params.country;
   var year = req.params.year;
   var name = req.body;
   
   console.log(Date() + "- PUT /taxes-stats/"+ country + "/" + year);
   
   if(country!=name.country && year!=name.year){
       res.sendStatus(409);
       console.warn(Date()+"Hacking attemp!");
       return;
       
   }
   countries=countries.map((c)=>{
       
       if(c.country==name.country && c.year==name.year)
       return name;
       else
       return c;
   });
    res.sendStatus(200);
});
/*************************DELETE************************/

app.delete(BASE_API_PATH_TAXES_STATS,(req,res)=>{
    
    //dbcountries.remove({});
    console.log(Date() + "- DELETE /taxes-stats");
    countries=[];
    res.sendStatus(200);
    
});

//DELETE A UN RECURSO

//Country 

app.delete(BASE_API_PATH_TAXES_STATS+"/:country",(req,res)=>{
   var country = req.params.country;
   console.log(Date() + "- DELETE /taxes-stats/"+country);
countries = countries.filter((c)=>{
    return(c.country != country);
    
    
});
res.sendStatus(200);
});

//year
app.delete(BASE_API_PATH_TAXES_STATS+"/:year",(req,res)=>{
   var year = req.params.year;
   console.log(Date() + "- DELETE /taxes-stats/"+year);
countries = countries.filter((c)=>{
    return(c.year != year);
    
    
});
res.sendStatus(200);
});

//Country & year

app.delete(BASE_API_PATH_TAXES_STATS+"/:country/:year",(req,res)=>{
   var country = req.params.country;
   var year = req.params.year;
   console.log(Date() + "- DELETE /taxes-stats/"+ country + "/" + year);
countries = countries.filter((c)=>{
    return(c.country != country && c.year != year);

    
});
res.sendStatus(200);
});





