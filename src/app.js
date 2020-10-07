const telegramBot = require('./loaders/bot_deals_telegram_loader');
const expressService = require('./services/express_service');
const cronJobService = require('./services/cron_job_service');
require('dotenv').config();

console.log('Entorno actual: ' + process.env.NODE_ENV);

telegramBot.initializeTelegramBot();
expressService.loadExpressService();
cronJobService.initializeCronJob(telegramBot.getBot);
