var newman = require('newman');
var path = require('path');

describe('API should work', function(){
    newman.run({
        collection: require(path.join(process.cwd(),"test","Sos1718-12-taxes.stats.postman_collection")),
        reporters: "cli"
    }, function(err){
        if(err)
            throw err;
        else
            console.log("Collection run complete!");
            
    });
});