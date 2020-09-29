const expressLoader = require('../loaders/express_loader');

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
}

const loadService = function () {
    expressLoader.initializeExpressApp();
    loadEndpoints();
};

expressService.loadExpressService = loadService;

module.exports = expressService;