const request = require("request");
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJyeWFuIiwiYSI6ImNrcjI4bm40eDFqN20yd283ZnZuMDE3dXQifQ.nihC51SQ4Y6lQvJsl2eVzA&limit=1`;

    request({url}, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather service.", undefined);
        } else if (JSON.parse(body).features.length === 0){
            callback("Unable to find location. Please change search term.", undefined);
        } else{
            const dataJS = JSON.parse(body);
            const {place_name, center} = dataJS.features[0];
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            });
        }
    });
}

module.exports = geocode;