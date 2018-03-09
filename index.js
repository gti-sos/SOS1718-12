var express = require("express");
var path = require("path");

var app = express();

app.get("/hello",(req,res)=>{
    res.send("Hello World");
});


app.use("/", express.static(path.join(__dirname,"public")));

app.listen(process.env.PORT);