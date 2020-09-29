const telegramBot = require('./loaders/bot_deals_telegram_loader');
const cronJobService = require('./services/cron_job_service');
require('dotenv').config();

console.info('Worker lanzado!')
console.log('Entorno actual: ' + process.env.NODE_ENV);

telegramBot.initializeTelegramBot();
cronJobService.initializeCronJob(telegramBot.getBot);