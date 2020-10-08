const expressLoader = require('../loaders/express_loader');
const dealsService = require('../services/deals_service');
const userService = require('../services/users_service');

const expressService = {};

const loadEndpoints = function (
    {
        telegramBot
    }) {
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
            console.error('se intento guardar un log de extracción');
            console.error(`mensaje de error: ${error.message}`);
            response.send({success: false, message: "Something went wrong"});
        }
    });

    expressLoader.getApp.get('/notifyUsers', async function (
        request,
        response
    ) {
        try {
            await userService.firesDealsToAllUsers({
                botInstance: telegramBot
            });
            console.info('se terminó el proceso de notificación para el bot telegram');
            response.send({succes: true, message: ""});
        } catch (error) {
            console.error('Ocurrió un error al proceso de notificación para el bot telegram');
            console.error(`mensaje de error: ${error.message}`);
            response.send({success: false, message: "Something went wrong"});
        }
    });
}

const loadService = function (
    {
        botData
    } = {}) {
    expressLoader.initializeExpressApp();
    loadEndpoints({telegramBot: botData});
};

expressService.loadExpressService = loadService;

module.exports = expressService;