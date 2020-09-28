const express = require('express');
const app = express();

const expressLoader = {};

const initializeExpress = function (){
    app.set('port', process.env.PORT);
    app.use(express.static('public'));

    app.listen(app.get('port'), function () {
        console.log("Node app is running at http://localhost:" + app.get('port'))
    });
};

expressLoader.initializeExpressApp =  initializeExpress;
expressLoader.getApp = app;

module.exports = expressLoader;

