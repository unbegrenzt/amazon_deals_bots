const userData = require('../models/user_data_model');
const telegramService = require('../services/telegram_users_service');

let userService = {};

userService.firesDealsToAllUsers = async function (
    {
        botInstance
    } = {}) {
    console.log('Proceso programado iniciado!');
    const users = await userData.getAllUsers();
    console.log("all users: " + users.result.rows.length);

    await telegramService.notifyDealsToAllUsers(botInstance);
}

module.exports = userService;