/* eslint-disable indent,no-trailing-spaces */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

/*
Our code uses the Actions on Google Node.js client library
to respond to the HTTP requests
that the Assistant sends to your webhook
*/

const {dialogflow} = require('actions-on-google');

/*
the library allows you to create a DialogflowApp object,
which acts as a wrapper for the Dialogflow API.
*/
const app = dialogflow({debug: false});

const getRateIntent = require('./intents/getChangeRateIntent');
/** Adds Intent-name & callback key value pairs to app */
function addIntents(...args) {
    for (let i = 0; i < args.length; i++) {
        for (const key in args[i]) {
            if (args[i].hasOwnProperty(key)) {
                app.intent(key, args[i][key]);
            }
        }
    }
}

addIntents(
    getRateIntent
);


app.intent('welcomeIntent', (conv) => {
	console.log("Hello");
    conv.ask(
        'Welcome to Change Rate! ' +
        'What do you like to change?'
    );
});


const port = process.env.PORT || 5000;
console.log('Everything works. Im listining on '+port+' port');
express().use(bodyParser.json(), app).listen(port);
