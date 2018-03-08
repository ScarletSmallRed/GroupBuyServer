const mongoose = require('mongoose');
const BillNumber = require('../models/billNumber');

exports.billNumber_init = (req, res, next) => {
  BillNumber.create(req.body)
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};
exports.billNumber_get = (req, res, next) => {
  BillNumber.find()
    .then(doc => {
      console.log(doc);
      res.send(doc[0]);
    })
    .catch(err => {
      console.log(err);
    });
};
exports.billNumber_update = (req, res, next) => {
  const _id = req.params.id;
  BillNumber.updateMany({ _id: _id }, req.body)
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
    });
};
