var express = require("express");
var bodyParser = require("body-parser");
const https = require("https");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){

  const query =req.body.cityname;
  const apikey = "04968537ead589cec9bc7bafcc0806c5";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ apikey +"&q="+ query +"&units="+unit;
  https.get(url,function(response){
    console.log(response);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].weatherDescription
      const icon =weatherData.weather[0].icon
      const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The weather is currently "+weatherDescription+"<p>")
      res.write("<h1>The temperature in "+query+" is: "+temp+"</h1>");
      res.write("<img src="+ imageURL+">");
      res.send();
      console.log(temp);

    });
  });
});


app.listen(3000,function(req,res){
  console.log("Server Online !");
});
