const Telegraf = require('telegraf');
const telegramData = require('./services/telegram_users_service');

(async () => {
    let data = await telegramData.getAllUsers;
    console.log(data);
})().catch(error => console.error(error));

console.log('telegramData');
const bot = new Telegraf("1388221629:AAHmf8-1qKtidH8M11o7SDIpc4Fhgaec6sw");
bot.start((ctx) => {
    let newUserReceived = [];
    ctx.reply(`
            <b>Gracias por unirte!</b>
    `, {parse_mode: "HTML"})
        .then(resolve => console.log(resolve));
    ctx.replyWithHTML('Soy tu robot amigo, me encargo de enviarte ofertas de ' +
        'Amazon de forma periódica, tranquilo no envío ofertas de madrugada. ' +
        '¡Los robots también dormimos! 😉', {parse_mode: "Markdown"})
        .then(resolve => console.log(resolve));
});
bot.hears('hi', (ctx) => {
    let dealsPromises = [
        ctx.reply('https://amzn.to/3iQL70c'),
        ctx.replyWithPhoto(
            `https://m.media-amazon.com/images/I/41RC4H47VeL._AC_AC_SR500,500_.jpg`,
            {caption: `https://amzn.to/3iQL70c`}
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
})
bot.launch();