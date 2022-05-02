import Token from 'src/types/Token';

export const isTickerEqual = (ticker1: Token, ticker2: Token): boolean => {
  return ticker1.symbol === ticker2.symbol;
};

export const isTickerListContainTicker = (
  tickerList: Token[],
  ticker: Token,
): boolean => {
  return tickerList.some((internalTicker) =>
    isTickerEqual(internalTicker, ticker),
  );
};
