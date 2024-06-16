const express = require('express');
const companyRoute = express.Router();

let Company = require('../models/Company');

companyRoute.route('/add').post(function (req, res) {
  let company = new Company(req.body);
  company.save()
    .then(company => {
      res.status(200).json({ 'status': 'success', 'mssg': 'company added successfully' });
    })
    .catch(err => {
      res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
    });
});

companyRoute.route('/').get(function (req, res) {
  Company.find().then(companies => {
    res.status(200).json({ 'status': 'success', 'companies': companies });
  }).catch(err => {
    res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
  });
});

companyRoute.route('/company/:id').get(function (req, res) {
  let id = req.params.id;
  Company.findById(id).then(company => {
    res.status(200).json({ 'status': 'success', 'company': company }); 
  }).catch(err => {
    res.status(400).send({ 'status': 'failure', 'mssg': err });
  })
});

companyRoute.route('/update/:id').put(async function (req, res) {
  try {
    let company = await Company.findById(req.params.id);
    if (!company) {
      res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
    } else {
      company.name = req.body.name;

      await company.save();
      res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
    }
  } catch (err) {
    res.status(400).send({ 'status': 'failure', 'mssg': err.message });
  }
});

companyRoute.route('/delete/:id').delete(async function (req, res) {
  try {
    await Company.findByIdAndRemove(req.params.id);
    res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
  } catch (err) {
    res.status(400).send({ 'status': 'failure', 'mssg': err.message });
  }
});


module.exports = companyRoute;