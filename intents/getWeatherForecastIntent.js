/* eslint-disable require-jsdoc,no-unused-vars,max-len,no-multiple-empty-lines,no-multiple-empty-lines,no-trailing-spaces */
const request = require('request');
require('dotenv').config();

/* Create a .env file in the root directory of your project.
Add environment-specific variables on new lines in the form of NAME=VALUE. For example:
WEATHER_API_KEY = jkhdsad33nhdsds
For a right weather api key please register https://www.weatherbit.io/account/create
*/


function getWeather(city) {
    // Setting URL and headers for request
    let options = {
        url: 'https://api.weatherbit.io/v2.0//forecast/hourly?city='+city+'n&key='+process.env.WEATHER_API_KEY,

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

    'getWeatherForecastIntent': (conv, parametr) => {
        let myCity = parametr['geo-city'];
        console.log(myCity);

        return getWeather(myCity).then(function(result) {
            let temperature= result['data'][0]['app_temp'];

            conv.ask('Temperature in '+ myCity +' is '+ temperature +' degree');
        }, function(err) {
            console.log(err);
        });
    },

};
