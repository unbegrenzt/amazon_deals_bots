const telegramService = require('./services/telegram_users_service');
const telegramBot = require('./loaders/bot_deals_telegram_loader')
const CronJob = require('cron');
const userData = require('./services/user_data_model');

telegramBot.initializeTelegramBot();

let job = new CronJob.CronJob(
    '0 */90 9-17 * * *',
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

app.set('port', (process.env.PORT || 5000))
//app.use(express.static(__dirname + '/public'))
app.use(express.static('public'))

app.get('/', function(request, response) {
    try {
        response.sendFile('/index.html');
    } catch (error) {
        console.error(error);
        response.send({ success: false, message: "Something went wrong" });
    }
})

app.listen(app.get('port'), function() {
    console.log("Node app is running at http://localhost:" + app.get('port'))
})