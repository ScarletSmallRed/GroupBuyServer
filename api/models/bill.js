const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
  goodsList: [
    {
      goodsInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'goods'
      },
      quantity: { type: Number },
      actualQuantity: { type: Number, default: null }
    }
  ],
  totalPrice: { type: Number, require: true },
  userInfo: {
    userEmail: {
      type: String,
      required: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    userName: { type: String },
    address: {
      type: String,
      required: true
    },
    phone: { type: Number, require: true },
    postCode: { type: Number, require: true }
  },
  orderDate: { type: Date, default: Date.now },
  doNumber: { type: Number },
  shippingDate: { type: Date, default: null },
  completeDate: { type: Date, default: null },
  invNumber: { type: Number, default: null },
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clerk'
  },
  state: { type: Number, default: 0 }
});

module.exports = mongoose.model('Bill', billSchema);
