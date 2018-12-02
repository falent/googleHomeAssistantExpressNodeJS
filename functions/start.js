/* eslint-disable indent,no-trailing-spaces */
'use strict';
const app = require('./app');

const express = require('express');
const bodyParser = require('body-parser');


const port = process.env.PORT || 5000;
console.log('Everything works. Im listining on ' + port + ' port');
express().use(bodyParser.json(), app).listen(port);

