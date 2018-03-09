var express = require("express");
var path = require("path");

var app = express();

app.get("/hello",(req,res)=>{
    res.send("Hello World");
});
app.listen(process.env.PORT);

app.use("/", express.static(path.join(__dirname,"public")));