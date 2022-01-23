import { Schema, model, Types } from 'mongoose';
import { tickersSchema } from './Tickers';

export default model('snp500', tickersSchema);
