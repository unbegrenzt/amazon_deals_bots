const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
require('dotenv').config();

const expressLoader = {};

const initializeExpress = function () {
    app.set('port', process.env.PORT);
    app.use(express.static('public'));

    if (process.env.NODE_ENV === 'development') {
        https.createServer({
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.cert')
        }, app)
            .listen(app.get('port'), function () {
                console.log('Node app is running at https://localhost:' + app.get('port'));
            });
    } else {
        app.listen(app.get('port'), function () {
            console.log("Node app is running at http://localhost:" + app.get('port'))
        });
    }
};

expressLoader.initializeExpressApp = initializeExpress;
expressLoader.getApp = app;

module.exports = expressLoader;

