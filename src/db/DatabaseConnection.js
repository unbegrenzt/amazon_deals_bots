const {Client} = require('pg');

const queryStatementFunction = async function getPromiseUsers(
    {
        query,
        parameters = null
    } = {}) {

    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
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