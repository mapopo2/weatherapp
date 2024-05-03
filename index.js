import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import https, { get } from "https";
//const https = require('node:https'); 
// const EventEmitter = require('node:events');
// import { EventEmitter } from "node:events";
// class MyEmitter extends EventEmitter {};
// const myEmitter = new MyEmitter ();

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


        //https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation
        //navigator.geolocation object - is where we call the getCurrentPosition function
        // navigator.geolocation.getCurrentPosition((position) => {
        //     doSomething(position.coords.latitude, position.coords.longitude);
        //   });
        // if ("geolocation" in navigator) {
        //     console.log("geolocation is available"); 
        //    } else {
        //      console.log("geolocation is NOT available"); 
        //    };

           //failed to parse response: navigator is not defined
        //const url = "https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=83cb94f6d7a3f24956b44995ea024c29";
        //url is smaller than the long url
        //https.get(GEO_URL, function(response){
        //console.log(response);    
        // what I want to do is pass data from the weather app
        // *can pass html through javascript
        //https.request() returns an instance of the http.ClientRequest class.
        // The ClientRequest instance is a writable stream. If one needs to upload
        // a file with a POST request, then write to the ClientRequest object.
        // const options = {
        //     hostname: OWM_URL,
        //     //hostname - api.openweathermap.org instead of http://
        //     path: "/geo/1.0/direct?q=" + city + "&appid=" + myAPIKey, 
        //     method: "GET",
        // };

        // // const options2 = {
        // //     hostname 
        // // }
        // //search for node.js - multiple requests
        // //console.log (options.response);
        
        // https.get(options, (response) => {
        // //https://nodejs.org/docs/latest/api/https.html#httpsrequestoptions-callback
        //     // const data = "";
        //     // const array = [];
        //     //https://stackoverflow.com/questions/19539391/how-to-get-data-out-of-a-node-js-http-get-request
        //    // https://stackoverflow.com/questions/59154019/https-request-in-a-node-express-route
        //     console.log("status code" + res.statusCode + " headers:", res.headers);

        //     response.on("data", function(data) {
        //     //    data += chunk;
        //     //     array.push(chunk);
        //     console.log(JSON.parse(data));
           
        //     //data is a JSON array 
        //     const geolocationArray = JSON.parse(data);
        //     let latitude = geolocationArray[0].lat;
        //     let longitude = geolocationArray[0].lon;
        //     //console.log(longitude + " " + latitude);
        //         //making a response comes back as a callback - data comes back in packets
        //         //need to group each chunk together and add each chunk to a data string
        //         //returns a JSON ARRAY not a JSON OBJECT - no need to make chun   

        //     res.render("weather.ejs", {
        //         lon: longitude,
        //         lat: latitude,
        //     //put res.render inside the get request to get latitude and longitude
        //     // this was the error when putting it outside 'Failed to parse response: longitude is not defined'
        //     });     
        //     //change https request from 'res' to 'response' and then kept res.render.
        //     //stackoverflow.com/questions/48980274/node-js-res-render-with-request-not-working
        //     //There are two separate res parameters and the inner one is hiding the outer one. 
        //     //And, then when you call res.render(), it will use the higher scoped one you want.
        //     //You probably also need to pass some data to res.render(filename, data) as the second 
        //     //argument so you can feed the results of the request() to your render operation.
        //    }); 
        // }); 
            
        // getGeolocation(sucess);
         //https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
        //  axios.all([
        //     axios.post(`/my-url`, {
        //       myVar: 'myValue'
        //     }), 
        //     axios.post(`/my-url2`, {
        //       myVar: 'myValue'
        //     })
        //   ])
        //   .then(axios.spread((data1, data2, data3) => {
        //     // output of req.
        //     console.log('data1', data1, 'data2', data2, 'data3', data3)
        //   })); 
        //   axios.all([
        //     axios.get(GEO_URL, {
        //         params: {
        //             q: cityAndCountry,
        //             //limit: 1,
        //             appid: myAPIKey,
        //         },
        //     }), 
        //     axios.get(API_URL, {
        //         params: {
        //             // lat: `${longitude}`,
        //             // lon: `${latitude}`,
        //             lat: ltd,
        //             lon: lng,
        //             units: 'metric',
        //             appid: myAPIKey,
        //         },
        //     }),
        //     axios.get(GEO_URL, {
        //         params: {
        //             q: cityAndCountry,
        //             //limit: 1,
        //             appid: myAPIKey,
        //         },
        //     }), 
        //   ])
        //   .then(axios.spread((data1, data2, data3) => {
        //     // output of req.
        //     console.log('data1', data1, 'data2', data2, 'data3', data3)
        //   }));
          //https://stackoverflow.com/questions/61385454/how-to-post-multiple-axios-requests-at-the-same-time

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

                // let latStr = latitude.toString();
                // let lonStr = longitude.toString();

                // let ltd = latStr.slice(0, -3);
                // let lng = lonStr.slice(0, -3);
                //https://stackoverflow.com/questions/31489413/remove-last-3-characters-of-string-or-number-in-javascript
                
                let ltd = latitude.slice(0, -3);
                let lng = longitude.slice(0, -3);
                
                
                // let latArray = JSON.parse(req.body.ltd);
                // let lonArray= JSON.parse(req.body.long);
                // let lati = latArray[0].lat;
                // let longi = lonArray[0].lon;
                //advice to insert lat and lon in ejs and select them, then pass them through

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
            //Failed to parse response: Promise resolver #<Promise> is not a function (const perm = await new Promise(getWeather());)
            // const [acct, perm] = await Promise.all([getGeolocation(), getWeather()]);
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    

            //**CURRENT ERROR MESSAGE: on page Failed to fetch activity. Please try again.
            //in console Failed to parse response: Request failed with status code 400  */
            //const result = JSON.stringify(perm.data);

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
            // const image = "<img src =" + imageURL + ">"; 
            // --------------------------OPEN WEATHER MAP ICONS! ------------------------
            // **NOW for IMAGES: Weather API asigns different ID codes and icon names to different types of weather - want to link an image to the ID, open weather map gives you the images. See https://openweathermap.org/weather-conditions 

            // const icon = weatherData.weather[0].icon;
            //         //make an image const - REMEMBER CONCATINATION!!
            // const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            //         //REMEBER HTML - PASSING IMAGES etc.
            // res.write("<img src =" + imageURL + ">");

            console.log(JSON.stringify(perm.data.current.sunrise));
            // let sunrise = result.current.sunrise;
            let currentDes = JSON.stringify(perm.data.current.weather[0].description);
            let tomorrowsDes = JSON.stringify(perm.data.daily[0].weather[0].description);
            let secondDes = JSON.stringify(perm.data.daily[1].weather[0].description);
            let thirdDes = JSON.stringify(perm.data.daily[2].weather[0].description);
            //let currentDt = perm.data.current.dt;
            let currentDt = new Date((perm.data.current.dt) * 1000);
            let currentHours = currentDt.getHours();
            let currentMinutes = currentDt.getMinutes();
            let currentTime = currentHours + ":" + currentMinutes;
            
            // let currentSunrise = perm.data.current.sunrise;
            let currentSunrise = new Date((perm.data.current.sunrise) * 1000);
            let currentSunriseHour = currentSunrise.getHours();
            let currentSunriseMinutes = currentSunrise.getMinutes();
            let currentSunriseTime = currentSunriseHour + ":" + currentSunriseMinutes;

            //let currentSunset = perm.data.current.sunrise;
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
            // let secondDayAfter = tomorrow.setDate(today.getDate() + 2);
            // let thirdDayAfter = tomorrow.setDate(today.getDate() + 3);
        

                // for (let i = 0; i < 10; i++) {
          
                //     date.setDate(date.getDate() + 1);
                //     console.log(date);
                // }
            let options = { weekday: 'long', day: 'numeric', month: 'long' };
            let options2 ={ weekday: 'long' };
            
            let dayToday = today.toLocaleDateString("en-GB", options);

            let dayTomorrow = tomorrow.toLocaleDateString("en-GB", options2);
            let secondDay = secondDayAfter.toLocaleDateString("en-GB", options2);
            let thirdDay = thirdDayAfter.toLocaleDateString("en-GB", options2);
            // let secondDay = secondDayAfter.toLocaleDateString("en-GB", options);
            // let thirdDay = thirdDayAfter.toLocaleDateString("en-GB", options);
            console.log(dayTomorrow + " " + secondDay + " " + thirdDay);
             // Weather API - Get todays date (already done) then ADD 1,2, 3 to get 3 days of weather 
            //data- then match the day (get day +1, match with options (day of the week) and print).
            // FINISH WEATHER SITE FOR THE LOVE OF GOD & everything good

            // let getTomorrowsDate = new Date((JSON.stringify(perm.data.daily)) * 1000);
            // let dayTomorrow = getTomorrowsDate.getDay();
            // console.log(dayTomorrow);

            // let options = { weekday: 'long', day: 'numeric' };
            // //this is a javascript object!!! 
            // let today  = new Date();
            // let year = today.getFullYear();
            // let tomorrow = new Date(today);
            // tomorrow.setDate(today.getDate() + 1); 
            // //https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
            // //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

            // let whatDayToday = today.toLocaleDateString("en-GB", options);
            // let whatDaytomorrow = tomorrow.toLocaleDateString("en-GB", options);
            console.log(currentHours + ":" + currentMinutes);

            // function celsiusToFahrenheit(celsius) {
            //     const fahrenheit = celsius * 9/5 + 32;
            //     return fahrenheit;
            // };

            // let temperatureC = req.body.celc;
            // let temperatureF = req.body.fahren; 
        
            // myEmitter.on("click", () => {
            //     let tempsF = req.body.tempsF;
            //     let tempsC = req.body.tempsC;
            //     tempsF.classList.remove("hidden");
            //     tempsC.classList.add("hidden");
        
            // });

                res.render( "weather.ejs", {
                    //sunUp: sunrise,
                    lon: lng,
                    lat: ltd,
                    weatherData: JSON.stringify(perm.data),
                    // tomorrowsTemp: JSON.stringify(perm.data.daily.temp.day),
                    // tomorrowsDay: dayTomorrow,
                    // thisYear: year, 
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

                    
                    // currentTempF: celsiusToFahrenheit(perm.data.current.temp),
                    // tempTomorrowF: celsiusToFahrenheit(perm.data.daily[0].temp.day),
                    // secondTempF:  celsiusToFahrenheit(perm.data.daily[1].temp.day),
                    // thridTempF:  celsiusToFahrenheit(perm.data.daily[2].temp.day),
                });

            //I had locals.lon in the ejs file - Failed to parse response: Request failed with status code 400 - 
            
             //req.on("end", () => {
            //example  const result =JSON.parse(data);
            // const geolocationResult = data;}); 
            //try {
            //  const weather = await axios.get(API_URL, {
            //                 params: {
            //                     lat: latitude,
            //                     lon: longitude,
            //                     units: 'metric',
            //                     appid: myAPIKey,
            //                 },
            //              }); 
            
            // let result = JSON.stringify(weather.data); 
            // console.log(result.timezone);
                        
            // res.render( {
            //     // weather: response.data,
            //     tZone: result.timezone,
            //     sunrise: result.current.sunrise,
            //     sunset: result.current.sunset,
            //     temp: result.current.temp,
            //     humidity: result.current.humidity,
            //     description: result.current.weather[0].description,
            // });


        } catch (error) {
            console.error("Failed to parse response:", error.message);
            res.status(500).send("Failed to fetch activity. Please try again.");
        } 
            
   
    // } catch (error) {
    //     res.status(500).send(" OOPS! :(" + error.message );
    // } 
});

