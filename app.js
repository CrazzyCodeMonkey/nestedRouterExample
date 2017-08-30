var express = require("express");
var ide4 = require("./ide4");

var app = express();
var router = express.Router();



app.get("/",(req, res)=>{
	res.send("Welcome to RMS routing test");
});

app.use("/4", ide4);


app.listen(8000);