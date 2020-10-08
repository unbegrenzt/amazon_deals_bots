const userData = require('./user_data_model');
const dealsData = require('../models/deals_data_model');
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
        deal_photo_url,
        deal_link
    } = {}) {
    try {
        await bot.telegram.sendMessage(
            user_id,
            '[​​​​​​​​​​​](' + deal_photo_url + ')' +
            title + '\n' +
            product_description,
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

        let dealsList = await dealsData.getDealsForSend();
        let currentDeal = dealsList.result.rows[0];

        let productDescrip = '*' + currentDeal.title + '*\n\n' +
            'Antes: ' + currentDeal.previous_price + '€ 😕\n' +
            'Ahora: ' + currentDeal.current_price + '€ 🤩\n' +
            'Ahorras: ' +
            (parseFloat(currentDeal.previous_price) - parseFloat(currentDeal.current_price)).toFixed() +
            ' € (' +
            Math.trunc(
                (1 - parseFloat(currentDeal.current_price) / parseFloat(currentDeal.previous_price)) *
                100
            ) + '%)';

        for (const userRow of usersList.result.rows) {
            await telegramService.sendDealNotificationToUser({
                bot,
                user_id: userRow.user_id,
                product_description: productDescrip,
                deal_photo_url: currentDeal.image,
                deal_link: currentDeal.full_link + '?&tag=ofertasxhora8-21'
            });
        }

        await dealsData.updateSended({
            product_asin: currentDeal.asin
        });
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