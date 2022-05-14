import axios from 'axios';

import { CardFiat, CardRateType } from '../common/types';
import { cardBuylURL, cardSellURL } from '../common/vars';

export type CardRate = string | null;

export type CardRateGetConfig = {
  exchangeType: CardRateType;
  fiat: CardFiat;
};

type CardRateResponse = {
  data: {
    assetCode: string;
    quotation: string;
  }[];
};

export const loadCardRate = async ({
  exchangeType,
  fiat,
}: CardRateGetConfig): Promise<CardRate> => {
  const url = exchangeType === CardRateType.Sell ? cardSellURL : cardBuylURL;
  const code = exchangeType === CardRateType.Sell ? fiat : 'USDT';

  const response = await axios.post<CardRateResponse>(url, {
    channels: ['card'],
    crypto: 'USDT',
    fiat,
    transactionType: exchangeType,
  });

  if (response.status === 200) {
    const entry = response.data.data.find(
      ({ assetCode }) => assetCode === code,
    );
    return entry?.quotation ?? null;
  }

  return null;
};
