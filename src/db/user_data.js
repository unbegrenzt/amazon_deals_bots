const dbConnection = require('../db/DatabaseConnection');

let userData = {};

const SaveUserQuery = async function (newUserReceived) {
    const queryText = 'INSERT INTO telegram_users(user_id) VALUES($1) RETURNING user_id';
    await dbConnection.query({
        query: queryText,
        parameters: [newUserReceived]
    });
}

userData.getAllUsers = dbConnection.query({
    query: `select user_id from telegram_users;`
});

userData.insertNewUser = SaveUserQuery;

module.exports = userData;

