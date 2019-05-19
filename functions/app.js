'use strict';


/*
Our code uses the Actions on Google Node.js client library
to respond to the HTTP requests
that the Assistant sends to your webhook
*/

const {dialogflow} = require('actions-on-google');

/*
The library allows you to create a DialogflowApp object,
which acts as a wrapper for the Dialogflow API.
*/
const app = dialogflow({debug: false});

const getExchangeRateIntent = require('./intents/getExchangeRateIntent');
const nameIntent = require('./intents/nameIntent');

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
    getExchangeRateIntent,
    nameIntent
);


app.intent('welcomeIntent', (conv) => {
  conv.ask(
      'Welcome to Exchange Rate App!!! ' +
        'What is your name, Christina?'
  );
});

module.exports = app;
