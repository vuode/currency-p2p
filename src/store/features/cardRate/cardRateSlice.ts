import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  CardRate,
  CardRateGetConfig,
  loadCardRate,
} from '../../../api/loadCardRate';
import { FetchingStatus } from '../../../common/types';

type CardRateState = {
  status: FetchingStatus;
  rate: CardRate;
};

const initialState: CardRateState = {
  status: FetchingStatus.Init,
  rate: null,
};

export const fetchCardRate = createAsyncThunk(
  'cardRate/fetch',
  async (config: CardRateGetConfig) => {
    return loadCardRate(config);
  },
);

const cardRateSlice = createSlice({
  name: 'cardRate',
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardRate.pending, (state) => {
      state.status = FetchingStatus.Loading;
      state.rate = null;
    });
    builder.addCase(fetchCardRate.rejected, (state) => {
      state.status = FetchingStatus.Error;
      state.rate = null;
    });
    builder.addCase(fetchCardRate.fulfilled, (state, { payload }) => {
      state.status = payload ? FetchingStatus.Success : FetchingStatus.Error;
      state.rate = payload;
    });
  },
});

export default cardRateSlice.reducer;
