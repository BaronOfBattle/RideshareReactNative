const mongoose = require("mongoose")
const Schema = mongoose.Schema;

let ChatMessage = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId, 
        ref: "User"
    }, 
    tripDriverId: {
        type: mongoose.Schema.ObjectId, 
        ref: "TripDriver"
    }, 
    tripPassengerId: {
        type: mongoose.Schema.ObjectId, 
        ref: "TripPassenger"
    }, 
    messageText: {
        type: String
    }, 
    timeStamp: {
        type: Date
    }
}, {
    collection: "chatMessage"
});

module.exports = mongoose.model("ChatMessage", ChatMessage);