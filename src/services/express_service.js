const expressLoader = require('../loaders/express_loader');
const dealsService = require('../services/deals_service');

const expressService = {};

const loadEndpoints = function () {
    expressLoader.getApp.get('/', function (
        request,
        response
    ) {
        try {
            response.show('index.html');
        } catch (error) {
            console.error(error);
            response.send({success: false, message: "Something went wrong"});
        }
    });

    expressLoader.getApp.get('/fetchDataDeals', async function (
        request,
        response
    ) {
        try {
            console.info('Extracción ejecutada manualmente');
            await dealsService.firesExtractor();
            response.send({succes: true, message: ""});
        } catch (error) {
            console.error(
                `se intento guardar un log de extracción
            \rmensaje de error: ${error.message}`
            );
            response.send({success: false, message: "Something went wrong"});
        }
    });
}

const loadService = function () {
    expressLoader.initializeExpressApp();
    loadEndpoints();
};

expressService.loadExpressService = loadService;

module.exports = expressService;