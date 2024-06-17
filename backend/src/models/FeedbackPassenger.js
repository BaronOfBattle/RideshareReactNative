const mongoose = require("mongoose");
const User = require("./User");
const Address = require("./Address")
const Schema = mongoose.Schema;

let FeedbackPassenger = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TripPassenger'
    }, 
    rating: {
        type: Number
    }, 
    timeStamp: {
        type: Date
    }, 
}, {
    collection: "feedbackPassenger"
});

module.exports = mongoose.model("FeedbackPassenger", FeedbackPassenger);