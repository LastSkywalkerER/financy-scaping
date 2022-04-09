import { Router } from 'express';
import stocksSchema from '../models/StocksTable';
import scrapDatesSchema from '../models/ScrapDates';
import auth from '../middleware/auth.middleware';
import config from 'config';

import changeStockArray from '../utils/changeStockArray';

const router = Router();

router.get('/data', auth, async (req, res) => {
  try {
    const dates = await scrapDatesSchema.aggregate([
      { $group: { _id: '$date', date: { $last: '$date' } } },
    ]);

    const stocks = await stocksSchema.find({});

    res.json({
      stocks: changeStockArray(
        stocks.filter(
          (item) =>
            String(item.date) ===
            String(
              dates.reduce((accumulator, item) =>
                new Date(item.date) > new Date(accumulator.date)
                  ? item
                  : accumulator,
              ).date,
            ),
        ),
      ),
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

export default router;
