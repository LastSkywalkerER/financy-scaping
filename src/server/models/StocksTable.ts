import { Schema, model, Types } from 'mongoose';

export const stocksSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  owner: { type: String, default: 'common', required: true },
  symbol: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
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

export default model('Stocks-Table', stocksSchema);
