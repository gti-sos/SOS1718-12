var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://dbtest:db1234@ds231549.mlab.com:31549/sos1718-vvp-sandbox";
var db = null;
var apikey = "hospital";

mongoClient.connect(mongoURL, { native_parser: true }, (error, dataa) => {

    if (error) {
        console.log("No se puede usar la a de datos " + error);
        process.exit();
    }

    db = dataa.db("sos1718-vvp-sandbox").collection("hospitals");

    console.log("la a de datos ha sido conectada con éxito");

});


/******AUXILIAR**********/
var buscador = function(stats, a, param_country, param_year, param_expense, param_bed, param_attack) {
    if (param_country || param_year || param_expense || param_bed || param_attack) {
        for (var j = 0; j < stats.length; j++) {
            var country = stats[j].country;
            var year = parseInt(stats[j].year);
            var expense = parseFloat(stats[j].expense);
            var bed = parseFloat(stats[j].bed);
            var attack = parseFloat(stats[j].attack);

            if (param_country) {

                if (param_country == country) {

                    a.push(stats[j]);
                }
            }
            else if (param_year) {

                if (param_year == year) {
                    a.push(stats[j]);
                }
            }
            else if (param_expense) {

                if (param_expense == expense) {
                    a.push(stats[j]);
                }
            }
            else if (param_bed) {

                if (param_bed == bed) {
                    a.push(stats[j]);
                }
            }
            else if (param_attack) {

                if (param_attack == attack) {
                    a.push(stats[j]);
                }

            }
        }

    }

    return a;
};

/*****API********/

//POST a un recurso concreto (no sigue con las buenas prácticas)
module.exports.postRecurso = (request, response) => {

    response.sendStatus(405);
    console.log("No se puede hacer un post a un recurso en concreto");

};

module.exports.getInitialData = (request, response) => {

    db.find({}).toArray(function(error, stats) {
        if (error) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        }
        else {
            if (stats.length === 0) {
                db.insert([{
                    "country": "belgium",
                    "year": 2013,
                    "expense": 6.9,
                    "bed": 7,
                    "attack": 7
                }, {
                    "country": "cyprus",
                    "year": 2013,
                    "expense": 7.3,
                    "bed": 3.4,
                    "attack": 2.2
                }, {
                    "country": "france",
                    "year": 2013,
                    "expense": 11.6,
                    "bed": 6.4,
                    "attack": 6.2
                }, {
                    "country": "greece",
                    "year": 2013,
                    "expense": 9.3,
                    "bed": 4.9,
                    "attack": 2.3
                }, {
                    "country": "spain",
                    "year": 2013,
                    "expense": 9.4,
                    "bed": 3.1,
                    "attack": 8.5
                }]);
                console.log("OK");
                response.sendStatus(201);

            }
            else {
                console.log("Aquí error si hago get a un recurso")
                response.sendStatus(409);
            }

        }
    });


};


/***GET***/
//GET a colección
module.exports.getCollection = (request, response) => {

    var limit = parseInt(request.query.limit);
    var offset = parseInt(request.query.offset);
    var country = request.query.country;
    var year = parseInt(request.query.year);
    var expense = parseFloat(request.query.expense);
    var bed = parseFloat(request.query.bed);
    var attack = parseFloat(request.query.attack);
    console.log(country);
    var a = [];
    var b = [];

    console.log("INFO: New resquest to /hospital-stats");
    if (!db) {
        console.log("BD is empty");
        response.sendStatus(404);
    }
    else if (limit > 0 || offset >= 0) {
        db.find({}).skip(offset).limit(limit).toArray(function(error, stats) {
            if (error) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                if (stats.length === 0) {
                    console.log("INFO: Sending stats");
                    response.send([]);
                }
                if (country || year || expense || bed || attack) {

                    a = buscador(stats, a, country, year, expense, bed, attack);
                    if (a.length > 0) {
                        b = a.slice(offset, offset + limit);
                        response.send(b);
                    }
                    else {

                        response.send([]);

                    }
                }
                else {
                    response.send(stats);

                }
            }
        });

    }
    else {

        db.find({}).toArray(function(error, stats) {
            if (error) {
                console.error('ERROR from dataa');
                response.sendStatus(500); // internal server error
            }
            else {
                console.log("entro?");
                if (stats.length === 0) {
                    console.log("Dentro del if");
                    response.send([]);

                }
                else if (country || year || expense || bed || attack) {
                    console.log("HE ENTRADO CON BUSQUEDA");
                    a = buscador(stats, a, country, year, expense, bed, attack);
                    if (a.length > 0) {
                        console.log("Hola lo hago 2");
                        response.send(a);

                    }
                    else {
                        response.send([]);

                    }
                }

                else {
                    response.send(stats);
                }
            }
        });
    }

};

