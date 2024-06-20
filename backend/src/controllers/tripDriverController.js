const TripDriver = require('../models/TripDriver');
const RouteTrip = require('../models/RouteTrip');
const Address = require('../models/Address');
const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

const reverseGeocode = require("./reverseGeoCode");

const addTripDriver = async (req, res) => {

    const coordsArray = req.body.fromAddresId.split(', ');
    const latitude = parseFloat(coordsArray[0]);
    const longitude = parseFloat(coordsArray[1]);

    const fromCoords = { lat: latitude, lon: longitude };
    const destinationCoords = { lat: req.body.destinationAddressId.latitude, lon: req.body.destinationAddressId.longitude };

    const tripRoute = new RouteTrip({
        "from": `${fromCoords.lat}, ${fromCoords.lon}`, 
        "destination": `${req.body.destinationAddressId.latitude}, ${req.body.destinationAddressId.longitude}`, 
        "tripDriver": req.body.userId, 
        "tripPassenger": null
    });
    
    await tripRoute.save();

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
        const vehicleType = await Vehicle.findByUserId(req.body.userId);

        let tripDriver = new TripDriver({
            ...req.body,
            fromAddresId: fromAddress._id,
            destinationAddressId: destinationAddress._id, 
            vehicleType: "66728a4a9e39d11b01e78c33", 
        });


        await tripDriver.save();
        res.status(200).json({ 'status': 'success', 'mssg': 'Trip driver added successfully', data: tripDriver });
    } catch (err) {
        console.error(err);
        res.status(409).send({ 'status': 'failure', 'mssg': 'Unable to save to database', 'error': err.message });
    }
};

const getAllTripDrivers = async (req, res) => {
    try {
        const tripDrivers = await TripDriver.find();
        res.status(200).json({ 'status': 'success', 'tripDrivers': tripDrivers });
    } catch (err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong', 'error': err.message });
    }
};

const getTripDriver = async (req, res) => {
    try {
        const tripDriver = await TripDriver.findById(req.params.id);
        console.log("ASDAD");
        console.log(tripDriver);
        res.status(200).json({ 'status': 'success', 'tripDrivers': tripDriver });
    } catch (err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong', 'error': err.message });
    }
};

const updateTripDriver = async (req, res) => {
    try {
        let tripDriver = await TripDriver.findById(req.params.id);
        if (!tripDriver) {
            return res.status(404).send({ 'status': 'failure', 'mssg': 'Trip driver not found' });
        }
        Object.assign(tripDriver, req.body);
        await tripDriver.save();
        res.status(200).json({ 'status': 'success', 'mssg': 'Trip driver updated successfully' });
    } catch (err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to update the database', 'error': err.message });
    }
};

const deleteTripDriver = async (req, res) => {
    try {
        let tripDriver = await TripDriver.findById(req.params.id);
        if (!tripDriver) {
            return res.status(404).send({ 'status': 'failure', 'mssg': 'Trip driver not found' });
        }
        await tripDriver.remove();
        res.status(200).json({ 'status': 'success', 'mssg': 'Trip driver deleted successfully' });
    } catch (err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to delete the trip driver', 'error': err.message });
    }
};

module.exports = {
    addTripDriver,
    getAllTripDrivers,
    getTripDriver,
    updateTripDriver,
    deleteTripDriver
};
