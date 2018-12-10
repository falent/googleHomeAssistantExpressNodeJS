'use strict';
const app = require('./app');

const express = require('express');
const bodyParser = require('body-parser');


const port = process.env.PORT || 5000;

express().use(bodyParser.json(), app).listen(port, (err) => {
  if (!err) {
    console.log('Everything works. Im listining on ' + port + ' port');
  } else {
    console.log('error', err.message, err.stack);
  }
});
