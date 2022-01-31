import Nightmare from 'nightmare';
import cheerio from 'cheerio';
import fs from 'fs';
import Snp500Schema from '../models/Snp500';
import StocksSchema from '../models/StocksTable';

import Token from '../../types/Token';

const url500 = 'https://illiakyselov.com/kompanii-s-p500';
const urlTrade = 'https://finviz.com/quote.ashx?t=';

let date = new Date();

let table500: Token[] = [];

let getData500 = (html) => {
  const $ = cheerio.load(html);

  $('div.jeg_main_content.col-md-8')
    .find('tr')
    .each((i, elem) => {
      let name = $(elem).find('td:nth-child(1)').text();
      let symbol = $(elem).find('td:nth-child(2)').text();
      let sector = $(elem).find('td:nth-child(3)').text();

      if (symbol && symbol !== 'Тикер') {
        const ticker = {
          name,
          symbol,
          sector,
        };
        table500.push(ticker);
        const tickerDb = new Snp500Schema(ticker);
        tickerDb.save();
      }
    });
};

let getTradingData = async (html, i) => {
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

  table500[i] = {
    ...table500[i],
    ...scrapedData,
  };

  const stock = new StocksSchema({
    ...table500[i],
    ...scrapedData,
    date,
  });
  await stock.save();
  // console.log(scrapedData);

  // table500[i].price = price;
  // table500[i].pe = pe;
  // table500[i].lt = lt;
  // table500[i].eps = eps;
  // table500[i].roa = roa;
  // table500[i].roe = roe;
  // table500[i].roi = roi;
  // table500[i].payout = payout;
  // table500[i].volatility = volatility;
};

//get s&p500 table

async function get500() {
  const nightmare = Nightmare();

  await nightmare
    .goto(url500)
    .wait('body')
    .wait('div.jeg_main_content.col-md-8 table')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then((response) => {
      getData500(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

//get price from trading view

async function getPrices(url, i) {
  const nightmare = Nightmare();

  await nightmare
    .goto(url)
    .wait('body')
    .wait('div.fv-container')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then((response) => {
      getTradingData(response, i);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default async function runScrap() {
  console.log('Scrap started');
  date = new Date();

  table500 = await (
    await Snp500Schema.find({})
  ).map((ticker) => ({
    name: ticker.name,
    symbol: ticker.symbol,
    sector: ticker.sector,
  }));

  // await get500();

  const threads = 2;

  for (let i = 0; i < table500.length; i += threads) {
    // await getPrices(urlTrade + table500[i].symbol, i);
    await Promise.all(
      Array(threads)
        .fill(null)
        .map(async (value, j) => {
          await getPrices(urlTrade + table500[i].symbol, i + j);
          // console.log(i + j);
        }),
    );
    // console.log(
    //   Array(threads)
    //     .fill(null)
    //     .map(() => '0'),
    // );

    // console.log(table500[i], table500[i + 1]);
  }

  // await console.log(table500);

  // await fs.writeFileSync(
  //   './src/client/static/db/table.json',
  //   JSON.stringify(table500),
  // );

  await console.log('Info scraped succesfully!');
  return { message: 'Success' };
}
