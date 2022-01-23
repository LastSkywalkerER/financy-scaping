import { Schema, model, Types } from 'mongoose';

export const tickerObject = {
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  sector: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
};

export const tickersSchema = new Schema(tickerObject);

export default model('Tickers', tickersSchema);
