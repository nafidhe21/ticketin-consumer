const mongoose = require('mongoose');

const concertSchema = mongoose.Schema({
  concertName: String,
  date: Date,
  time: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  concertImage: {
    type: String
  },
  classCapacity: {
    A1Cap: Number,
    A2Cap: Number,
    A3Cap: Number
  },
  classPrices: {
    A1: Number,
    A2: Number,
    A3: Number
  }
})

concertSchema.virtual('id').get(function() {
  return this._id.toHexString();
})

concertSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Concert', concertSchema);
