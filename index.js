var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());


app.get("/hello", (req, res) => {
    res.send("Hello World");
});

<<<<<<< HEAD
//app.get();
=======
>>>>>>> 938fa8830b93221db112a63e74e306e34cb7c5dc

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT);


/*********API MANUEL*********/

var rape = require("./public/rape-manager/v1/rape.js");
/***POSTMAN***/

app.get("/api/v1/rape-stats/docs",(req,res)=>{
   res.redirect("https://documenter.getpostman.com/view/360397/collection/RVu1GWFS");
});
/*********CON MONGO*******/

/****Gets***/

app.get("/api/v1/rape-stats/loadInitialData",rape.getInitialData);
app.get("/api/v1/rape-stats",rape.getAllData);
app.get("/api/v1/rape-stats/:name/:year",rape.getSingleDataNameYear);
app.get("/api/v1/rape-stats/:name",rape.getData);

/**Post**/

app.post("/api/v1/rape-stats",rape.postDataGroup);
app.post("/api/v1/rape-stats/:name",rape.postDenied);
app.post("/api/v1/rape-stats/:name/:year",rape.postDenied);

/***Put****/

app.put("/api/v1/rape-stats",rape.putDenied);
app.put("/api/v1/rape-stats/:name",rape.putDenied);
app.put("/api/v1/rape-stats/:name/:year",rape.putSingleData);

/***Delete**/

app.delete("/api/v1/rape-stats",rape.deleteAll);
app.delete("/api/v1/rape-stats/:name/:year",rape.deleteData);


/*********CON MONGO Y APIKEY*******/

var rapekey = require("./public/rape-manager/v1/rapekey.js");

/****Gets***/

app.get("/api/v1/secure/rape-stats/loadInitialData",rapekey.getInitialData);
app.get("/api/v1/secure/rape-stats",rapekey.getAllData);
app.get("/api/v1/secure/rape-stats/:name/:year",rapekey.getSingleDataNameYear);
app.get("/api/v1/secure/rape-stats/:name",rapekey.getData);

/**Post**/

app.post("/api/v1/secure/rape-stats",rapekey.postDataGroup);
app.post("/api/v1/secure/rape-stats/:name",rapekey.postDenied);
app.post("/api/v1/secure/rape-stats/:name/:year",rapekey.postDenied);

/***Put****/

app.put("/api/v1/secure/rape-stats",rapekey.putDenied);
app.put("/api/v1/secure/rape-stats/:name",rapekey.putDenied);
app.put("/api/v1/secure/rape-stats/:name/:year",rapekey.putSingleData);

/***Delete**/

app.delete("/api/v1/secure/rape-stats",rapekey.deleteAll );
app.delete("/api/v1/secure/rape-stats/:name/:year",rapekey.deleteData);


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
//Url Base 
var BASE_API_PATH_TAXES_STATS = "/api/v1/taxes-stats";
//api importada
//Importamos nuestras APIs:
var taxesApi = require("./public/taxes-manager/v1/taxes-stats.js");
//MongoClient
var MongoClient = require("mongodb").MongoClient;
var mdbURL = "mongodb://dbtest:dbtest0@ds221339.mlab.com:21339/sos1718-jllopis-sandbox";

/*******************************LOAD**************************************/

var intialCountries = [{ "country" : "spain",
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
    }
];





/********************************MONGODB***********************************************/

MongoClient.connect(mdbURL,{native_parser:true},(err,mlabs)=>{
    
    if(err) {
        
        console.log("Error accesing DB :"+ err);
        process.exit(1);
    }
        console.log("Conectado");
        var database = mlabs.db("sos1718-jllopis-sandbox");
        var db = database.collection("taxes-stats");    
        db.find({}).toArray((err, countries) => {
             if (countries.length == 0) {
             console.log("Empty DB");
             db.insert(intialCountries);
    }
    else {
        console.log("DB has  " + countries.length + " countries");
    }

});
taxesApi.register(app,db);

});