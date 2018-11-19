'use strict';

const express = require('express');
const bodyParser = require('body-parser');

/*
Our code uses the Actions on Google Node.js client library
to respond todfd HTTP requests
that the Assistant sends to your webhook
*/

const {dialogflow} = require('actions-on-google');

/*
the library allows you to create a DialogflowApp object,
which acts as a wrapper for the Dialogflow API.
*/
const app = dialogflow({debug: true});

const getWeatherForcastIntent = require('./intents/getWeatherForcastIntent');
const nameIntent = require('./intents/nameIntent');

/** Adds Intent-name & callback key value pairs to app */
function addIntents(...args) {
    for (let i = 0; i < args.length; i++) {
        for (const key in args[i]) {
            if (args[i].hasOwnProperty(key)) app.intent(key, args[i][key]);
        }
    }
}

addIntents(
    getWeatherForcastIntent,
    nameIntent
);


app.intent('welcomeIntent', (conv) => {
    conv.ask(
        'Welcome to Bike weather forcast! ' +
        'For what city should I tell you a weather for the next hour?'
    );
});


let port = process.env.PORT || 5000;
console.log('Everything works. Im listining on '+port+' port');
express().use(bodyParser.json(), app).listen(port);
