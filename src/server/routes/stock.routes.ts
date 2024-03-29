import { Router } from 'express';
import stocksSchema from '../models/StocksUsers';
import auth from '../middleware/auth.middleware';
import config from 'config';

import changeStockArray from '../utils/changeStockArray';
import Token from 'src/types/Token';

const router = Router();

router.post('/saved', auth, async (req, res) => {
  try {
    const { tickers } = req.body;
    const date = new Date();
    tickers.forEach(async (ticker: Token) => {
      const stringifyTicker = {} as { [key: string]: string };
      const map = new Map();
      Object.keys(ticker).forEach((key) => {
        map.set(key, ticker[key]);
      });
      map.forEach((value, key) => {
        stringifyTicker[key] = String(value);
      });
      const savedTickers = new stocksSchema({
        ...stringifyTicker,
        expectedPrice: 0,
        owner: req.user.userId,
        date,
      });

      await savedTickers.save();
    });

    res.status(201);
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

router.patch('/saved', auth, async (req, res) => {
  try {
    const { symbol, expectedPrice } = req.body;
    await stocksSchema.updateOne({ symbol }, { expectedPrice });
    res.status(201).json({ message: 'bought' });
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

router.get('/saved', auth, async (req, res) => {
  try {
    const tickers = await stocksSchema.find({ owner: req.user.userId });

    const analysedTickers = changeStockArray(tickers).map((ticker) => {
      if (ticker.price <= ticker.expectedPrice) {
        ticker.status = 'ready';
      }
      return ticker;
    });

    res.json({ tickers: analysedTickers });
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

router.delete('/saved', auth, async (req, res) => {
  try {
    const { tickers } = req.body;

    tickers.forEach(async (ticker) => {
      await stocksSchema.deleteOne({ symbol: ticker.symbol });
    });

    res.status(201).json({ message: 'deleted' });
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong with deleting :(',
    });
  }
});

export default router;
