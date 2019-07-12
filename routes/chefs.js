const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Chefs = require('../models/chef-model');

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'GET all chefs' });
});

router.post('/', (req, res, next) => {
  const chef = new Chefs({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    location: req.body.location
  });
  chef
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  res.status(201).json({
    message: 'POST Chef',
    createdChef: chef
  });
});

router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;
  if (id === 'special') {
    res.status(200).json({
      message: 'you discovered the special id!',
      id: id
    });
  } else {
    res.status(200).json({ message: 'you passed an id!' });
  }
});

router.patch('/:userId', (req, res, next) => {
  res.status(201).json({
    message: 'updated chef!'
  });
});

router.delete('/:userId', (req, res, next) => {
  res.status(200).json({
    message: 'nuked chef!'
  });
});

module.exports = router;
