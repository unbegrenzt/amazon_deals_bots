const userData = require('../db/user_data');

const telegramData = {};

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
            title + '\n' +
            product_description + '\n' +
            'Antes: ' + expensive_cost + '€ 😕\n' +
            'Ahora: ' + cheapest_cost + '€ 🤩'
        );
        await bot.telegram.sendPhoto(
            user_id,
            `${deal_photo_url}`,
            {caption: `${deal_link}`}
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

telegramData.sendDealNotificationToUser = DealNotificationTemplate;

const SendBotDealNotification = async function (bot) {
    try {
        let usersList = await userData.getAllUsers;

        for (const userRow of usersList.result.rows) {
            await telegramData.sendDealNotificationToUser({
                bot,
                user_id: userRow.user_id,
                product_description: 'Soporte de teléfono',
                expensive_cost: 9.99,
                cheapest_cost: 6.49,
                deal_photo_url: 'https://images-na.ssl-images-amazon.com/images/I/71TO4wnzOuL._AC_SL1500_.jpg',
                deal_link: 'https://www.amazon.com/AUKEY-Car-Phone-Mount-Compatible/dp/B07W4Z4SMZ/ref=gbps_img_m-9_475e_f8be27c3?smid=A3FUL9VM6W25X6&pf_rd_p=5d86def2-ec10-4364-9008-8fbccf30475e&pf_rd_s=merchandised-search-9&pf_rd_t=101&pf_rd_i=15529609011&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=47F5SHB41J5ZQA0RHDHH&th=1'
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

telegramData.sendFirstMessage = FirstStepsForNewUser;
telegramData.notifyDealsToAllUsers = SendBotDealNotification;

module.exports = telegramData;