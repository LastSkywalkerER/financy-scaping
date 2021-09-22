'use strict';

const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const fs = require('fs');

const url500 = 'https://admiralmarkets.com/ru/education/articles/trading-instruments/index-sp500-trading';
const urlTrade = 'https://ru.tradingview.com/chart/?symbol=';

let table500 = [];

let getData500 = html => {
  const $ = cheerio.load(html);

  $('div.article-container__text table').find('tr').each((i, elem) => {

    let symbol = $(elem).find('td:nth-child(3) p').text();
    let sector = $(elem).find('td:nth-child(4) p').text();

    if (symbol && symbol !== 'Символ') {
      table500.push({
        symbol: symbol,
        sector: sector
      });
    }
  });
}

let getTradingData = (html, i) => {
  const $ = cheerio.load(html);

  let price = $('span.priceWrapper-3PT2D-PK').find('span.highlight-2GhssDiZ.price-3PT2D-PK').text();
  let currency = $('span.priceWrapper-3PT2D-PK').find('span.currency-3PT2D-PK').text();

  if (price) {
    table500[i].price = price;
    table500[i].currency = currency;
  }

}

//get s&p500 table

async function get500() {
  const nightmare = Nightmare();

  await nightmare
    .goto(url500)
    .wait('body')
    .wait('div.article-container__text table')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
      getData500(response);
    }).catch(err => {
      console.log(err);
    });
}

//get price from trading view

async function getPrices(url, i) {
  const nightmare = Nightmare();

  await nightmare
    .goto(url)
    .wait('body')
    .wait('span.priceWrapper-3PT2D-PK')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
      getTradingData(response, i);
    }).catch(err => {
      console.log(err);
    });
}

async function runScrap() {

  await get500();

  for (let i = 0; i < table500.length; i++) {
    await getPrices(urlTrade + table500[i].symbol, i);
  }

  await console.log(table500);

  await fs.writeFileSync('./src/static/db/table.json', JSON.stringify(table500));

}

runScrap();