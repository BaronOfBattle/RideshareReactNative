const express = require('express');
const tripDriverController = require('../controllers/tripDriverController');
const tripDriverRoute = express.Router();

tripDriverRoute.route('/cadastro').post(tripDriverController.addTripDriver);
tripDriverRoute.route('/').get(tripDriverController.getAllTripDrivers);
tripDriverRoute.route('/:id').get(tripDriverController.getTripDriver);
tripDriverRoute.route('/update/:id').post(tripDriverController.updateTripDriver);
tripDriverRoute.route('/delete/:id').get(tripDriverController.deleteTripDriver);

module.exports = tripDriverRoute;
