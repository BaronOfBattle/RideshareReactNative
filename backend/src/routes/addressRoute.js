const express = require('express');
const Address = require('../models/Address');
const app = express();
const addressRoute = express.Router();

addressRoute.route('/add').post(function (req, res) {
    let address = new Address(req.body);
    address.save()
        .then(address => {
            res.status(200).json({ 'status': 'success', 'mssg': 'address added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});


addressRoute.route('/').get(function (req, res) {
    Address.find().then(addresss => {
        res.status(200).json({ 'status': 'success', 'addresss': addresss });
    }).catch(err => {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
    });
});

addressRoute.route('/update/:id').post(async function (req, res) {
    try {
        let address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).send({ 'status': 'failure', 'mssg': 'Address not found' });
        }
        Object.assign(address, req.body);
        await address.save();
        res.status(200).json({ 'status': 'success', 'mssg': 'Address updated successfully' });
    } catch (err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to update the database', 'error': err.message });
    }
});

addressRoute.route('/delete/:id').get(async function (req, res) {
    try {
        let address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).send({ 'status': 'failure', 'mssg': 'Address not found' });
        }
        await address.remove();
        res.status(200).json({ 'status': 'success', 'mssg': 'Address deleted successfully' });
    } catch (err) {
        res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to delete the address', 'error': err.message });
    }
});

module.exports = addressRoute;