// app.get("/weather", (req, res) => {
//     // const tempMes = req.body.tempMes;
//     // let temperatureC = req.body.celc;
//     // let temperatureF = req.body.fahren; 

//     // myEmitter.on("click", () => {
//     //     let tempsF = req.body.tempsF;
//     //     let tempsC = req.body.tempsC;
//     //     tempsF.classList.remove("hidden");
//     //     tempsC.classList.add("hidden");

//     // });

//      function changeMes(){
//         let tempsF = req.body.tempsF;
//         let tempsC = req.body.tempsC;
//         tempsF.classList.remove("hidden");
//         tempsC.classList.add("hidden");
    
//         };
    
//     // temperatureF.addEventListener("click", function(){
//     // let tempsF = req.body.tempsF;
//     // let tempsC = req.body.tempsC;
//     // tempsF.classList.remove("hidden");
//     // tempsC.classList.add("hidden");

//     // });

//     res.render("weather.ejs", {
//         cOrF: changeMes,
//     });

// });

// app.patch("/weather", (req,res) [


//     function celsiusToFahrenheit(celsius) {
//         const fahrenheit = celsius * 9/5 + 32;
//         return fahrenheit;
//     };

//     console.log(celsiusToFahrenheit(perm.data.current.temp)); 

//     //select buttons -





