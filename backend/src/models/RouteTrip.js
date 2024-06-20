const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RouteTrip = new Schema({
    from: {
        type: String
    }, 
    destination: {
        type: String
    }, 
    tripDriver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tripDriver'
    }, 
    tripPassenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tripPassenger'
    }
}, {
    collection: "routeTrip"
});

module.exports = mongoose.model("RouteTrip", RouteTrip);