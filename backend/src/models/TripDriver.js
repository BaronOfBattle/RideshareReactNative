const mongoose = require("mongoose");
const User = require("./User");
const Address = require("./Address")
const Schema = mongoose.Schema;

let TripDriver = new Schema({
    availableSeats: {
        type: Number
    }, 
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
    price: {
        type: Number
    }, 
    oneWay: {
        type: Boolean
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: "tripDriver"
});

module.exports = mongoose.model("TripDriver", TripDriver);