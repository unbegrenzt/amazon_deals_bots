const dbConnection = require('../db/DatabaseConnection')

const telegramData = {};

telegramData.getAllUsers = dbConnection.query({
    query: `select now() as now`
});

module.exports = telegramData;