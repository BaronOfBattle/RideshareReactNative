const express = require('express');
const tripPassengerController = require('../controllers/tripPassengerController');
const tripPassengerRoute = express.Router();

tripPassengerRoute.route('/cadastro').post(tripPassengerController.addTripPassenger);
tripPassengerRoute.route('/').get(tripPassengerController.getAllTripPassengers);
tripPassengerRoute.route('/:id').get(tripPassengerController.getTripPassenger);
tripPassengerRoute.route('/pedirCarona/:userId/:tripId').post(tripPassengerController.tripSolicitation);
tripPassengerRoute.route('/update/:id').post(tripPassengerController.updateTripPassenger);
tripPassengerRoute.route('/delete/:id').get(tripPassengerController.deleteTripPassenger);

module.exports = tripPassengerRoute;
