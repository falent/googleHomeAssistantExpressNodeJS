/* eslint-disable require-jsdoc,no-unused-vars,max-len,no-multiple-empty-lines,no-multiple-empty-lines,no-trailing-spaces */
const request = require('request');

function getRate(base) {
    // Setting URL and headers for request
    let options = {
        url: 'https://api.exchangeratesapi.io/latest?base=' + base,

        headers: {
            'User-Agent': 'request',
        },
        json: true,
    };
    // Return new promise
    return new Promise(function (resolve, reject) {
        // Do async job
        request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
}


module.exports = {

    'getChangeRateIntent': (conv, parameter) => {
        let currencyBase = (parameter['currencyBase']);
        let currencyTarget = (parameter['currencyTarget']);
        let amount = (parameter['amount']);
        console.log(currencyBase);
        console.log(currencyTarget);
        console.log(amount);

        return getRate(currencyBase).then(function (result) {
            console.log(result);
            let rate = result['rates'][currencyTarget];
            console.log(rate);

            let myValue = amount * rate;

            conv.ask('You will get ' + myValue + ' ' + currencyTarget);

        }, function (err) {
            console.log(err);
        });
    },

};
