const mongoose = require("mongoose");
const User = require("./User");
const Address = require("./Address")
const Schema = mongoose.Schema;

let TripDriver = new Schema({
    availableSeats: {
        type: Number
    }, 
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
    price: {
        type: Number
    }, 
    oneWay: {
        type: Boolean
    }, 
    status: {
        type: String, 
        default: "Ativa"
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: "tripDriver"
});

TripDriver.statics.findByUserId = function (userId) {
    return this.find({ userId: userId, status: "Ativa" });
};

TripDriver.statics.findByFromAddressIdOrFindByDestinationAddressId = function (fromAddressId, destinationAddressId) {
    return this.find({ fromAddressId: fromAddressId, destinationAddressId: destinationAddressId, status: "Ativa" }).populate('destinationAddressId');
};

const TripDriverModel = mongoose.model("TripDriver", TripDriver);

module.exports = TripDriverModel;