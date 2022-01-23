import { Schema, model, Types } from 'mongoose';

export const tickerSchema = new Schema({
  date: { type: Date, default: Date.now },
  owner: { type: String, default: 'common' },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  sector: {
    type: String,
  },
  price: {
    type: String,
  },
  pe: {
    type: String,
  },
  lt: {
    type: String,
  },
  eps: {
    type: String,
  },
  roa: {
    type: String,
  },
  roe: {
    type: String,
  },
  roi: {
    type: String,
  },
  payout: {
    type: String,
  },
  volatility: {
    type: String,
  },
  expectedPrice: {
    type: Number,
  },
});

export default model('Stock', tickerSchema);
