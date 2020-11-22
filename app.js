const request = require('request')
const postman = require('postman-request')
const axios = require('axios')
const chalk = require('chalk')

const url1 = "http://api.weatherstack.com/current?access_key=febbfae6bb59b28bf03946045d0fb1bc&query=28.6361,77.3620&units=m"



// postman({url: url}, (response, error) => {
//     // const data = JSON.parse(response.body)
//     // console.log(data.current);
//     console.log(response);
// })

// ---------- Weather Info API Practice----------------------
request({url: url1, json: true}, (error, response) => {
    // const data = JSON.parse(response.body)
    // console.log(data.current);
    // console.log(response);
    // console.log(response.body.current);

    if(error){
        console.log(chalk.red('Unable to connect to the Weather Service! Try again after sometime.'));
    }
    else if(response.body.error){
        console.log(chalk.red('Unable to find location.'));
    }
    else {
        const currentData = response.body.current;
        console.log(chalk.black.bgWhite('Weather Summary:'));
        console.log('It is currently '+currentData.temperature+ ' degrees out. There is a '+ currentData.precip + '% chance of rain.');
        console.log('It is currently '+ currentData.temperature+ ' degrees out. It feels like '+ currentData.feelslike + ' degrees out.');
        console.log('Weather Forecast: ' + currentData.weather_descriptions[0]);    
    }
})

// Using json: true will directly retreive the data in JSON Parsed format and thus we dont have to manually parse the data fetched from API using JSON.parse()

// ============================================================================= // 


// axios.get(url).then((response) => {
//     console.log(response);
//     // const data = JSON.parse(response.body)
//     // console.log(data);
// })
// .catch((error) => {
//     console.log(error);
// })


// LOCATION - LOS ANGELES
// const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW1hbjExc3JpdmFzdGF2YSIsImEiOiJja2h0ZHNnY3IxMXgyMnFwYnA1cXA2Y29xIn0.QwjsU0KQQH1bNoom9y9srw&limit=1"

// LOCATION - DELHI
const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Delhi.json?access_token=pk.eyJ1IjoiYW1hbjExc3JpdmFzdGF2YSIsImEiOiJja2h0ZHNnY3IxMXgyMnFwYnA1cXA2Y29xIn0.QwjsU0KQQH1bNoom9y9srw&limit=1"

request({ url: geocodeURL, json: true }, (error, response) => {
    if(error){
        console.log(chalk.red('Unable to connect to the Location service! Please try again after sometime.'));
    }
    else if(response.body.features.length === 0){
        console.log(chalk.red('Invalid location parameter! Please the check the location you entered.'));
    }
    else{
        const latitude = response.body.features[0].center[1];
        const longitude = response.body.features[0].center[0];    
        console.log('Latitude: '+ latitude);
        console.log('Longitude: '+ longitude);    
    }
})


