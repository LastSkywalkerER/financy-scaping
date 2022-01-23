import { Schema, model, Types } from 'mongoose';
import { stocksSchema } from './StocksTable';

export default model('Stocks-Users', stocksSchema);
