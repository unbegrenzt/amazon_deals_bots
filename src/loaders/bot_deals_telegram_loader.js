const telegramData = require('../services/telegram_users_service');
const Telegraf = require('telegraf');

const bot = new Telegraf("1388221629:AAHmf8-1qKtidH8M11o7SDIpc4Fhgaec6sw");

const telegramBot = {};

const botInitializer = function (){
    bot.start((ctx) =>
        telegramData.sendFirstMessage(ctx)
    );

    bot.launch().then(() =>
        console.info('bot de telegram lanzado!')
    ).catch((error) => {
        console.error(
            'Ocurrió un error al ejecutar el bot de telegram!\n' +
            'mensaje de error: ' + error
        )
    });
}

telegramBot.getBot = bot;
telegramBot.initializeTelegramBot = botInitializer;

module.exports = telegramBot;