const mongoose = require('mongoose');
const Recording = require('../models/recording');

exports.recordings_creating_recording = (req, res, next) => {
  Recording.create(req.body)
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.recordings_get_all = (req, res, next) => {
  Recording.find()
    .populate('operator clerk goods bill')
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.recordings_search_recording = (req, res, next) => {
  Recording.find({
    time: {
      $gte: new Date(req.body.start),
      $lte: new Date(req.body.end)
    }
  })
    .populate('operator clerk goods')
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};
