const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

let Vehicle = new Schema({
    type: {
        type: String
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    plate: {
        type: String
    },
    color: {
        type: String
    },
    documentPictureAddress: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: "vehicle"
});

Vehicle.statics.findByUserId = function (userId) {
    return this.findOne({ userId: userId }).populate('userId');
};

const VehicleModel = mongoose.model("Vehicle", Vehicle);

module.exports = VehicleModel;