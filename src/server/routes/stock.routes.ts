import { Router } from 'express';
import tickerSchema from '../models/Ticker';
import auth from '../middleware/auth.middleware';
import config from 'config';

const router = Router();

router.post('/saved', auth, async (req, res) => {
  try {
    const { tickers } = req.body;
    const date = new Date();
    const existing = await tickerSchema.find({ owner: req.user.userId });
    if (existing) {
      res.json(existing);
    }

    tickers.forEach(async (ticker) => {
      const stringifyTicker = {};
      const map = new Map();
      Object.keys(ticker).forEach((key) => {
        map.set(key, ticker[key]);
      });
      map.forEach((value, key) => {
        stringifyTicker[key] = String(value);
      });
      const savedTickers = new tickerSchema({
        ...stringifyTicker,
        expectedPrice: 0,
        owner: req.user.userId,
        date,
      });
      console.log(savedTickers);

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
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

router.get('/saved', auth, async (req, res) => {
  try {
    const tickers = await tickerSchema.find({ owner: req.user.userId });
    res.json(tickers);
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

router.delete('/saved', auth, async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

export default router;
