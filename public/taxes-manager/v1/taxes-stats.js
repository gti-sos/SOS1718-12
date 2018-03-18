//Servidor Express
var express = require("express");

//Body Parser 
var bodyParser =require("body-parser");
//var dataStore = require("nedb");
//var port = (process.env.PORT || 1607);

var app = express();

//Url Base 
var BASE_API_PATH_TAXES_STATS = "/api/v1/taxes-stats";
//var dbtaxes= __dirname+"/taxes-stats.db";
app.use(bodyParser.json()); // cualquier objeto que vea en json lo convierte en Js y viceversa


app.use("/", express.static(__dirname+"public"));

app.listen(process.env.PORT);

/********************Arrays***************************/

var countries = [{ "country" : "spain",
      "year": "2016"
        
    },
    {"country" : "germany",
      "year": "2016"
        
    },
    {"country" : "england",
      "year": "2016"
    }];
    

/*
var dbcountries = new dataStore({
    
    filename: dbtaxes,
    autoload: true
    
});  
*/
/*
dbcountries.find({},(err,countries)=>{
    if(err){
        console.error("error accesing db");
        process.exit(1);
    }else{
        if(countries.length == 0){
            console.log("empty db");
            dbcountries.insert(datosIniciales);
        }else{
            console.log("db inicialized with" + countries.length +"countries");
        }
    }
    
});

*/

/*******************************LoadInitialData***************************/

app.get(BASE_API_PATH_TAXES_STATS + "/loadInitialData", function (req, res){
     var inicializacion = [
    { "country" : "spain",
      "year": "2016"
        
    },
    {"country" : "germany",
      "year": "2016"
        
    },
    {"country" : "england",
      "year": "2016"
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
app.get(BASE_API_PATH_TAXES_STATS + "/:country", (req, res) => {
   var country = req.params.country;
   /* dbcountries.find({country:country}, function(err, countries){
        if(err){
        console.error("error accesing db");
        res.sendStatus(500);
        return;
    }*/
        console.log(Date() + " - GET /taxes-stats/" + country);
        res.send(countries);
    });



//Country
app.get(BASE_API_PATH_TAXES_STATS+"/:country",(req,res)=>{
    
    var country = req.params.country;
    console.log(Date() + "- GET /taxes-stats/"+country);
    res.send(countries.filter((c)=>  {
    
    return(c.country == country);
    
    
    
}));

});

//Year
app.get(BASE_API_PATH_TAXES_STATS + "/:year",(req,res)=>{
    
    var year = req.params.year;
    console.log(Date() + "- GET /taxes-stats/"+year);
    res.send(countries.filter((c)=>  {
    
    return(c.year == year);
    
    
    
}));
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

