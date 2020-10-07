const dbConnection = require('../db/DatabaseConnection');

let dealsData = {};

const SaveDealQuery = async function (
    {
        title,
        image,
        full_link,
        description,
        current_price,
        previous_price,
        sended,
        lightning_deal,
        requested_perc,
        timestamp_end,
        coupon_code,
        coupon_discount,
        asin
    } = {}) {
    const queryText = 'INSERT INTO deals_of_the_day\n' +
        '(title, image, full_link, description, current_price, previous_price, sended, lightning_deal, ' +
        'requested_perc, timestamp_end, coupon_code, coupon_discount, asin)\n' +
        'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning asin';
    await dbConnection.query({
        query: queryText,
        parameters: [
            title,
            image,
            full_link,
            description,
            current_price,
            previous_price,
            sended,
            lightning_deal,
            requested_perc,
            timestamp_end,
            coupon_code,
            coupon_discount,
            asin
        ]
    });
}

dealsData.getDealsForSend = async function () {
    const queryText = 'select * from deals_of_the_day where sended = false';
    return await dbConnection.query({
        query: queryText
    });
}


dealsData.updateLogDeals = async function (
    {
        date_extraccion,
        operation_detail
    } = {}) {
    const queryText = 'INSERT INTO public.deals_log\n' +
        '(date_extraccion, operation_detail)\n' +
        'VALUES($1, $2)';
    await dbConnection.query({
        query: queryText,
        parameters: [
            date_extraccion,
            operation_detail
        ]
    });
}

dealsData.removeNotSended = async function () {
    const queryText = 'delete from deals_of_the_day where sended = false';
    return await dbConnection.query({
        query: queryText
    });
}

dealsData.insertNewUser = SaveDealQuery;

module.exports = dealsData;