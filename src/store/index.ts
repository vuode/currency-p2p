import { configureStore } from '@reduxjs/toolkit';
import ads from './features/ads/adsSlice';
import cardRate from './features/cardRate/cardRateSlice';

export const store = configureStore({
  reducer: {
    ads,
    cardRate,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
