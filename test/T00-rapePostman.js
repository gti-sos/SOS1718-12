var newman = require("newman");
var path = require("path");


describe('API back-end tests', function() {

	newman.run({
			collection: require(path.join(process.cwd(), "test","SOS1718-12-rape-stats.postman_collection.json")),
			reporters: "cli"

		},

		function(error) {
			if (error)
				throw (error);
			else
				console.log("Newman collection run complete");

		});

});
