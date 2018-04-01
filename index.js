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
