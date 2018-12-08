/* eslint-disable require-jsdoc,no-unused-vars,max-len,no-multiple-empty-lines,no-multiple-empty-lines,no-trailing-spaces */
const request = require('request');

function getRate(base) {
  // Setting URL and headers for request
  const options = {
    url: 'https://api.exchangeratesapi.io/latest?base=' + base,

    headers: {
      'User-Agent': 'request',
    },
    json: true,
  };
    // Return new promise
  return new Promise(function(resolve, reject) {
    // Do async job
    request.get(options, function(err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}


module.exports = {

  'getExchangeRateIntent': (conv, parameter) => {
    const currencyBase = (parameter['currencyBase']);
    const currencyTarget = (parameter['currencyTarget']);
    const amount = (parameter['amount']);
    console.log(currencyBase);
    console.log(currencyTarget);
    console.log(amount);

    return getRate(currencyBase).then(function(result) {
      console.log(result);
      const rate = result['rates'][currencyTarget];
      console.log(rate);

      const myValue = amount * rate;

      conv.ask('You will get ' + myValue + ' ' + currencyTarget + '. Do you like to change more?');
    }, function(err) {
      console.log(err);
    });
  },

};
