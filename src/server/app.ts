import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import tickersRoutes from './routes/stock.routes';
import tableRoutes from './routes/table.routes';

const app = express();

// говорим экспрессу, что можно принимать запросы с чужих доменов
app.use(cors());

// говорим экспрессу, что ему надо работать с json
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tickers', tickersRoutes);
app.use('/api/table', tableRoutes);

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'));
    app.listen(PORT, () => {
      console.log(`App started at ${PORT}`);
    });
  } catch (e: any) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
