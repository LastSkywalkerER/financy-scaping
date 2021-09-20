'use strict';

// const Nightmare = require('nightmare');
// const cheerio = require('cheerio');

// const nightmare = Nightmare({
//   show: true
// });
// const url = 'https://news.ycombinator.com';

// nightmare
//   .goto(url)
//   .wait('body')
//   .evaluate(() => document.querySelector('body').innerHTML)
//   .end()
//   .then(response => {
//     console.log(getData(response));
//   }).catch(err => {
//     console.log(err);
//   });

// let getData = html => {
//   let data = [];
//   const $ = cheerio.load(html);
//   $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
//     data.push({
//       title: $(elem).text(),
//       link: $(elem).find('a.storylink').attr('href')
//     });
//   });
//   return data;
// }

/////////////////////////////////////////////////////////////////////////////////////

// const Nightmare = require('nightmare');
// const cheerio = require('cheerio');

// const nightmare = Nightmare({
//   show: true
// });
// const url = 'https://www.flipkart.com';

// nightmare
//   .goto(url)
//   .wait('body')
//   .click('button._2KpZ6l._2doB4z')
//   .type('input._3704LK', 'nodejs books')
//   .wait(1000)
//   .click('button.L0Z3Pu')
//   .wait('div.bhgxx2')
//   .evaluate(() => document.querySelector('body').innerHTML)
//   .end()
//   .then(response => {
//     console.log(getData(response));
//   }).catch(err => {
//     console.log(err);
//   });

// let getData = html => {
//   let data = [];
//   const $ = cheerio.load(html);

//   $('div._1HmYoV._35HD7C:nth-child(2) div.bhgxx2.col-12-12').each((row, raw_element) => {
//     $(raw_element).find('div div div').each((i, elem) => {
//       let title = $(elem).find('div div a:nth-child(2)').text();
//       let link = $(elem).find('div div a:nth-child(2)').attr('href');
//       if (title) {
//         data.push({
//           title: title,
//           link: link
//         });
//       }
//     });
//   });

//   return data;
// }

/////////////////////////////////////////////////////////////////////////////////////

const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({
  show: true
});
const url = 'https://ru.tradingview.com/chart/?symbol=NASDAQ%3ATSLA';

nightmare
  .goto(url)
  .wait('body')
  .wait('span.priceWrapper-3PT2D-PK')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
  .then(response => {
    console.log(getData(response));
  }).catch(err => {
    console.log(err);
  });

let getData = html => {
  let data = [];
  const $ = cheerio.load(html);

  let price = $('span.priceWrapper-3PT2D-PK').find('span.highlight-2GhssDiZ.price-3PT2D-PK').text();
  let currency = $('span.priceWrapper-3PT2D-PK').find('span.currency-3PT2D-PK').text();
  if (price) {
    data.push({
      price: price,
      currency: currency
    });
  }

  return data;
}