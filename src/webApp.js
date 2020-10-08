const expressService = require('./services/express_service');
const telegramBot = require('./loaders/bot_deals_telegram_loader');
require('dotenv').config();

console.info('Web lanzado!')
console.log('Entorno actual: ' + process.env.NODE_ENV);
telegramBot.initializeTelegramBot();
expressService.loadExpressService({botData: telegramBot.getBot});