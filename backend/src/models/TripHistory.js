const mongoose = require("mongoose");
const User = require("./User");
const Address = require("./Address")
const Schema = mongoose.Schema;

let TripHistory = new Schema({
    type: {
        type: String
    }, 
    occupiedSeats: {
        type: Number
    }, 
    startTime: {
        type: Date, 
        default: Date.now()
    }, 
    endTime: {
        type: Date
    }, 
    fromAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }, 
    destinationAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    earnings: {
        type: Number
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: "tripHistory"
});

module.exports = mongoose.model("TripHistory", TripHistory);