//GET a un recurso
module.exports.getRecurso = (request, response) => {

    var country = request.params.country;
    var aux = [];
    var year = null;

    if (!country || country == null) {

        console.log("No has introducido correctamente los datos, get data error section 1");
        response.sendStatus(400);
    }
    else {

        if (checkdb(db) == false) {
            response.sendStatus(500);
            process.exit();
        }
        else {

            db.find({}).toArray(function(error, stats) {

                if (checkdb(stats) == false) {
                    response.sendStatus(500);
                }
                else {

                    filtrado(stats, aux, country, year);

                    if (aux.length == 0) {
                        console.log("no se ha encontrado ningún dato");
                        response.sendStatus(404);
                    }
                    else {
                        response.send(aux);

                    }

                }

            });

        }
    }

};
var filtrado = function(stats, aux, country, year) {

    if (year == null) {
        if (isNaN(country)) {
            stats.filter((x) => {
                return x.country == country;

            }).map((x) => {
                return aux.push(x);
            });
        }
        else {
            stats.filter((x) => {
                return x.year == parseInt(country);
            }).map((x) => {
                return aux.push(x);
            });
        }
    }
    else {
        stats.filter((x) => {
            return x.country == country && x.year == parseInt(year);
        }).map((x) => {
            return aux.push(x);
        });
    }
};

var checkdb = function(database) {

    if (!database || database == null || database.length === 0) {
        console.log("la base de datos está vacía, get all data, section 1");
        return false;
    }
    else {
        return true;
    }
};

//GET a un recurso en concreto
module.exports.getRecursoConcreto = (request, response) => {

    var country = request.params.country;
    var year = parseInt(request.params.year);
    var a = [];
    if (!country) {
        console.log("Bad Request");
        response.sendStatus(400);

    }
    else if (!db) {
        response.sendStatus(404);
    }
    else {
        db.find({}).toArray(function(error, stats) {
            if (stats.length === 0) {
                console.log("WARNING: Error getting data from DB");
                response.sendStatus(404);
            }
            else {
                if (country) {
                    for (var i = 0; i < stats.length; i++) {
                        if (stats[i].country === country) {
                            a.push(stats[i]);
                        }
                    }
                    var b = a.filter(f => f.year === year);
                    response.send(b);
                }
            }
        });
    }


};

/***POST***/
//POST a una coleccón
module.exports.postCollection = (request, response) => {
    var country = request.params.country;
    var newHospital = request.body;
    if (!newHospital) {
        console.log("WARMING: New POST without hospital");
        response.sendStatus(400); //bad request
    }
    else {
        console.log("INFO: New PORT with correct body");
        if (!newHospital.country || !newHospital.year || !newHospital.expense || !newHospital.bed || !newHospital.attack) {
            console.log("WARMING: New POST incorrect");
            console.log(newHospital);
            response.sendStatus(422); //incorrecto
        }
        else {
            db.find({}).toArray(function(error, stats) {
                if (error) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    var hospitalBeforeInsertion = stats.filter((i) => {
                        return (i.country.localeCompare(newHospital.country, "en", {
                            "sensitiviry": "a"
                        }) === 0);
                    });
                    if (hospitalBeforeInsertion.length > 0) {
                        console.log("WARMING: This data already exists");
                        response.sendStatus(409);
                    }
                    else {
                        console.log("INFO: adding Internetandphones");
                        db.insert(newHospital);
                        response.sendStatus(201);
                    }
                }
            });
        }
    }

};

