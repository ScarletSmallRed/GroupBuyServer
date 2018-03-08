const mongoose = require('mongoose');

const billNumberSchema = mongoose.Schema({
  doNumber: { type: Number },
  invNumber: { type: Number }
});

module.exports = mongoose.model('BillNumber', billNumberSchema);
