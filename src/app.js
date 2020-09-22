const Telegraf = require('telegraf');
const telegramData = require('./services/telegram_users_service');
const CronJob = require('cron');

const bot = new Telegraf("1388221629:AAHmf8-1qKtidH8M11o7SDIpc4Fhgaec6sw");

bot.start((ctx) =>
    telegramData.sendFirstMessage(ctx)
);

let job = new CronJob.CronJob(
    '0/40 * * * * *',
    function () {
        telegramData.notifyDealsToAllUsers(bot).then(() =>
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

bot.launch().then(() =>
    console.info('bot de telegram lanzado!')
).catch((error) => {
    console.error(
        'ocurrió un error al ejecutar el bot de telegram!\n' +
        'mensaje de error: ' + error
    )
});