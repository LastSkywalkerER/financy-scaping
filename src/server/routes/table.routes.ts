import { Router } from 'express';
import stocksSchema from '../models/StocksTable';
import scrapDatesSchema from '../models/ScrapDates';
import auth from '../middleware/auth.middleware';
import config from 'config';

import changeStockArray from '../utils/changeStockArray';

const router = Router();

router.get('/data', auth, async (req, res) => {
  try {
    const date = await scrapDatesSchema.aggregate([
      { $group: { _id: '$date', date: { $last: '$date' } } },
    ]);

    const stocks = await stocksSchema.find({});

    res.json({
      stocks: changeStockArray(
        stocks.filter((item) => String(item.date) === String(date[0].date)),
      ),
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

export default router;
