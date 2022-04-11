import Nightmare from 'nightmare';
import cheerio from 'cheerio';
import fs from 'fs';
import Snp500Schema from '../models/Snp500';
import StocksSchema from '../models/StocksTable';
import ScrapDatesSchema from '../models/ScrapDates';

import Token from '../../types/Token';

const url500 = 'https://illiakyselov.com/kompanii-s-p500';
const urlTrade = 'https://finviz.com/quote.ashx?t=';

export const tableUpdating = {
  status: false,
  tickerCount: 505,
  tickerUpdated: 0,
};
export class Scrap {
  private table500: Token[] = [];
  private date: Date;

  constructor() {
    this.date = new Date();
  }

  private async getTradingData(html, i): Promise<void> {
    try {
      const $ = cheerio.load(html);

      let price = $('div.fv-container')
        .find('table:nth-child(2) tr:nth-child(11) td:last-child b')
        .text();
      let pe = $('div.fv-container')
        .find('table:nth-child(2) tr:nth-child(1) td:nth-child(4) b')
        .text();
      let lt = $('div.fv-container')
        .find('table:nth-child(2) tr:nth-child(11) td:nth-child(4) b')
        .text();
      let eps = $('div.fv-container')
        .find('table:nth-child(2) tr:nth-child(1) td:nth-child(6) b')
        .text();
      let roa = $('div.fv-container')
        .find('table:nth-child(2) tr:nth-child(5) td:nth-child(8) b')
        .text();
      let roe = $('div.fv-container')
        .find('table:nth-child(2) tr:nth-child(6) td:nth-child(8) b')
        .text();
      let roi = $('div.fv-container')
        .find('table:nth-child(2) tr:nth-child(7) td:nth-child(8) b')
        .text();
      let payout = $('div.fv-container')
        .find('table:nth-child(2) tr:nth-child(11) td:nth-child(8) b')
        .text();
      let volatility = $('div.fv-container')
        .find('table:nth-child(2) tr:nth-child(9) td:last-child small')
        .text();

      const scrapedData = {
        price,
        pe,
        lt,
        eps,
        roa,
        roe,
        roi,
        payout,
        volatility,
      };

      this.table500[i] = {
        ...this.table500[i],
        ...scrapedData,
      };

      const stock = new StocksSchema({
        ...this.table500[i],
        ...scrapedData,
        date: this.date,
      });
      await stock.save();
    } catch (error) {}
  }

  private async getPrices(url, i): Promise<void> {
    try {
      const nightmare = Nightmare();

      await nightmare
        .goto(url)
        .wait('body')
        .wait('div.fv-container')
        .evaluate(() => document.querySelector('body').innerHTML)
        .end()
        .then((response) => {
          this.getTradingData(response, i);
        })
        .catch((err) => {
          console.warn(err);
        });
    } catch (error) {}
  }

  public async run(sendStatus): Promise<{ message: string }> {
    console.log('this started');
    tableUpdating.status = true;

    const dbDate = new ScrapDatesSchema({
      date: this.date,
    });
    await dbDate.save();

    this.table500 = await (
      await Snp500Schema.find({})
    ).map((ticker) => ({
      name: ticker.name,
      symbol: ticker.symbol,
      sector: ticker.sector,
    }));

    tableUpdating.tickerCount = this.table500.length;

    const threads = 2;

    for (let i = 0; i < this.table500.length; i += threads) {
      sendStatus(tableUpdating);

      await Promise.all(
        Array(threads)
          .fill(null)
          .map(async (value, j) => {
            await this.getPrices(urlTrade + this.table500[i].symbol, i + j);
            tableUpdating.tickerUpdated++;
          }),
      );
    }
    tableUpdating.status = false;
    console.log('Info scraped succesfully!');
    return { message: 'Success' };
  }
}

// let getData500 = (html) => {
//   const $ = cheerio.load(html);

//   $('div.jeg_main_content.col-md-8')
//     .find('tr')
//     .each((i, elem) => {
//       let name = $(elem).find('td:nth-child(1)').text();
//       let symbol = $(elem).find('td:nth-child(2)').text();
//       let sector = $(elem).find('td:nth-child(3)').text();

//       if (symbol && symbol !== 'Тикер') {
//         const ticker = {
//           name,
//           symbol,
//           sector,
//         };
//         this.table500.push(ticker);
//         const tickerDb = new Snp500Schema(ticker);
//         tickerDb.save();
//       }
//     });
// };

//get s&p500 table

// async function get500() {
//   const nightmare = Nightmare();

//   await nightmare
//     .goto(url500)
//     .wait('body')
//     .wait('div.jeg_main_content.col-md-8 table')
//     .evaluate(() => document.querySelector('body').innerHTML)
//     .end()
//     .then((response) => {
//       getData500(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

//get price from trading view

// export default async function runScrap(sendStatus) {
//   console.log('this started');
//   tableUpdating.status = true;
//   this.date = new Date();

//   // await get500();

//   this.table500 = await (
//     await Snp500Schema.find({})
//   ).map((ticker) => ({
//     name: ticker.name,
//     symbol: ticker.symbol,
//     sector: ticker.sector,
//   }));

//   tableUpdating.tickerCount = this.table500.length;

//   const threads = 2;

//   for (let i = 0; i < this.table500.length; i += threads) {
//     // await getPrices(urlTrade + this.table500[i].symbol, i);
//     sendStatus(tableUpdating);

//     await Promise.all(
//       Array(threads)
//         .fill(null)
//         .map(async (value, j) => {
//           await getPrices(urlTrade + this.table500[i].symbol, i + j);
//           tableUpdating.tickerUpdated++;
//           // console.log(i + j);
//         }),
//     );
//     // console.log(
//     //   Array(threads)
//     //     .fill(null)
//     //     .map(() => '0'),
//     // );

//     // console.log(this.table500[i], this.table500[i + 1]);
//   }

//   // await console.log(this.table500);

//   // await fs.writeFileSync(
//   //   './src/client/static/db/table.json',
//   //   JSON.stringify(this.table500),
//   // );
//   tableUpdating.status = false;
//   console.log('Info scraped succesfully!');
//   return { message: 'Success' };
// }
