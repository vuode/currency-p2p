export const CORSProxy = process.env.REACT_APP_CORS_PROXY ?? '';
export const payTypesURL =
  CORSProxy + process.env.REACT_APP_PAY_TYPES_URL ?? '';
export const adsURL = CORSProxy + process.env.REACT_APP_ADS_URL ?? '';
export const cardSellURL =
  CORSProxy + process.env.REACT_APP_CARD_SELL_URL ?? '';
export const cardBuylURL = CORSProxy + process.env.REACT_APP_CARD_BUY_URL ?? '';
