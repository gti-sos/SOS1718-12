exports.config = {

    seleniumAddress: 'http://localhost:8910',

    specs: ['T00-rapePostman.js',/* 'T00-Backend.js',*/
        'T01-rapeLoadData.js', 'T02-rapeCreateData.js',
        'T01-loadData.js', 'T02-addTaxes.js'

    ], 

    capabilites: { //tipo de navegador que voy a usar
        'browserName': 'phantomjs'

    }
};
