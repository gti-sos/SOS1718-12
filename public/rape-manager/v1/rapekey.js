// Aquí estarán todos los datos con apikey, limit y offset incluidos
var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://admin:gatete@ds125195.mlab.com:25195/rape1718";
var db = null;
var apikey = "sos1718-12";


/******CONECTAR CON LA BASE DE DATOS******/

mongoClient.connect(mongoURL, { native_parser: true }, (error, database) => {

    if (error) {
        console.log("No se puede usar la base de datos " + error);
        process.exit();
    }

    db = database.db("rape1718").collection("rape-stats");

    console.log("la base de datos ha sido conectada con éxito");

});


