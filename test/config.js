exports.config = {
    
    seleniumAddress: 'http://localhost:8910',
    
    specs: ['T00-Backend.js','T01-loadData.js','T02-addTaxes.js'],
    
    capabilities: {
        'browserName' : 'phantom.js'
    },
 
    params: {
        host: 'https://sos1718-12.herokuapp.com/api/v2/rape-stats',
        port: '8080'
    }
   
};

exports.getAppUrl = function () {
    return "http://"+browser.params.host+":"+browser.params.port;
}

    
