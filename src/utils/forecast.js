const request = require("request");

forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/a905fbd9bea89b60f0780923d4d489fa/${lat},${long}?units=si`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location!", undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain");
        }
    });
}


module.exports = forecast;