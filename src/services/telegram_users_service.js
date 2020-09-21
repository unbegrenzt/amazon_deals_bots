const dbConnection = require('../db/DatabaseConnection')

const telegramData = {};

telegramData.getAllUsers = dbConnection.query({
    query: `select user_id from telegram_users;`
});

const FirstStepsForNewUser = async function (ctx) {
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

    let newUserReceived = ctx.chat.id;
    const queryText = 'INSERT INTO telegram_users(user_id) VALUES($1) RETURNING user_id';
    await dbConnection.query({
        query: queryText,
        parameters: [newUserReceived]
    }).then((res) => console.log('result database: ' + res))
        .catch((error) => console.error(
            `se intento guardar el id: ${newUserReceived} 
            \rmensaje de error: ${error.message}`
        ));
}

telegramData.sendFirstMessage = FirstStepsForNewUser;

module.exports = telegramData;