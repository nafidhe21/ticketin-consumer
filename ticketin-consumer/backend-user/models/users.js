const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    required: true
  },
  age: {
    type: String,
    required: true
  }
})

userSchema.virtual('id').get(function() {
  return this._id.toHexString();
})

userSchema.set('toJSON', {
  virtuals: true
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
