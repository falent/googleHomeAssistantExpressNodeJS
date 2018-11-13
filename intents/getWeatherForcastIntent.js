/* eslint-disable require-jsdoc,no-unused-vars,max-len,no-multiple-empty-lines,no-multiple-empty-lines,no-trailing-spaces */
let request = require('request');
require('dotenv').config();


function getWeather(city) {
    // Setting URL and headers for request
    let options = {
        url: 'https://api.weatherbit.io/v2.0//forecast/hourly?city='+city+'n&key='+process.env.WEATHER_API_KEY,

        headers: {
            'User-Agent': 'request',
        },
    };
    // Return new promise
    return new Promise(function(resolve, reject) {
        // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}


module.exports = {

    'getWeatherForcastIntent': (conv, parametr) => {
        let myCity = parametr['geo-city'];
        console.log(myCity);

        return getWeather(myCity).then(function(result) {
            let temperature= result['data'][0]['app_temp'];


            conv.ask('Temperatur in '+ myCity +' is '+ temperature +'temperature');
        }, function(err) {
            console.log(err);
        });
    },

};


