const Telegraf = require('telegraf');
const telegramData = require('./services/telegram_users_service');

(async () => {
    let data = await telegramData.getAllUsers;
    console.log(data);
})().catch(error => console.error(error));

const bot = new Telegraf("1388221629:AAHmf8-1qKtidH8M11o7SDIpc4Fhgaec6sw");

bot.start((ctx) =>
    telegramData.sendFirstMessage(ctx)
);

bot.telegram.sendMessage('1396527725', `Hello my dear user!`)
    .then(res => console.log(res));

bot.hears('hi', (ctx) => {
    let dealsPromises = [
        ctx.reply('OFERTA!\n' +
            'PEN DRIVE 128GB KINGSTON 3.0\n' +
            'Antes: 22,99€ 😕\n' +
            'AHORA: 14,39€ 🤩🤩🤩\n'),
        ctx.replyWithPhoto(
            `https://m.media-amazon.com/images/I/41RC4H47VeL._AC_AC_SR500,500_.jpg`,
            {caption: `https://amzn.to/3iRNUq6`}
        )
    ];
    Promise.all(dealsPromises)
        .then((resolve) => {
            console.info('Operación de envio de Deals Exitosa!');
            console.info(resolve);
        })
        .catch((rejected) => {
            console.error('Operación de envio de Deals Falló!');
            console.error(rejected)
        })
});

bot.launch();