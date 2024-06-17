const mongoose = require("mongoose");
const User = require("./User");
const Address = require("./Address")
const Schema = mongoose.Schema;

let TripPassenger = new Schema({
    startTime: {
        type: Date
    }, 
    fromAddresId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }, 
    destinationAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    vehicleType: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Vehicle"
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: "tripPassenger"
});

module.exports = mongoose.model("TripPassenger", TripPassenger);