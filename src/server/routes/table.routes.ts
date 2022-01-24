import { Router } from 'express';
import stocksSchema from '../models/StocksTable';
import auth from '../middleware/auth.middleware';
import config from 'config';

import changeStockArray from '../utils/changeStockArray';
import runScrap from '../scrap';

const router = Router();

router.get('/update', auth, async (req, res) => {
  try {
    const data = await runScrap();
    res.json(data);
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

router.get('/data', auth, async (req, res) => {
  try {
    const stocks = await stocksSchema.find({});
    res.json({
      stocks: changeStockArray(stocks),
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

export default router;
