const request = require("request");

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=aeaa8581678d748e99a2375400f62c3a&query=${lat},${long}&units=f`;

    request({url}, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather service!", undefined);
        } else if (JSON.parse(body).error){
            callback("Unable to find location.", undefined);
        } else{
            const dataJS = JSON.parse(body);
            const {temperature, feelslike, weather_descriptions, humidity} = dataJS.current;
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%.`)
        }
    })
}

module.exports = forecast;