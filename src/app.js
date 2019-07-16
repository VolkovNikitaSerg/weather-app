const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Nikita Volkov"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Nikita Volkov",
        text: "I am a passionate web-developer from Krasnoyarsk, Russia"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        text: "This is some helpful text",
        name: "Nikita Volkov"
    });
});


app.get("/weather", (req, res) => {

    const address = req.query.address;

    if (!address) {
        return res.send({ error: "You must provide an address" });
    }
    geocode(address, (error, { lat, long, location } = {}) => {
        if (error)
            return res.send({ error });
        forecast(lat, long, (error, forecastData) => {
            if (error)
                return res.send({ error })
            return res.send({ forecast: forecastData, location, address });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Nikita Volkov",
        errorMessage: "Help article not found"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Nikita Volkov",
        errorMessage: "Page not found"
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000")
});