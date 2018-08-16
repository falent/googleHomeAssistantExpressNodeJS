var request = require("request");
var weather;
var yourApiKey = '';

function initialize(city) {
    // Setting URL and headers for request
    var options = {
        url: 'https://api.weatherbit.io/v2.0//forecast/hourly?city='+city+'n&key='+yourApiKey,

        headers: {
            'User-Agent': 'request'
        }
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
        })
    })

}


module.exports = {

  'getWeatherForcastIntent': (conv, parametr) => {

      var myCity = parametr["geo-city"];
      console.log(myCity)

      var initializePromise = initialize(myCity);
      return initializePromise.then(function(result) {
          weather = result;

          var rain = weather["data"][0]["precip"];
          var windSpeed = weather["data"][0]["wind_spd"]*18/5;
          var descriptionCode = parseInt(weather["data"][0]["weather"]["code"]);
          var description = weather["data"][0]["weather"]["description"];
          var advice = "";
          var temperature= weather["data"][0]["app_temp"];

          if (descriptionCode >= 200 && descriptionCode <= 623) {
              advice = "It can be unconvinient because of precipitation";
          }

          if (descriptionCode > 623) {
              advice = "It can convinient to go by bike";
          }

          var outputwind = "";

          if (windSpeed<30 && windSpeed>=20){
              outputwind+=" It is too windy!! My Wind recomendation don't go today by bike";
          } else if (windSpeed<20 && windSpeed>=10){
              outputwind+=" It is windy!! If you dont like to bicycle in wind recomendation please consider not going today by bike";
          } else if (windSpeed<10 && windSpeed>=5){
              outputwind+=" It is some wind!! My Wind recomendation you can go today by bike but it can be a bit difficult";
          } else if (windSpeed<5 && windSpeed>=0) {
              outputwind += " It is some wind!! My Wind recomendation you can go today by bike ";
          } else
              outputwind += " There is a tornado. Do you really want to go?"


        conv.ask("In the next hour in "+myCity+". The temperature is "+temperature+" celcius degree, Rain "+Number((rain).toFixed(1))+ " millimetre. Wind "+Number((windSpeed).toFixed(1))+" km/h "+outputwind+". "+description+" "+advice+" Do you want something more from me?");

      }, function(err) {
          console.log(err);
      })

  }

};



