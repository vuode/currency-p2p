import axios from 'axios';

import { Fiat } from '../common/types';
import { cardSellURL } from '../common/vars';

type CardSellResponse = {
  data: {
    assetCode: string;
    quotation: string;
  }[];
};

export const loadCardSell = async (fiat: Fiat): Promise<string | null> => {
  const response = await axios.post<CardSellResponse>(cardSellURL, {
    channels: ['card'],
    crypto: 'USDT',
    transactionType: 'sell',
  });

  if (response.status === 200) {
    const entry = response.data.data.find(
      ({ assetCode }) => assetCode === fiat,
    );
    return entry?.quotation ?? null;
  }

  return null;
};
