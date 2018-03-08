const mongoose = require('mongoose');

const recordingSchema = mongoose.Schema({
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clerk',
    required: true
  },
  time: { type: Date, default: Date.now },
  operation: { type: String },
  clerk_state: { type: Number, default: null },
  goods_state: { type: Number, default: null },
  bill_state: { type: Number, default: null },
  clerk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clerk',
    default: null
  },
  goods: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'goods',
    default: null
  },
  bill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill',
    default: null
  }
});

module.exports = mongoose.model('Recording', recordingSchema);
