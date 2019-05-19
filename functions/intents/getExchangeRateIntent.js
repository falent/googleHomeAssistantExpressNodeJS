const request = require('request');

/**
 * Get
 * @param {String} options for request call.
 * @return {Promise} with result of exchange currency API.
 */
function getRate(options) {
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

    // Setting URL and headers for request
    const options = {
      url: 'https://api.exchangeratesapi.io/latest?base=' + currencyBase,
      json: true,
    };

    return getRate(options).then(function(result) {
      console.log(result);
      const rate = result['rates'][currencyTarget];
      console.log(rate);

      const myValue = amount * rate;

      conv.ask(`You will get ${myValue} ${currencyTarget}. Do you like to change more, ${conv.data.username}?`);
    }, function(err) {
      console.log(err);
    });
  },

};
