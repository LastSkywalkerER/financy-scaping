import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import cors from 'cors';
import WebSocket from 'ws';
import http from 'http';
import path from 'path';

import authRoutes from './routes/auth.routes';
import tickersRoutes from './routes/stock.routes';
import tableRoutes from './routes/table.routes';
import './telegramBot';

import onMessage, { broadcast } from './webSocket/on.message';
import { wsPackageTypes } from '../types/wsPackageTypes';
import { Scrap } from './utils/scrap';

const app = express();
const PORT = config.get('port') || 5000;
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

// говорим экспрессу, что можно принимать запросы с чужих доменов
app.use(cors());

// говорим экспрессу, что ему надо работать с json
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tickers', tickersRoutes);
app.use('/api/table', tableRoutes);

webSocketServer.on('connection', (ws) => {
  webSocketServer.clients.forEach((client) =>
    client.send(
      JSON.stringify({
        type: wsPackageTypes.WEBSOСKET_INFO,
        data: 'Somebody connected',
      }),
    ),
  );
  ws.on('message', (msg) => {
    onMessage(msg, webSocketServer, ws);
  });
});

setInterval(() => {
  const date = new Date();

  if (date.getHours() === 10 && date.getMinutes() === 50) {
    const scrap = new Scrap();

    scrap.run((data) => {
      broadcast(
        webSocketServer,
        JSON.stringify({
          type: wsPackageTypes.TABLE_UPDATE_REQUEST,
          data,
        }),
      );
    });
  }
}, 60000);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '..', '..', 'dist')));

  app.get('*', (request, response) => {
    response.sendFile(
      path.resolve(__dirname, '..', '..', 'dist', 'index.html'),
    );
  });
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'));
    server.listen(PORT, () => {
      console.log(`App started at ${PORT}`);
    });
  } catch (e: any) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
