const expressService = require('./services/express_service');
require('dotenv').config();

console.info('Web lanzado!')
console.log('Entorno actual: ' + process.env.NODE_ENV);
expressService.loadExpressService();