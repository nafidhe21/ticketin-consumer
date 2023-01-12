const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  concert_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'concert',
    required: true
  },
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true
  },
  amount: {
    A1_am: Number,
    A2_am: Number,
    A3_am: Number
  },
  payed: {
    type: Boolean,
    default: false
  },
  concertDate: Date,
  price: Number,
  dateCreated: {
    type: Date,
    default: Date.now
  }
})

ticketSchema.virtual('id').get(function() {
  return this._id.toHexString();
})

ticketSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Ticket', ticketSchema);
