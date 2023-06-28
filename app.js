const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=4ef6e8e310ee460ce89ffbaffbd38263";
  https.get(url, (responce) => {
    console.log(responce.statusCode);
    responce.on("data", function (data) {
      const whetherData = JSON.parse(data);

      const temp = whetherData.main.temp;
    });
  });
});
app.post("/", (req, res) => {
   
    let temp;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityname}&units=metric&appid=4ef6e8e310ee460ce89ffbaffbd38263`;
  https.get(url, (responce) => {
    console.log(responce.statusCode);
    responce.on("data", function (data) {
      const whetherData = JSON.parse(data);

        temp = whetherData.main.temp;
        var discription = whetherData.weather[0].description;
        let imgpath = `https://openweathermap.org/img/wn/${whetherData.weather[0].icon}@2x.png`;
        res.send(req.body.cityname+ " temprature "+temp+`<p> ${discription} </p><img src=${imgpath} alt="whether img"/>`);
    });
  });
 
    
})
app.listen(3000, () => {
  console.log("sevrer started");
});
