'use strict';

const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const fs = require('fs');

const url500 = 'https://admiralmarkets.com/ru/education/articles/trading-instruments/index-sp500-trading';
const urlTrade = 'https://finviz.com/quote.ashx?t=';

let table500 = [];

let emptyCount = 0;

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

  let price = $('div.fv-container').find('table:nth-child(2) tr:nth-child(11) td:last-child b').text();
  let pe = $('div.fv-container').find('table:nth-child(2) tr:nth-child(1) td:nth-child(4) b').text();
  let lt = $('div.fv-container').find('table:nth-child(2) tr:nth-child(11) td:nth-child(4) b').text();
  let eps = $('div.fv-container').find('table:nth-child(2) tr:nth-child(1) td:nth-child(6) b').text();
  let roa = $('div.fv-container').find('table:nth-child(2) tr:nth-child(5) td:nth-child(8) b').text();
  let roe = $('div.fv-container').find('table:nth-child(2) tr:nth-child(6) td:nth-child(8) b').text();
  let roi = $('div.fv-container').find('table:nth-child(2) tr:nth-child(7) td:nth-child(8) b').text();
  let payout = $('div.fv-container').find('table:nth-child(2) tr:nth-child(11) td:nth-child(8) b').text();
  let volatility = $('div.fv-container').find('table:nth-child(2) tr:nth-child(9) td:last-child small').text();

  if (price) {
    table500[i].price = price;
    table500[i].pe = pe;
    table500[i].lt = lt;
    table500[i].eps = eps;
    table500[i].roa = roa;
    table500[i].roe = roe;
    table500[i].roi = roi;
    table500[i].payout = payout;
    table500[i].volatility = volatility;
  } else {
    emptyCount++;
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
    .wait('div.fv-container')
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

  // await console.log(table500);

  // await fs.writeFileSync('./src/static/db/table.json', JSON.stringify(table500));

  await console.log("Info scraped succesfully!");
  await console.log("Empty tokens are" + emptyCount);
  emptyCount = 0;

}

runScrap();