// ]);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
                
//------------api - params-----------
//alternative for search params - https://nodejs.org/api/url.html#the-whatwg-url-api
        //new URLSearchParams(string)
        // let params;

        // params = new URLSearchParams('user=abc&query=xyz');
        // console.log(params.get('user'));
        // // Prints 'abc'
        // console.log(params.toString());
        // // Prints 'user=abc&query=xyz'

        // params = new URLSearchParams('?user=abc&query=xyz');
        // console.log(params.toString());


        // Prints 'user=abc&query=xyz' 
        //https://nodejs.org/api/https.html#httpsrequesturl-options-callback 
        //set options - 'hostname' is base url, where api is hosted
        //- 'path 'is the endpoint (remember - using postman)
        //- method - how you want it to interact with api
            // } catch (error) {
            //     console.error("Failed to parse response:", error.message);
            //     res.status(500).send("Failed to fetch activity. Please try again.");
            // }

            // const requestToAPI = https.request(url, options, function (responsefromAPI) {
        //     console.log(responsefromAPI.statusCode);
        //     responsefromAPI.on("data", function (dataFromAPI) {
        //       console.log(JSON.parse(dataFromAPI.toString()));
        //     });
        //     responsefromAPI.on("end", function () {
        //       console.log("All data received from API");
        //     });
        //   });
         
        //   requestToAPI.on("error", function (error) {
        //     console.log(error);
        //   });
        
        //   requestToAPI.write(postData);
        //   requestToAPI.end();
        // });"


        //https://developer.mozilla.org/en-US/docs/Web/API/URL
        //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
        // https.get(GEO_URL, {
        //     //creating call back function
        //     //https://nodejs.org/api/https.html#httpsgeturl-options-callback
        //     params: {
        //         q: city,
        //         //limit: 1,
        //         appid: myAPIKey,
        //     },},
        // (res) => {
        //     console.log(res);
           // let geoLocationArray = geoResult.data;
            // let latitude = geoLocationArray[0].lat;
            // let longitude = geoLocationArray[0].lon;
        //the geolocation api for open weather map returns a JSON ARRAY not an object, expecting 
        // multiple objects, so I need to specify the ___  that I'm going into (see weather descripting)

