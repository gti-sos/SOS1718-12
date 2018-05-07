/*global expect*/
/*global browser*/
/*global element*/
/*global by*/
var fs = require("fs");
var path = ("path");
describe('Data is load',function(){
    it('should show some taxes',function(){
        browser
        .get('https://sos2018jllopis-jllopis1.c9users.io')
        .then(function(){
            
           element
           .all(by.repeater('tax in taxesstats'))
           .then(function(taxes){
               /*
               browser
               .takeScreenshot()
               .then(function (png){
                  var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T01.png'));
                  stream.write(new Buffer(png,'base64'));
                  stream.end();
                  });
                  */
               expect(taxes.length).toBeGreaterThan(0);
           });
        });
        
        expect(1).toEqual(1);
    });
    
});