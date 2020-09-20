const {Pool} = require('pg');

const config = {
    host: 'dumbo.db.elephantsql.com',
    user: 'gihzvxow',
    password: 'rswFyoFV_dBKw0pGB_vpUfjioZKm1o_D',
    database: 'gihzvxow',
    port: 5432
};

const pool = new Pool(config);

const queryStatementFunction = async function getPromiseUsers(
    {
        query,
        parameters = null
    } = {}) {
    const client = await pool.connect();
    try {
        const start = Date.now()
        return await client.query(query, parameters).then((result) => {
            const duration = Date.now() - start;
            return {
                query,
                parameters,
                duration,
                result
            }
        });
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    query: queryStatementFunction,
};