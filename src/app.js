const telegramService = require('./services/telegram_users_service');
const telegramBot = require('./loaders/bot_deals_telegram_loader')
const CronJob = require('cron');
const userData = require('./services/user_data_model');

console.info('Entorno de desarrollo actual:' + process.env.NODE_ENV)

telegramBot.initializeTelegramBot();

let job = new CronJob.CronJob(
    '*/30 * * * * *',
    function () {
        console.log('Proceso programado iniciado!');
        userData.getAllUsers().then((result) => {
            console.log("all users: " + result.result.rows.length)
        })
        telegramService.notifyDealsToAllUsers(telegramBot.getBot).then(() =>
            console.info(
                'se terminó el proceso de notificación para el bot telegram'
            )
        ).catch((error) => {
            console.error(
                'Ocurrió un error al proceso de notificación para el bot telegram\n' +
                'mensaje de error: ' + error.message
            )
        });
    },
    null,
    false,
    'Europe/Madrid'
);
job.start();