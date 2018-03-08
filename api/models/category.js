const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
    categoriesName: {type: String}
  });
  
  module.exports = mongoose.model('category', categorySchema);