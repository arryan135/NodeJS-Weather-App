const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

geocode("Boston", (error, data) => {
    error && console.log("Error", error)
    data && console.log("Data", data);
});

forecast(75.7088, -44.1545, (error, data) => {
    error && console.log("Error", error);
    data && console.log("Data", data);
});