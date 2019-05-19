const request = require('request');



function round(x, n)  
{  
  var a = Math.pow(10, n);  
  return (Math.round(x * a) / a);  
}

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
    console.log(parameter);
    const currencyBase = (parameter['currencyBase']);
    const currencyTarget = (parameter['currencyTarget']);
    const amount = (parameter['amount']);
    console.log('CurrencyBase:' + currencyBase);
    console.log('CurrencyTarget:' + currencyTarget);
    console.log('Amount:' +amount);

    // Setting URL and headers for request
    const options = {
      url: 'https://api.exchangeratesapi.io/latest?base=' + currencyBase,
      json: true,
    };

    return getRate(options).then(function(result) {
      console.log(result);
      const rate = result['rates'][currencyTarget];
      console.log(rate);

      const myValue = round(amount * rate, 2);

      conv.ask(`You will get ${myValue} ${currencyTarget}. Do you like to change more, ${conv.data.username}?`);
    }, function(err) {
      console.log(err);
    });
  },




};
