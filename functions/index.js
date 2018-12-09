'use strict';

const functions = require('firebase-functions');
const app = require('./app');

module.exports.myFirstAction = functions.https.onRequest(app);
