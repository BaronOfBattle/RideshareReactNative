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

TripPassenger.statics.findByUserId = function (userId) {
    return this.find({ userId: userId, status: "Ativa" });
};

TripPassenger.statics.findByFromAddressIdOrFindByDestinationAddressId = function (fromAddressId, destinationAddressId) {
    return this.find({ fromAddressId: fromAddressId, destinationAddressId: destinationAddressId, status: "Ativa" }).populate('destinationAddressId');
};

const TripPassengerModel = mongoose.model("TripPassenger", TripPassenger);

module.exports = TripPassengerModel;
