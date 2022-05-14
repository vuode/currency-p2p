export enum Direction {
  TO_RUB = 'to',
  FROM_RUB = 'from',
}

export type Values = {
  fiat?: CardFiat;
  direction?: Direction;
  amount?: string | null;
};

export enum AdsFiat {
  RUB = 'RUB',
}

export enum CardFiat {
  PLN = 'PLN',
}

export enum TradeType {
  Buy = 'BUY',
  Sell = 'SELL',
}

export enum CardRateType {
  Buy = 'buy',
  Sell = 'sell',
}

export enum FetchingStatus {
  Init = 'init',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
