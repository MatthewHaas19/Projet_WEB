var express = require('express')
var cors = require("cors")
const path = require('path');
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 8080

const bcrypt = require('bcrypt');
module.exports.bcrypt = bcrypt;

app.use(express.static(__dirname + '/dist/Projet'));
app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname+'/dist/Projet/index.html'));
})


app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({ extended: false})
)



var Users = require("./routes/Users")
var Services = require("./routes/Services")
var Orders = require("./routes/Orders")
var Workers = require("./routes/Workers")

app.use("/api", Users)
app.use("/api", Services)
app.use("/api", Orders)
app.use("/api", Workers)

app.listen(port,function() {
  console.log("Server is running on port " + port)
})
