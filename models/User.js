'use strict';

const {
  Schema,
  model,
  Types
} = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  purchasedTokens: [{
    type: Types.ObjectId,
    ref: 'purchasedToken'
  }]
});

module.exports = model('User', schema);