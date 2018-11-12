'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { dialogflow,   Permission,
  Suggestions, } = require('actions-on-google');

const app = dialogflow();

const sayMyNameIntent = require('./intents/nameIntent');
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



app.intent('welcomeIntent', (conv) => {
  conv.ask(new Permission({
    context: 'Hi there, to get to know you better',
    permissions: 'NAME'
  }));
});




var port = process.env.PORT || 5000;
console.log("Everything works. Im listining on "+port+" port");
express().use(bodyParser.json(), app).listen(port);


