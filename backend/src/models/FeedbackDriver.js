const mongoose = require("mongoose");
const User = require("./User");
const Address = require("./Address")
const Schema = mongoose.Schema;

let FeedbackDriver = new Schema({
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
        ref: 'TripDriver'
    }, 
    rating: {
        type: Number
    }, 
    timeStamp: {
        type: Date
    }, 
}, {
    collection: "feedbackDriver"
});

module.exports = mongoose.model("FeedbackDriver", FeedbackDriver);