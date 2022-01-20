import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// говорим экспрессу, что можно принимать запросы с чужих доменов
app.use(cors());

// говорим экспрессу, что ему надо работать с json
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));

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
