import axios from 'axios';

import { AdsFiat, TradeType } from '../common/types';
import { adsURL } from '../common/vars';

export type Ad = {
  price: string;
  min: string;
  max: string;
  nickname: string;
  orderCount: number;
  finishRate: number;
};

export type AdsGetConfig = {
  tradeType: TradeType;
  fiat: AdsFiat;
  payType: string;
  amount: string | null;
};

type AdsResponse = {
  data: {
    adv: {
      price: string;
      minSingleTransAmount: string;
      maxSingleTransAmount: string;
    };
    advertiser: {
      nickName: string;
      monthOrderCount: number;
      monthFinishRate: number;
    };
  }[];
};

export const loadAds = async ({
  tradeType,
  fiat,
  payType,
  amount,
}: AdsGetConfig): Promise<Ad[] | null> => {
  const response = await axios.post<AdsResponse>(adsURL, {
    page: 1,
    rows: 10,
    payTypes: [payType],
    publisherType: null,
    asset: 'USDT',
    tradeType,
    fiat,
    transAmount: amount,
  });

  if (response.status === 200) {
    return response.data.data.map(
      ({
        adv: { price, minSingleTransAmount, maxSingleTransAmount },
        advertiser: { nickName, monthOrderCount, monthFinishRate },
      }) => ({
        price,
        min: minSingleTransAmount,
        max: maxSingleTransAmount,
        nickname: nickName,
        orderCount: monthOrderCount,
        finishRate: monthFinishRate,
      }),
    );
  }

  return null;
};
