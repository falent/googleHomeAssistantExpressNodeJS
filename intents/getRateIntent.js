/* eslint-disable require-jsdoc,no-unused-vars,max-len,no-multiple-empty-lines,no-multiple-empty-lines,no-trailing-spaces */
const request = require('request');
require('dotenv').config();




function getRate(date, base) {
    // Setting URL and headers for request
    let options = {
        url: 'https://api.exchangeratesapi.io/history?start_at=' + date + '&end_at=' + date + '&base=' + base,

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

    'getRateIntent': (conv, parametr) => {
        let date = (parametr['date']).split("T")[0];
        let currencyBase = (parametr['currencyBase']).toString();
        let currencyTarget = (parametr['currencyTarget'])
        let amount = (parametr['amount'])

        if (currencyBase && currencyTarget ) {
            console.log(currencyBase.toString());
            console.log(currencyTarget);
            console.log(amount);
            console.log(date);
        }



        return getRate(date, currencyBase).then(function (result) {


            let rate = result['rates'][date][currencyTarget];
            console.log(result['rates'][date][currencyTarget]);

            conv.data.currencyBase = currencyBase;

            let myValue = amount * rate;

            conv.ask('You will get ' + myValue + ' ' + currencyTarget);



        }, function (err) {
            console.log(err);
        });
    },

};


