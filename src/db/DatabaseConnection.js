const {Client} = require('pg');

const queryStatementFunction = async function getPromiseUsers(
    {
        query,
        parameters = null
    } = {}) {

    const client = new Client({
        user: 'gihzvxow',
        host: 'dumbo.db.elephantsql.com',
        database: 'gihzvxow',
        password: 'rswFyoFV_dBKw0pGB_vpUfjioZKm1o_D',
        port: 5432,
    });
    await client.connect();
    try {
        const start = Date.now();
        return await client.query(query, parameters).then((result) => {
            const duration = Date.now() - start;
            return {
                query,
                parameters,
                duration,
                result
            };
        });
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
}

module.exports = {
    query: queryStatementFunction,
};