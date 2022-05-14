import { AdsGetConfig } from '../api/loadAds';
import { CardRateGetConfig } from '../api/loadCardRate';
import {
  AdsFiat,
  CardFiat,
  CardRateType,
  Direction,
  TradeType,
  Values,
} from '../common/types';

export const configure = ({
  fiat = CardFiat.PLN,
  direction = Direction.FROM_RUB,
  amount = null,
}: Values) => {
  const cardRate: CardRateGetConfig = {
    exchangeType:
      direction === Direction.TO_RUB ? CardRateType.Buy : CardRateType.Sell,
    fiat,
  };
  const ads: AdsGetConfig = {
    tradeType: direction === Direction.TO_RUB ? TradeType.Sell : TradeType.Buy,
    fiat: AdsFiat.RUB,
    payType: 'Tinkoff',
    amount,
  };

  return { cardRate, ads };
};
