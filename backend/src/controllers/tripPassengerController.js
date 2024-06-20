const TripPassenger = require('../models/TripPassenger');
const RouteTrip = require('../models/RouteTrip');
const Address = require('../models/Address');
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const TripSolicitation = require("../models/TripSolicitation");

const reverseGeocode = require("./reverseGeoCode");

const addTripPassenger = async (req, res) => {

    const coordsArray = req.body.fromAddressId.split(', ');
    const latitude = parseFloat(coordsArray[0]);
    const longitude = parseFloat(coordsArray[1]);

    const fromCoords = { lat: latitude, lon: longitude };
    const destinationCoords = { lat: req.body.destinationAddressId.latitude, lon: req.body.destinationAddressId.longitude };

    
    try {
        let fromAddressData = await reverseGeocode(fromCoords.lat, fromCoords.lon);
        let destinationAddressData = await reverseGeocode(destinationCoords.lat, destinationCoords.lon);
        
        fromAddressData = fromAddressData.address;
        destinationAddressData = destinationAddressData.address;
        
        const fromAddress = new Address({
            street: fromAddressData.road,
            city: fromAddressData.city,
            state: fromAddressData.state,
            country: fromAddressData.country,
            cep: fromAddressData.postcode,
            number: (fromAddressData.house_number) ? fromAddressData.house_number : null
        });
        
        const destinationAddress = new Address({
            street: destinationAddressData.road,
            city: destinationAddressData.city,
            state: destinationAddressData.state,
            country: destinationAddressData.country,
            cep: destinationAddressData.postcode,
            number: (destinationAddressData.house_number) ? destinationAddressData.house_number : null
        });
        
        await fromAddress.save();
        await destinationAddress.save();
        
        let tripPassenger = new TripPassenger({
            ...req.body,
            fromAddressId: fromAddress._id,
            destinationAddressId: destinationAddress._id, 
            vehicleType: req.body.vehicleType, 
        });
        
        const tripRoute = new RouteTrip({
            "from": `${fromCoords.lat}, ${fromCoords.lon}`, 
            "destination": `${req.body.destinationAddressId.latitude}, ${req.body.destinationAddressId.longitude}`, 
            "tripPassenger": tripPassenger._id
        });
        
        await tripRoute.save();
        
        await tripPassenger.save();
        res.status(200).json({ 'status': 'success', 'mssg': 'Trip driver added successfully', data: tripPassenger });
    } catch (err) {
        console.error(err);
        res.status(409).send({ 'status': 'failure', 'mssg': 'Unable to save to database', 'error': err.message });
    }
};

const getAllTripPassengers = async (req, res) => {
    try {
        const tripPassengers = await TripPassenger.find();
        res.status(200).json({ 'status': 'success', 'tripPassengers': tripPassengers });
    } catch (err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong', 'error': err.message });
    }
};

const getTripPassenger = async (req, res) => {
    try {
        const tripPassenger = await TripPassenger.findByUserId(req.params.id);
        res.status(200).json({ 'status': 'success', 'tripPassengers': tripPassenger });
    } catch (err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong', 'error': err.message });
    }
};

const updateTripPassenger = async (req, res) => {
    try {
        let tripPassenger = await TripPassenger.findById(req.params.id);
        if (!tripPassenger) {
            return res.status(404).send({ 'status': 'failure', 'mssg': 'Trip driver not found' });
        }
        Object.assign(tripPassenger, req.body);
        await tripPassenger.save();
        res.status(200).json({ 'status': 'success', 'mssg': 'Trip driver updated successfully' });
    } catch (err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to update the database', 'error': err.message });
    }
};

const tripSolicitation = async (req, res) => {
    try {
        let tripSol = new TripSolicitation({
            userId: req.params.userId,
            tripId: req.params.tripId
        });
        await tripSol.save();
        res.status(201).send({ "status": "created", 'mssg': "solicitation created", "tripSolicitation": tripSol });
    } catch(err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'unable to create solicitation', 'error': err.message });
    }
}

const deleteTripPassenger = async (req, res) => {
    try {
        let tripPassenger = await TripPassenger.findById(req.params.id);
        if (!tripPassenger) {
            return res.status(404).send({ 'status': 'failure', 'mssg': 'Trip driver not found' });
        }
        await tripPassenger.remove();
        res.status(200).json({ 'status': 'success', 'mssg': 'Trip driver deleted successfully' });
    } catch (err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to delete the trip driver', 'error': err.message });
    }
};

module.exports = {
    addTripPassenger,
    getAllTripPassengers,
    getTripPassenger,
    updateTripPassenger,
    tripSolicitation, 
    deleteTripPassenger
};
