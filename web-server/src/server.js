const path = require("path");
const express = require("express");
const hbs = require("hbs")

const server = express();

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
        name: "Arryan Malikk"
    });
});

server.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Arryan Malikk"
    });
});

server.get("/help", (req, res) => {
    res.render("help", {
        message: "This is a helpful message",
        title: "Help",
        name: "Arryan Malikk"
    })
});

server.get("/weather", (req, res) => {
    res.send({
        forecast: "It is snowing",
        location: "Philadelphia"
    });
});

server.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Arryan Malikk",
        errorMsg: "Help article not found"
    });
})

server.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Arryan Malikk",
        errorMsg: "Page not found."
    });
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
});