export default (stocks) => {
  return stocks.map((stock) => {
    const id = stock.id;
    const newStock = stock.toObject();
    newStock.id = id;
    newStock.date = stock.date.toISOString().replace('T', ' ').split('.')[0];
    delete newStock._id;
    delete newStock.__v;
    delete newStock.owner;
    return newStock;
  });
};