/***PUT***/

//PUT a un recurso
module.exports.putRecurso = (request, response) => {
    var updateStat = request.body;
    if (!updateStat) {
        console.log("WARNING: New PUT");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New PUT");
        if (!updateStat.country || !updateStat.year || !updateStat.expense || !updateStat.bed || !updateStat.attack) {
            console.log("WARMING: New PUT incorrect");
            response.sendStatus(422); //incorrecto
        }
        else {
            db.update({
                country: updateStat.country
            }, {
                country: updateStat.country,
                year: updateStat.year,
                expense: updateStat.bed,
                bed: updateStat.usagephoneline,
                attack: updateStat.attack
            });
            response.sendStatus(200);

        }
    }

};

//PUT a un recurso en concreto
module.exports.putRecursoConcreto = (request, response) => {

    var updateStat = request.body;
    var countryPar = request.params.country;
    var yearPar = parseInt(request.params.year);
    if (!updateStat) {
        console.log("WARNING: New PUT");
        response.sendStatus(400); // bad request

    }
    else {
        console.log("INFO: New PUT request to stat" + countryPar + " and year " + yearPar + " with data " + JSON.stringify(updateStat, 2, null));
        if (!updateStat.country || !updateStat.year || !updateStat.expense || !updateStat.bed || !updateStat.attack) {
            console.log("WARNING: The stat " + JSON.stringify(updateStat, 2, null));
            response.sendStatus(422); // unprocessable entity ¿duda)400 o 422?
        }
        else {
            db.find({}, function(err, stats) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    console.log(stats);
                    if (countryPar === updateStat.country && yearPar === parseInt(updateStat.year)) {
                        db.update({
                            country: countryPar,
                            year: yearPar
                        }, updateStat);
                        console.log("INFO: Modifying data with country " + countryPar + " with data " + JSON.stringify(updateStat, 2, null));
                        response.send(updateStat); // return the updated contact
                    }
                    else {
                        console.log("WARNING: There are not any data with country " + countryPar);
                        response.sendStatus(400); // not found
                    }
                }
            });
        }
    }

};

//PUT a una colección
module.exports.putCollection = (request, response) => {

    response.sendStatus(405);

};

/***DELETE***/
//DELETE una colección
module.exports.deleteCollection = (request, response) => {

    console.log("INFO: New DELETE");
    db.remove({}, {
        multi: true
    }, function(error, stats) {
        if (error) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        }
        else {
            if (stats.length > 0) {
                console.log("INFO: The stats is removed");
                response.sendStatus(204); // no content
            }
            else {
                console.log("WARNING: There are no stats to delete");
                response.send([]); // not found
            }
        }
    });

};
//DELETE a un recurso
module.exports.deleteRecurso = (request, response) => {
    var country = request.params.country;
    if (!country) {
        console.log("WARNING: New DELETE");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New DELETE");
        db.remove({
            country: country
        }, {}, function(error, stats) {
            if (error) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                console.log("INFO: Stats remove");
                if (stats === 1) {
                    console.log("INFO: The stats is removed");
                    response.sendStatus(204); // no content
                }
                else {
                    console.log("WARNING: There are no stats to delete");
                    response.send([]); // not found
                }
            }
        });
    }



};

//DELETE a un recurso en concreto
module.exports.deleteRecursoConcreto = (request, response) => {
    var country = request.params.country;
    var year = parseInt(request.params.year);
    if (!country && !year) {
        console.log("WARNING: New DELETE request");
        response.sendStatus(400);
    }
    else {
        console.log("INFO: New DELETE" + country);
        db.remove({ country: country, year: year }, {}, function(error, stats) {
            var a = JSON.parse(stats);
            if (error) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            }
            else if (stats.length === 0) {
                console.log("Something is wrong");
                response.send([]);
            }
            else {
                console.log("INFO: The stat with country " + country + " has been succesfully deleted");
                response.sendStatus(204); // no content

            }
        });
    }


};
