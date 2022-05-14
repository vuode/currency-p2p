import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../../common/types';
import { Ad, AdsGetConfig, loadAds } from '../../../api/loadAds';

export type AdsState = {
  data: Ad[] | null;
  status: FetchingStatus;
};

const initialState: AdsState = {
  data: null,
  status: FetchingStatus.Init,
};

export const fetchAds = createAsyncThunk(
  'ads/fetch',
  async (config: AdsGetConfig, { dispatch }) => {
    return loadAds(config);
  },
);

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAds.pending, (state) => {
      state.status = FetchingStatus.Loading;
      state.data = null;
    });
    builder.addCase(fetchAds.rejected, (state) => {
      state.status = FetchingStatus.Error;
      state.data = null;
    });
    builder.addCase(fetchAds.fulfilled, (state, { payload }) => {
      state.status = payload ? FetchingStatus.Success : FetchingStatus.Error;
      state.data = payload;
    });
  },
});

export default adsSlice.reducer;
