export default interface Token {
  [key: string]: any;
  id: string;
  name: string;
  symbol: string;
  sector: string;
  price: string;
  marketCap: string;
  pe: string;
  lt: string;
  eps: string;
  roa: string;
  roe: string;
  roi: string;
  payout: string;
  volatility: string;
  date: string;
  expectedPrice?: number;
}
