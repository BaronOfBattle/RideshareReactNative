const mongoose = require("mongoose");
const User = require("./User");
const Address = require("./Address")
const Schema = mongoose.Schema;

let UserTotalTrips = new Schema({
    availableSeats: {
        type: Number
    }, 
    startTime: {
        type: Date
    }, 
    totalRidesOffered: {
        type: Number
    }, 
    totalRidesTaken: {
        type: Number
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: "userTotalTrips"
});

module.exports = mongoose.model("UserTotalTrips", UserTotalTrips);