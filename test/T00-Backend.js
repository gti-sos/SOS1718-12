var newman = require('newman');
var path = require('path');

describe('API should work', function(){
    newman.run({
        collection: require(path.join(process.cwd(),"test","prueba_backend_l14.postman_collection")),
        reporters: "cli"
    }, function(err){
        if(err)
            throw err;
        else
            console.log("Collection run complete!");
            
    });
});