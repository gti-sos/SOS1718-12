var DataStore = require("nedb");
var exports = module.exports = {};
var dbFileName = __dirname + "/hospital-stats.db";

var db = new DataStore({
    filename: dbFileName,
    autoload: true
});

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
                    "hospital-expense": 6.9,
                    "hospital-bed": 7,
                    "heart-attack": 7
                }, {
                    "country": "cyprus",
                    "year": 2013,
                    "hospital-expense": 7.3,
                    "hospital-bed": 3.4,
                    "heart-attack": 2.2
                }, {
                    "country": "france",
                    "year": 2013,
                    "hospital-expense": 11.6,
                    "hospital-bed": 6.4,
                    "heart-attack": 6.2
                }, {
                    "country": "greece",
                    "year": 2013,
                    "hospital-expense": 9.3,
                    "hospital-bed": 4.9,
                    "heart-attack": 2.3
                }]);
                console.log("OK");
                response.sendStatus(201);

            }
            else {
                response.sendStatus(409);
            }

        }
    });
};

/***GET***/
//GET a colección
module.exports.getCollection = (request, response) => {
    if (!db) {
        console.log("BD is empty");
        response.sendStatus(404);
    }
    else {
        db.find({}).toArray(function(error, stats) {
            if (error) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                if (stats.length === 0) {
                    console.log("INFO: Sending stats");
                    response.sendStatus(404);
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
    var a = [];
    var res = [];
    if (!country) {
        console.log("BAD Request");
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
                        else if (stats[i].year === parseInt(country)) {
                            a.push(stats[i]);
                        }
                        else if (a.length === 0) {
                            response.sendStatus(404);
                        }
                        else {
                            response.send(a);
                        }
                    }
                }
            }
        });
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
        console.log("WARMING: New POST without Hospital");
        response.sendStatus(400); //bad request
    }
    else {
        console.log("INFO: New PORT with correct body");
        if (!newHospital.country || !newHospital.year || !newHospital.expense || !newHospital.bed || !newHospital.attack) {
            console.log("WARMING: New POST incorrect");
            console.log(newHospital);
            response.sendStatus(400); //incorrecto ¿Duda? Preguntar
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
                            "sensitiviry": "base"
                        }) === 0);
                    });
                    if (hospitalBeforeInsertion.length > 0) {
                        console.log("WARMING: This data already exists");
                        response.sendStatus(409);
                    }
                    else {
                        console.log("INFO: adding Hospital-stat");
                        db.insert(newHospital);
                        response.sendStatus(201);
                    }
                }
            });
        }
    }
};
//POST a un recurso concreto (no sigue con las buenas prácticas)
module.exports.postRecurso = (request, response) => {
    response.sendStatus(405);
    console.log("No se puede hacer un post a un recurso en concreto");
};
/***PUT***/
//PUT a una colección
module.exports.putCollection = (request, response) => {
    response.sendStatus(405);
};

//PUT a un recurso
module.exports.putRecurso = (request, response) => {
    var updateStat = request.body;
    if (!updateStat) {
        console.log("WARNING: New PUT");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New PUT");
        if (!updateStat.country || !updateStat.year || !updateStat.expense || !updateStat.bed || !updateStat.atack) {
            console.log("WARMING: New PUT incorrect");
            response.sendStatus(400); //incorrecto
        }
        else {
            db.update({
                country: updateStat.country
            }, {
                country: updateStat.country,
                year: updateStat.year,
                expense: updateStat.bed,
                bed: updateStat.usagephoneline,
                atack: updateStat.atack
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
        if (!updateStat.country || !updateStat.year || !updateStat.expense || !updateStat.bed || !updateStat.atack) {
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
                response.sendStatus(404); // not found
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
                    response.sendStatus(404); // not found
                }
            }
        });
    }
};
//DELETE a un recurso en concreto
module.exports.deleteRecursoConcreto = (request, response) => {
    var country = request.params.country;
    var year = parseInt(request.params.year);
    console.log("INFO: New DELETE" + country);
    db.remove({ country: country, year: year }, {}, function(error, stats) {
        var a = JSON.parse(stats);
        if (error) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        }
        else if (stats.length === 0) {
            console.log("Something is wrong");
            response.sendStatus(404);
        }
        else {
            console.log("INFO: The stat with country " + country + " has been succesfully deleted");
            response.sendStatus(204); // no content
        }
    });
};
