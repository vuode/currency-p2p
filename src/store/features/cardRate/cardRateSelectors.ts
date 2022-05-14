import { RootState } from '../..';

export const cardRateStatus = (state: RootState) => state.cardRate.status;
export const cardRateData = (state: RootState) => state.cardRate.rate;
