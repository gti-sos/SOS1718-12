var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
var cors = require("cors");
var request= require("request");


app.use(cors());


app.get("/hello", (req, res) => {
    res.send("Hello World");
});


app.use("/", express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT);


/*********API MANUEL*********/

var rape = require("./public/rape-manager/v1/rape.js");
/***POSTMAN***/

app.get("/api/v1/rape-stats/docs",(req,res)=>{
   res.redirect("https://documenter.getpostman.com/view/360397/collection/RVu1GWFS");
});

app.get("/api/v1/hospital-stats/docs",(req,res)=>{
   res.redirect("https://documenter.getpostman.com/view/360401/f04/RVu1Hqij");
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

/***Delete****/

app.delete("/api/v1/secure/rape-stats",rapekey.deleteAll );
app.delete("/api/v1/secure/rape-stats/:name/:year",rapekey.deleteData);


/************** Rape stats Version 2****************/
var rape33 = require("./public/rape-manager/v2/rape.js");
var url2 = "/api/v2/rape-stats";


/*********CON MONGO*******/

/****Gets***/

app.get(url2 + "/loadInitialData", rape33.getInitialData);
app.get(url2, rape33.getAllData);
app.get(url2 + "/:name/:year", rape33.getSingleDataNameYear);
app.get(url2 + "/:name", rape33.getData);

/**Post**/

app.post(url2, rape33.postDataGroup);
app.post(url2 + "/:name", rape33.postDenied);
app.post(url2 + "/:name/:year", rape33.postDenied);

/***Put****/

app.put(url2, rape33.putDenied);
app.put(url2 + "/:name", rape33.putDenied);
app.put(url2 + "/:name/:year", rape33.putSingleData);

/***Delete**/

app.delete(url2, rape33.deleteAll);
app.delete(url2 + "/:name/:year", rape33.deleteData);


/*********CON MONGO Y APIKEY*******/

var rapekey22 = require("./public/rape-manager/v2/rapekey.js");
var url = "/api/v2/secure/rape-stats";

/****Gets***/

app.get(url + "/loadInitialData", rapekey22.getInitialData);
app.get(url, rapekey22.getAllData);
app.get(url + "/:name/:year", rapekey22.getSingleDataNameYear);
app.get(url + "/:name", rapekey22.getData);

/**Post**/

app.post(url, rapekey22.postDataGroup);
app.post(url + "/:name", rapekey22.postDenied);
app.post(url + " /:name/:year", rapekey22.postDenied);

/***Put****/

app.put(url, rapekey22.putDenied);
app.put(url + "/:name", rapekey22.putDenied);
app.put(url + "/:name/:year", rapekey22.putSingleData);

/***Delete**/

app.delete(url, rapekey22.deleteAll);
app.delete(url + "/:name/:year", rapekey22.deleteData);


/******PROXY Manuel*******/

var apiServerHostDivorce = "https://sos1718-08.herokuapp.com/api/v1/divorces-an";

app.use("/proxyDivorce", (req, res) =>{
    
    var url = apiServerHostDivorce + req.url ; 
    
    req.pipe(request(url)).pipe(res);
});




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

var v = "/api/v2/hospital-stats";
var variable = require("./public/hospital-manager/v2/hospital.js");

app.get(v + "/loadInitialData", variable.getInitialData);
app.get(v, variable.getCollection);
app.get(v + "/:country", variable.getRecurso);
app.get(v + "/:country/:year", variable.getRecursoConcreto);

app.post(v, variable.postCollection);
app.post(v + "/:country", variable.postRecurso);

app.put(v, variable.putCollection);
app.put(v + "/:country", variable.putRecurso);
app.put(v + "/:country/:year", variable.putRecursoConcreto);

app.delete(v,variable.deleteCollection);
app.delete(v+"/:country",variable.deleteRecurso);
app.delete(v+"/:country/:year",variable.deleteRecursoConcreto);

/*********API VERONICA MONGO*********/

var h1 = "/api/v1/secure/hospital-stats";
var hospital1 = require("./public/hospital-manager/v1/hospital-apikey.js");

app.get(h1 + "/loadInitialData", hospital1.getInitialData);
app.get(h1, hospital1.getCollection);
app.get(h1 + "/:country", hospital1.getRecurso);
app.get(h1 + "/:country/:year", hospital1.getRecurso);

app.post(h1, hospital1.postCollection);
app.post(h1 + "/:country", hospital1.postRecurso);

app.put(h1, hospital1.putCollection);
app.put(h1 + "/:country", hospital1.putRecurso);
app.put(h1 + "/:country/:year", hospital1.putRecursoConcreto);

app.delete(h1,hospital1.deleteCollection);
app.delete(h1+"/:country",hospital1.deleteRecurso);
app.delete(h1+"/:country/:year",hospital1.deleteRecursoConcreto);


/*********API JOSE*********/
//Url Base 
var BASE_API_PATH_TAXES_STATS = "/api/v1/taxes-stats";
//api importada
//Importamos nuestras APIs:
var taxesApi = require("./public/taxes-manager/v1/taxes-stats.js");
//MongoClient
var MongoClient = require("mongodb").MongoClient;
var mdbURL = "mongodb://dbtest:dbtest0@ds221339.mlab.com:21339/sos1718-jllopis-sandbox";

/*******************************LOAD*************************************/

var intialCountries = [{ "country" : "spain",
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
    }
];





/********************************MONGODB**********************************************/

MongoClient.connect(mdbURL,{native_parser:true},(err,mlabs)=>{
    console.log("G");
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
console.log("H");
});