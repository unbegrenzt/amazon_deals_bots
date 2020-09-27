const telegramService = require('./services/telegram_users_service');
const telegramBot = require('./loaders/bot_deals_telegram_loader')
const CronJob = require('cron');
const userData = require('./services/user_data_model');

telegramBot.initializeTelegramBot();

let job = new CronJob.CronJob(
    '*/30 * * * * *',
    function () {
        console.log('disparado!');
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

const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})