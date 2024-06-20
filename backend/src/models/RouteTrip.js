const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RouteTrip = new Schema({
    from: {
        type: String
    }, 
    destination: {
        type: String
    }, 
    tripDriver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TripDriver'
    }, 
    tripPassenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TripPassenger'
    }
}, {
    collection: "routeTrip"
});

RouteTrip.statics.findByTripPassenger = function (passengerId) {
    return this.find({ tripPassenger: passengerId }).populate('tripPassenger');
};

RouteTrip.statics.findTripDriversByFromOrDestination = function (from, destination) {
    return this.aggregate([
        {
            "$match": {
                "$or": [
                    { from: from },
                    { destination: destination }
                ],
                tripPassenger: { "$exists": false }
            }
        },
        {
            "$lookup": {
                from: 'tripDriver', 
                localField: 'tripDriver',
                foreignField: '_id',
                as: 'tripDriver'
            }
        },
        { "$unwind": '$tripDriver' },
        {
            "$match": {
                'tripDriver.status': 'Ativa', 
                'tripDriver.availableSeats': { "$gt": 0 }
            }
        }
    ]);
};




const RouteTripModel = mongoose.model("RouteTrip", RouteTrip);

module.exports = RouteTripModel;