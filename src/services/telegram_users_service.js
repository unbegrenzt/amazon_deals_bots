const userData = require('./user_data_model');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const telegramService = {};

const keyboard = function (deal_link) {
    return Markup.inlineKeyboard([
        Markup.urlButton('Lo quiero! ❤', `${deal_link}`)
    ]);
}

const DealNotificationTemplate = async function (
    {
        bot,
        user_id,
        title = 'Oferta!',
        product_description,
        expensive_cost,
        cheapest_cost,
        deal_photo_url,
        deal_link
    } = {}) {
    try {
        await bot.telegram.sendMessage(
            user_id,
            '[​​​​​​​​​​​](' + deal_photo_url + ')' +
            title + '\n' +
            product_description + '\n' +
            'Antes: ' + expensive_cost + '€ 😕\n' +
            'Ahora: ' + cheapest_cost + '€ 🤩\n' +
            'Ahorras: 7,96 € (21%)',
            Extra.markup(keyboard(deal_link))
                .markdown(true)
        );
        console.info(
            'notificación enviada correctamente a usuario con id: ' + user_id
        );
    } catch (error) {
        console.error(
            `No se pudo enviar mensaje a usuario con id ${user_id}
            \rmensaje de error: ${error}`
        );
    }
}

telegramService.sendDealNotificationToUser = DealNotificationTemplate;

const SendBotDealNotification = async function (bot) {
    try {
        let usersList = await userData.getAllUsers();

        for (const userRow of usersList.result.rows) {
            await telegramService.sendDealNotificationToUser({
                bot,
                user_id: userRow.user_id,
                product_description: 'Oral-B iO Gentle Care Cabezales de recambio, tamaño de buzón, Pack de 4',
                expensive_cost: 37.95,
                cheapest_cost: 29.99,
                deal_photo_url: 'https://images-na.ssl-images-amazon.com/images/I/71UQlBvO4YL._AC_SL1500_.jpg',
                deal_link: 'https://amzn.to/32VxJ5g'
            });
        }
    } catch (error) {
        console.error(
            `Ocurrió un error al enviar notificaciones globales
            \rmensaje de error: ${error.message}`
        );
    }
}

const FirstStepsForNewUser = async function (ctx) {
    let newUserReceived = ctx.chat.id;

    try {
        await ctx.reply(
            `<b>Gracias por unirte!</b>`,
            {parse_mode: "HTML"}
        );

        await ctx.replyWithHTML(
            'Soy tu robot amigo, me encargo de enviarte ofertas de ' +
            'Amazon de forma periódica, tranquilo no envío ofertas de madrugada. ' +
            '¡Los robots también dormimos! 😉',
            {parse_mode: "Markdown"}
        );

        await userData.insertNewUser(newUserReceived);
        console.info('Nuevo usuario creado con id: ' + newUserReceived);

    } catch (error) {
        console.error(
            `se intento guardar el id: ${newUserReceived} 
            \rmensaje de error: ${error.message}`
        );
    }
}

telegramService.sendFirstMessage = FirstStepsForNewUser;
telegramService.notifyDealsToAllUsers = SendBotDealNotification;

module.exports = telegramService;