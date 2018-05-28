exports.config = {
    
    seleniumAddress: 'http://localhost:8910',
    
    specs: ['T00-Backend.js','T01-loadData.js','T02-addTaxes.js'],
    
    capabilities: {
        'browserName' : 'phantom.js'
    }
    
};