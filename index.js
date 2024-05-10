import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import https, { get } from "https";

const app = express();
const port = 3000;

//const request = require('request-promise');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const GEO_URL = "http://api.openweathermap.org/geo/1.0/direct";
const API_URL = "https://api.openweathermap.org/data/3.0/onecall";
const OWM_URL =  "api.openweathermap.org";
// const yourToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI2MWQwMTU5Zi02YjhlLTQwNTQtODZhYy00OTJhZmE0YjhmMWMiLCJleHAiOjE3MDQ0ODc2MTEsImlhdCI6MTcwMzg4MjgxMSwiYXVkIjoiNjFkMDE1OWYtNmI4ZS00MDU0LTg2YWMtNDkyYWZhNGI4ZjFjIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjY1OGYzMDNiODFmYmM1MDAwY2JkNzA0NiJ9.BjwqY1qWNB0msXPfi4hfMVU1SBIky1prObKu3jTOAUk";
const myAPIKey = "4c2165a091cf56966b2d0788003fc3ae";     
//getting lat and lon from GEO Api

 app.get ("/", (req, res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
        res.status(500).send(" OOPS! :( " + error.message );
    }
});

app.post("/weather", async (req, res) =>  {
     try {
        const cityAndCountry = req.body.place;  
        function getGeolocation() {
                    return axios.get(GEO_URL, {
                        params: {
                            q: cityAndCountry,
                            //limit: 1,
                            appid: myAPIKey,
                        },
                    }) 
                };
                
                const acct = await (getGeolocation());
         
                const geolocationArray = acct.data;
                let latitude =  (geolocationArray[0].lat).toString();
                let longitude =  (geolocationArray[0].lon).toString();
                
                let ltd = latitude.slice(0, -3);
                let lng = longitude.slice(0, -3);
                
                function getWeather() {
                    return axios.get(API_URL, {
                        params: {
                            // lat: `${longitude}`,
                            // lon: `${latitude}`,
                            lat: ltd,
                            lon: lng,
                            units: 'metric',
                            appid: myAPIKey,
                        },
                    }) 
                }; 
                
            
            const perm = await (getWeather());

            const currentIconId = JSON.stringify(perm.data.current.weather[0].icon);
            let currentIconIdString = JSON.parse(currentIconId);
            const currentImageURL = "https://openweathermap.org/img/wn/" + currentIconIdString + "@2x.png";
            console.log(currentImageURL);

            const tomorrwsIconId = JSON.stringify(perm.data.daily[0].weather[0].icon,);
            const secondIconId = JSON.stringify(perm.data.daily[1].weather[0].icon,);
            const thirdIconId = JSON.stringify(perm.data.daily[2].weather[0].icon,);

            let tomorrowsIconIdString = JSON.parse(tomorrwsIconId);
            let secondIconIdString = JSON.parse(secondIconId);
            let thirdIconIdString = JSON.parse(thirdIconId);

            const tomorrowsImageURL = "https://openweathermap.org/img/wn/" + tomorrowsIconIdString + "@2x.png";
            const secondtImageURL = "https://openweathermap.org/img/wn/" + secondIconIdString + "@2x.png";
            const thirdImageURL = "https://openweathermap.org/img/wn/" + thirdIconIdString+ "@2x.png";

            console.log(JSON.stringify(perm.data.current.sunrise));
            let currentDes = JSON.stringify(perm.data.current.weather[0].description);
            let tomorrowsDes = JSON.stringify(perm.data.daily[0].weather[0].description);
            let secondDes = JSON.stringify(perm.data.daily[1].weather[0].description);
            let thirdDes = JSON.stringify(perm.data.daily[2].weather[0].description);

            let currentDt = new Date((perm.data.current.dt) * 1000);
            let currentHours = currentDt.getHours();
            let currentMinutes = currentDt.getMinutes();
            let currentTime = currentHours + ":" + currentMinutes;

            let currentSunrise = new Date((perm.data.current.sunrise) * 1000);
            let currentSunriseHour = currentSunrise.getHours();
            let currentSunriseMinutes = currentSunrise.getMinutes();
            let currentSunriseTime = currentSunriseHour + ":" + currentSunriseMinutes;

            let currentSunset = new Date((perm.data.current.sunset) * 1000);
            let currentSunsetHour = currentSunset.getHours();
            let currentSunsetMinutes = currentSunset.getMinutes();
            let currentSunsetTime = currentSunsetHour + ":" + currentSunsetMinutes;
            
            let today  = new Date();
            let tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            let secondDayAfter = new Date(today);
            secondDayAfter.setDate(today.getDate() + 2);
            let thirdDayAfter = new Date(today);
            thirdDayAfter.setDate(today.getDate() + 3);

            let options = { weekday: 'long', day: 'numeric', month: 'long' };
            let options2 ={ weekday: 'long' };
            
            let dayToday = today.toLocaleDateString("en-GB", options);

            let dayTomorrow = tomorrow.toLocaleDateString("en-GB", options2);
            let secondDay = secondDayAfter.toLocaleDateString("en-GB", options2);
            let thirdDay = thirdDayAfter.toLocaleDateString("en-GB", options2);
            
            console.log(dayTomorrow + " " + secondDay + " " + thirdDay);
            console.log(currentHours + ":" + currentMinutes);

                res.render( "weather.ejs", {
            
                    lon: lng,
                    lat: ltd,
                    
                    weatherData: JSON.stringify(perm.data),
                    tZone: JSON.stringify(perm.data.timezone),
                    cityName: cityAndCountry,
                    time: currentTime,
                    todayHour: currentHours,
                    sunrise: currentSunriseTime,
                    sunriseHour: currentSunriseHour,
                    sunset: currentSunsetTime,
                    sunsetHour: currentSunsetHour,
                    currentTemp: perm.data.current.temp,
                    humidity: JSON.stringify(perm.data.current.humidity),
                    wind: JSON.stringify(perm.data.current.wind_speed),
                    description: JSON.parse(currentDes),

                    currentIcon: currentImageURL,
                    tomorrowsIcon: tomorrowsImageURL,
                    secondIcon: secondtImageURL,
                    thirdIcon: thirdImageURL,

                    dateToday: dayToday,
                    oneDay: dayTomorrow,
                    twoDays: secondDay,
                    threeDays: thirdDay,

                    tempTomorrow: perm.data.daily[0].temp.day,
                    secondTemp: perm.data.daily[1].temp.day,
                    thirdTemp: perm.data.daily[2].temp.day,

                    tomorrowsDescription: JSON.parse(tomorrowsDes),
                    secondDescription: JSON.parse(secondDes),
                    thirdDescription: JSON.parse(thirdDes),
                });

        } catch (error) {
            console.error("Failed to parse response:", error.message);
            res.status(500).send("Failed to fetch activity. Please try again.");
        } 
            
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
                