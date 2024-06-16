const express = require('express');
const vehicleRoute = express.Router();

let Vehicle = require('../models/Vehicle');

vehicleRoute.route('/add').post(function (req, res) {
  let vehicle = new Vehicle(req.body);
  vehicle.save()
    .then(vehicle => {
      res.status(200).json({ 'status': 'success', 'mssg': 'vehicle added successfully' });
    })
    .catch(err => {
      res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
    });
});

vehicleRoute.route('/').get(function (req, res) {
  Vehicle.find().then(vehicles => {
    res.status(200).json({ 'status': 'success', 'vehicles': vehicles });
  }).catch(err => {
    res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
  });
});

vehicleRoute.route('/vehicle/:id').get(function (req, res) {
  let id = req.params.id;
  Vehicle.findById(id).then(vehicle => {
    res.status(200).json({ 'status': 'success', 'vehicle': vehicle }); 
  }).catch(err => {
    res.status(400).send({ 'status': 'failure', 'mssg': err });
  })
});

vehicleRoute.route('/update/:id').put(async function (req, res) {
  try {
    let vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
    } else {
      vehicle.name = req.body.name;

      await vehicle.save();
      res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
    }
  } catch (err) {
    res.status(400).send({ 'status': 'failure', 'mssg': err.message });
  }
});

vehicleRoute.route('/delete/:id').delete(async function (req, res) {
  try {
    await Vehicle.findByIdAndRemove(req.params.id);
    res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
  } catch (err) {
    res.status(400).send({ 'status': 'failure', 'mssg': err.message });
  }
});


module.exports = vehicleRoute;