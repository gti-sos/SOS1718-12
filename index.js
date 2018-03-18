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
<<<<<<< HEAD
/****Gets***/
app.get(h + "/:loadInitialData",hospital.getInitialData);
app.get(h,hospital.getCollection);
=======

app.get(h + "/loadInitialData", hospital.getInitialData);
app.get(h, hospital.getCollection);
>>>>>>> 828ef29e3702411ae32d3b9429f87eaafcc96322
app.get(h + "/:country", hospital.getRecurso);
app.get(h + "/:country/:year", hospital.getRecursoConcreto);

app.post(h, hospital.postCollection);
app.post(h + "/:country", hospital.postRecurso);

app.put(h, hospital.putCollection);
app.put(h + "/:country", hospital.putRecurso);
app.put(h + "/:country/:year", hospital.putRecursoConcreto);

<<<<<<< HEAD
app.delete(h,hospital.deleteCollection);
app.delete(h+"/:country",hospital.deleteRecurso);
app.delete(h+"/:country/:year",hospital.deleteRecursoConcreto);
/*********API JOSE*********/
var dir = "/api/v1/taxes-stats";
var tax = require("./public/taxes-manager/v1/taxes-stats.js");

app.get(dir);
app.get(dir,tax.getCollection);
app.get(dir);
app.get(dir + "/:country/:year", tax.getRecursoConcreto);

/**Post**/
app.post(dir);
app.post(dir +"/:country",tax.postRecurso);

/***Put****/
app.put(dir,tax.putCollection);
app.put(dir +"/:country",tax.putRecurso);
app.put(dir +"/:country/:year" ,tax.putRecursoConcreto);
/***Delete**/
app.delete(dir,tax.deleteCollection);
app.delete(dir+"/:country",tax.deleteRecurso);
app.delete(dir+"/:country/:year",tax.deleteRecursoConcreto);

=======
app.delete(h, hospital.deleteCollection);
app.delete(h + "/:country", hospital.deleteRecurso);
app.delete(h + "/:country/:year", hospital.deleteRecursoConcreto);
>>>>>>> 828ef29e3702411ae32d3b9429f87eaafcc96322
