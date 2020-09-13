// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { default: fetch } = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

var path = require('path');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8000;

const server = app.listen(port, () => console.log(`running on localhost: ${port}`));

//Routes

//Get Data
app.get('/allInfo', (req, res) => {
    res.status(200).sendFile('dist/index.html');
});

const geoNamesUrl = 'http://api.geonames.org/searchJSON?q=',
    weatherbitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=',
    pixabayUrl = 'https://pixabay.com/api/?key=';

//Post Route
app.post('/addInfo', async(req, res) => {

    let temprature, weatherstatus, cityImage;

    let departdate = new Date(req.body.departDate);
    let nowDate = new Date();
    let remainingDays = Math.floor((departdate.getTime() - nowDate.getTime()) / (1000 * 3600 * 24)) + 1;

    await getGeoNamesData(geoNamesUrl, req.body.destination, process.env.geonamesUsername)
        .then((geonamesData) => {

            return getWeatherData(weatherbitUrl, process.env.weatherbitKey, geonamesData.geonames[0].lng, geonamesData.geonames[0].lat)
        }).then((weatherData) => {
            temprature = weatherData.data[0].temp;
            weatherstatus = weatherData.data[0].weather.description;
        });

    await getImage(pixabayUrl, process.env.pixabayKey, req.body.destination)
        .then((pixabayData) => {
            cityImage = pixabayData.hits[0].webformatURL;
        });

    console.log(temprature, weatherstatus);
    projectData = {
        destination: req.body.destination,
        country: req.body.country,
        temp: temprature,
        weatherStatus: weatherstatus,
        remainingDays: remainingDays,
        cityImage: cityImage,
        departDate: req.body.departDate
    }

    console.log(projectData);
    res.send(projectData);
});

//To Get longitude and latitude of a city from Geonames API
const getGeoNamesData = async(url, city, userName) => {

    const response = await fetch(url + city + '&maxRows=10&username=' + userName);

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

//To Get Weather Informatin for a Certain City By Using it's Longitude and Latitude From Wetherbit API 
const getWeatherData = async(url, key, longitude, latitude) => {

    const response = await fetch(url + latitude + '&lon=' + longitude + '&key=' + key);

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

//To Get a Certai City's Image From Pixabay API
const getImage = async(url, key, city) => {

    const response = await fetch(url + key + '&q=' + city + '&image_type=photo');

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}