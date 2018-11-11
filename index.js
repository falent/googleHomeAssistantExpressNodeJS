'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { dialogflow } = require('actions-on-google');

const app = dialogflow();

const sayMyNameIntent = require('./intents/sayMyName');
const getWeather = require('./intents/getWeather');


/** Adds Intent-name & callback key value pairs to app */
function addIntents(...args) {
    for (let i = 0; i < args.length; i++) {
        for (const key in args[i]) {
            if (args[i].hasOwnProperty(key)) app.intent(key, args[i][key]);
        }
    }
}

addIntents(
    getWeather,
    sayMyNameIntent
);
console.log("sdddd");
app.intent('welcomeIntent', (conv) => {
    conv.ask('Welcome to Bike weather forcast! For what city should I tell you a weather for the next hour?');
});




var port = process.env.PORT || 5000;
console.log("Everything works. Im listining on "+port+" port");
express().use(bodyParser.json(), app).listen(port);


