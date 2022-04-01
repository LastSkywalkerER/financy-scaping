import { Schema, model, Types } from 'mongoose';

export const ScrapDatesSchema = new Schema({
  date: { type: Date, required: true },
});

export default model('Stocks-Dates', ScrapDatesSchema);
