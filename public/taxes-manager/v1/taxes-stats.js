//Servidor Express
var express = require("express");

//Body Parser 
var bodyParser =require("body-parser");
var dataStore = require("nedb");
//var port = (process.env.PORT || 1607);

var app = express();

//Url Base 
var BASE_API_PATH_TAXES_STATS = "/api/v1/taxes-stats";
var dbtaxes= __dirname+"/taxes-stats.db";
app.use(bodyParser.json()); // cualquier objeto que vea en json lo convierte en Js y viceversa


app.use("/", express.static(__dirname+"public"));

app.listen(process.env.PORT);

//Arrays

var countries = [{ "country" : "spain",
      "year": "2016"
        
    },
    {"country" : "germany",
      "year": "2016"
        
    },
    {"country" : "england",
      "year": "2016"
    }];
    

var datosIniciales = [];

var dbcountries = new dataStore({
    
    filename: dbtaxes,
    autoload: true
    
});  
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

//Load

app.get(BASE_API_PATH_TAXES_STATS +"/loadInitialData", (req, res) => {

    console.log(Date() + " - GET /loadInitialData");

  if (dbcountries != null || dbcountries.length != 0) {
        //recorremos la base de datos
        dbcountries.find({}, function(error, countries) {
            if (error) {
                console.error(' Error from DB');
                res.sendStatus(500); //Internal server error 
            }
            else {


                /*Comprobamos que el conjunto no esté vacío*/
                if (datosIniciales.length !== 0) {

                    console.log("la base de datos ya está creada");
                    res.sendStatus(409); //Conflicto,la base de datos ya estaba inicializada

                }
                else {
                    dbcountries.insert([{ "country" : "spain",
                                              "year": "2016"
        
                                         },
                                          {"country" : "germany",
                                           "year": "2016"
        
                                         },
                                         {"country" : "england",
                                          "year": "2016"
                                          }]);

                    console.log("La base de datos se ha creado correctamente");
                    res.sendStatus(201);
                }
            }
        });
    }
    else {
        //TODO: Otro control más para manejar los erroes, section 2
        console.log("No se ha inicialiazado la base de datos correctamente, SECTION 2 ERROR");
        res.sendStatus(500);

    }
    
});


//raiz 

//GET LISTA DE RECURSOS
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


//POST LISTA DE RECURSOS
app.post(BASE_API_PATH_TAXES_STATS,(req,res)=>{
    
    console.log(Date() + "- POST /taxes-stats");
    var country = req.body;
    countries.push(country);
    res.sendStatus(201);
    
});


//PUT LISTA DE RECURSOS


app.put(BASE_API_PATH_TAXES_STATS,(req,res)=>{
    console.log(Date() + "- PUT /taxes-stats");
    res.sendStatus(405);
    
});

//DELETE LISTA DE RECURSOS

app.delete(BASE_API_PATH_TAXES_STATS,(req,res)=>{
    
    //dbcountries.remove({});
    console.log(Date() + "- DELETE /taxes-stats");
    countries=[];
    res.sendStatus(200);
    
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

/*
app.get(BASE_API_PATH_TAXES_STATS + "/loadInitialData", (req, res) => {

     console.log(Date() + "- GET /taxes-stats/loadInitialData");

    if (countries.length == 0) {
        countries.push(countries1);
    }
    res.sendStatus(200);
});
*/