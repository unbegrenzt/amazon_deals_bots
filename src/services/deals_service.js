const dealsData = require('../models/deals_data_model');
const moment = require('moment-timezone');
const axios = require("axios").default;

let dealsService = {};

const firesDealsModel = async function () {
    await dealsData.updateLogDeals({
        date_extraccion: moment().tz("Europe/Madrid").format("dddd, MMMM Do YYYY, h:mm:ss a"),
        operation_detail: 'extracción del día'
    });
}

const firesExtractorModel = async function () {
    const options = {
        method: 'GET',
        url: 'https://rapidapi.p.rapidapi.com/offers',
        params: {min_number: '5', country: 'ES', max_number: '100'},
        headers: {
            'x-rapidapi-host': 'amazon-products1.p.rapidapi.com',
            'x-rapidapi-key': '2ec68e9e51msh47af030231c6569p171f3ejsnd61581aef8e9'
        }
    };

    const response = await axios.request(options);

    let fetchedData = JSON.parse(response.data);

    console.log('respuesta de la extracción' + response.data);
    console.info('ofertas extraidas: ' + fetchedData.offers.length);

    await dealsData.removeNotSended();

    for (const dealData of fetchedData.offers) {
        try {
            await dealsData.insertNewUser({
                title: dealData.title,
                image: dealData.images[0],
                full_link: dealData.full_link,
                description: dealData.description,
                current_price: dealData.prices.current_price,
                previous_price: dealData.prices.previous_price,
                sended: false,
                lightning_deal: dealData.deal_info.lightning_deal,
                requested_perc: dealData.deal_info.requested_perc,
                timestamp_end: dealData.deal_info.timestamp_end,
                coupon_code: dealData.coupon.coupon_code,
                coupon_discount: dealData.coupon.coupon_discount,
                asin: dealData.asin
            });
            console.log('Oferta insertada con asin: ' + dealData.asin);
        } catch (error) {
            console.error(
                `se intento guardar la oferta con asin: ${dealData.asin}
            \rmensaje de error: ${error.message}`
            );
        }
    }
    await firesDealsModel();
}

dealsService.firesExtractor = firesExtractorModel;

module.exports = dealsService;