const Vehicle = require('../models/Vehicle');

exports.addVehicle = async (req, res, vehicleData) => {

    try {
        let vehicle = new Vehicle(vehicleData);
        await vehicle.save();
        return status(201).json({ 'status': 'success', 'message': 'Vehicle added successfully' });
    } catch (err) {
        console.error('Error saving vehicle:', err);
        return status(500).json({ 'status': 'failure', 'message': 'Error saving vehicle to database' });
    }
};
