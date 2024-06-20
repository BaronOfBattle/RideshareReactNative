const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TripSolicitation = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TripDriver'
    }, 
    status: {
        type: String, 
        default: "Pendent"
    }
}, {
    collection: "tripSolicitation"
});
TripSolicitation.statics.findByTripId = function (tripId) {
    return this.find({ tripId: tripId, status: "Pendent" }).populate('userId');
};

const TripSolicitationModel = mongoose.model("TripSolicitation", TripSolicitation);

module.exports = TripSolicitationModel;