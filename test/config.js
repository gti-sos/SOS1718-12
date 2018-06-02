exports.config = { //exportar objeto de la configuracion del test

    seleniumAddress: 'http://localhost:8910', //url donde esta el navegador cargando

    specs: [ 'T00-rapePostman.js','T00-Backend.js',
        'T01-rapeLoadData.js', 'T02-rapeCreateData.js',
        'T01-loadData.js', 'T02-addTaxes.js'

    ], //test que vamos a cargar

    capabilites: { //tipo de navegador que voy a usar
        'browserName': 'phantomjs'

    }
};
