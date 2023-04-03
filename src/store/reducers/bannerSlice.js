import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/http'
const initialState = { 
    status: 'idle',
    banners:[]
}
export const getBannerSync = createAsyncThunk(
    "banner/getBannerSync",
    async ({url = '', callback }, { getState, dispatch }) => {
      console.log(callback)
      const banners = await api.get( url !='' ? url : '/banner' );
      if(typeof callback == 'function') {
        callback(banners.data);
      }
      return banners.data;
    },
);
const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setBanner(state,action) {
      state.banners  = action.payload;
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(getBannerSync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
        getBannerSync.fulfilled,
      (state, action) => {
        state.banners = action.payload;
        state.status = "completed";
      },
    );
  },
})

export const { setBanner } = bannerSlice.actions
export default bannerSlice.reducer