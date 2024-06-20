const mongoose = require("mongoose");
const User = require("./User");
const Address = require("./Address")
const Schema = mongoose.Schema;

let TripPassenger = new Schema({
    startTime: {
        type: String
    }, 
    fromAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }, 
    destinationAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    vehicleType: {
        type: String, 
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    status: {
        type: String, 
        default: "Ativa"
    }, 
}, {
    collection: "tripPassenger"
});

module.exports = mongoose.model("TripPassenger", TripPassenger);