//-----------------------------original code---------------------------------------------------
// const config = {
//     headers: { 
//         Authorization: `Bearer ${yourToken}` 
//       },
// }, req.body, config

//----------------notes - throw away lines--------------------------------------------------

// app.get("/weather", async (req,res) => {

//     try{
//     const city = req.body.city;  
//     const result = await axios.get(GEO_URL, {
//         params: {
//                 q: city,
//                 //limit: 1,
//                 appid: myAPIKey,
//             },},
//     )  

//     let geoLocationArray = result.data;

//     let latitude = geoLocationArray[0].lat;
//     let longitude = geoLocationArray[0].lon;
//     console.log(latitude + ", " + longitude );

//     res.render("weather.ejs", {lat: latitude, lon: longitude})

//     } catch(error) {

//         res.status(500).send(" OOPS! :(" + error.message );
//     }
// });
            // var lat = event.geoLocation.lat;

            //function getGeolocation() {return

            // let endpoints =  [
            //     GEO_URL + "q=" + city + "&appid=" + myAPIKey, 
            //      API_URL + "lat=" + "33.44" + "&lon=" + "-94.04" + "&units=" + 'metric' + "&appid=" + myAPIKey,       
            //      ] ;// params: {
                        //     q: city,
                        //     //limit: 1,
                        //     appid: myAPIKey,
                        // },},
               
                // , params: {
                //        lat: latitude,
                //        lon: longitude,
                //        units: 'metric',
                //        appid: myAPIKey,
                //    },}
            
            // GEO_URL, {
            //     params: {
            //         q: city,
            //         //limit: 1,
            //         appid: myAPIKey,
            //     },
            // })

            // axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
            //     (data) => 

            //     console.log(data),
            // );
             // const geoLocation = GEO_URL + "q=" + city + "&appid=" + myAPIKey;

            // function getGeolocation() {

            //         return axios.get(GEO_URL, {
            //             params: {
            //                 q: city,
            //                 //limit: 1,
            //                 appid: myAPIKey,
            //             },
            //         })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            //     } 

            //     function getWeather() {
            //         return axios.get(API_URL, {
            //             params: {
            //                 lat: longitude,
            //                 lon: latitude,
            //                 units: 'metric',
            //                 appid: myAPIKey,
            //             },
            //          }) 
            //         };

            // const [acct, perm] = await Promise.all([getGeolocation(), getWeather()]);

            // var geoArray = acct.data;
            // var latitude = geoArray[0].lat;
            // var longitude = geoArray[0].lan;

            // console.log(JSON.stringify(perm.data.current.sunrise));

            // const result = JSON.stringify(perm.data);
