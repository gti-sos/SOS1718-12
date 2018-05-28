exports.config = { 
    
    seleniumAddress:'http://localhost:8910',
    
    specs:['T00-Backend.js','T01-loadData.js','T02-addTaxes.js'],
    
    capabilities: {
        'browserName':'phantomjs'
    },
    params: {
        host: 'sos1718-12.herokuapp.com',
        port: '80'
    }
    
    
};
exports.getTaxesUrl = function() {
    console.log("https://" + browser.params.host  + "/#!/api/v1/taxes-stats" );
    return "https://" + browser.params.host  + "/#!/taxes-stats";
};
