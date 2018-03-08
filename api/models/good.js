const mongoose = require('mongoose');

const goodsSchema = mongoose.Schema({
  goodsName: { type: String },
  goodsSize: { type: String },
  goodsPrice: { type: Number },
  goodsImage: { type: String },
  goodsCategory: {type: String, require: true}
});

module.exports = mongoose.model('goods', goodsSchema);