//https://axios-http.com/docs/post_example
// function getUserAccount() {
//     return axios.get('/user/12345');
//   }
  
//   function getUserPermissions() {
//     return axios.get('/user/12345/permissions');
//   }
  
//   const [acct, perm] = await Promise.all([getUserAccount(), getUserPermissions()]);
  
//   // OR
  
//   Promise.all([getUserAccount(), getUserPermissions()])
//     .then(function ([acct, perm]) {
//       // ...
//     });


// const result = await axios.get(API_URL, {

//     // console.log(JSON.stringify(result.data));
//     params: {
//         lat: latitude,
//         lon: longitude,
//         units: 'metric',
//         appid: myAPIKey,
//       },

//      });

//      const input = await axios.get(GEO_URL, {
//         // console.log(JSON.stringify(result.data));
//         params: {
//         q: city,
//         limit: 1,
//         // exlude: hourly,daily,
//         appid: myAPIKey,
//     },

//     }); 
//         const latitude = JSON.stringify(input.data.lat);
//         console.log(latitude);
//         const longitude = JSON.stringify(input.data.lon);


//     //  const weatherDescription = JSON.stringify(result.data.current.weather);
// app.get ("/", async (req,res) => {
//     try {
//         const result = await axios.get(API_URL, {

//         // console.log(JSON.stringify(result.data));
//         params: {
//             lat: 33.44,
//             lon: -94.04,
//             units: 'metric',
//             appid: myAPIKey,
//           },

//          });

//         //  const weatherDescription = JSON.stringify(result.data.current.weather);

//          console.log(JSON.stringify(result.data.current.sunrise));

//         res.render("index.ejs", {
//             // weather: JSON.stringify(result.data),
//             tZone: JSON.stringify(result.data.timezone),
//             sunrise: JSON.stringify(result.data.current.sunrise),
//             sunset: JSON.stringify(result.data.current.sunset),
//             temp: JSON.stringify(result.data.current.temp),
//             humidity: JSON.stringify(result.data.current.humidity),
//             description: JSON.stringify(result.data.current.weather[0].description),
//             //https://stackoverflow.com/questions/39069123/weather-api-and-json
//             //can't select descritpion, its inside weather array
//             //revise why I use this
//         });

//     } catch (error) {
//         res.status(500).send(" OOPS! :( " + error.message );
//     }
// })

// app.post("/", async (req,res) =>  {
//     try {
//         const city = req.body.city;
      
//         const result = await axios.post(GEO_URL, {

       
//         // console.log(JSON.stringify(result.data));
//         params: {
//             q: city,
//             limit: 1,
//             // exlude: hourly,daily,
//             appid: myAPIKey,
//           },

//          });
//         res.render("index.ejs", {weather: JSON.stringify(result.data)});
//     } catch (error) {
//         res.status(500).send(" OOPS! :(" + error.message );
//     } 
// });




