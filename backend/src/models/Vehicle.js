const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

let Vehicle = new Schema({
    vehicleType: {
        type: String
    }, 
    model: {
        type: String
    }, 
    color: {
        type: String
    }, 
    documentPictureAddress: {
        type: String
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: "vehicle"
});

module.exports = mongoose.model("Vehicle", Vehicle);