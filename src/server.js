const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const path = require("path");
const express = require("express");
const hbs = require("hbs")

const server = express();

// setting port to either Heroku's port or localhost:3000
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPaths = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
server.set("view engine", "hbs");
server.set("views", viewsPath);
hbs.registerPartials(partialPaths);

// setup static directory to serve
server.use(express.static(publicDirectoryPath));

server.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Arryan Malik"
    });
});

server.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Arryan Malik"
    });
});

server.get("/help", (req, res) => {
    res.render("help", {
        message: "Questions about this application? Please email me at arryan@umich.edu",
        title: "Help",
        name: "Arryan Malik"
    })
});

server.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide the address query"
        });
    }
    const {address} = req.query;
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) { return res.send({error}); }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { return res.send({error}); }
            res.send({
                address,
                location,
                forecast: forecastData
            });
        });
    });
});

server.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Arryan Malik",
        errorMsg: "Help article not found"
    });
})

server.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Arryan Malik",
        errorMsg: "Page not found."
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});