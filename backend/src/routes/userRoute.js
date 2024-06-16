const express = require('express');
const app = express();
const userRoute = express.Router();

let User = require('../models/User');
const userController = require('../controllers/userController');

userRoute.route('/add').post(function (req, res) {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({ 'status': 'success', 'mssg': 'user added successfully' });
    })
    .catch(err => {
      res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
    });
});

userRoute.route('/cadastro').post(userController.cadastro);

userRoute.route('/login').post(userController.login);

userRoute.route('/').get(function (req, res) {
  User.find().then(users => {
    res.status(200).json({ 'status': 'success', 'users': users });
  }).catch(err => {
    res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
  });
});

userRoute.route('/user/:id').get(userController.getUserById);

userRoute.route('/update/:id').put(async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
    } else {
      user.name = req.body.name;

      await user.save();
      res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
    }
  } catch (err) {
    res.status(400).send({ 'status': 'failure', 'mssg': err.message });
  }
});

userRoute.route('/delete/:id').delete(async function (req, res) {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
  } catch (err) {
    res.status(400).send({ 'status': 'failure', 'mssg': err.message });
  }
});


module.exports = userRoute;