const express = require("express");
path = require("path");
bodyParser = require("body-parser");
cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/rideshare", { useNewUrlParser: true}).then(
    () => {console.log("Database is connected") }, 
    err => {console.log("Can not connect to the Database " + err)});
    
const app = express();
app.use(cors());
app.use(bodyParser.json());

const userRoute = require('./src/routes/userRoute');
const userController = require('./src/controllers/userController');
const companyRoute = require("./src/routes/companyRoute");
const vehicleRoute = require("./src/routes/vehicleRoute");
const addressRoute = require("./src/routes/addressRoute");

app.use('/user', userRoute);
app.use('/company', companyRoute);
app.use('/vehicle', vehicleRoute);
app.use('/address', addressRoute);
    
app.get("/", function(req, res) {
    res.send("<h1>Servidor rodando com ExpressJS</h1>");
});



app.listen(3000, function() {
    console.log("Listening on port 3000!");
});