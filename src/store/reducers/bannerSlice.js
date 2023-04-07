import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/http'
const initialState = { 
  status: 'idle',
  banners:[]
}
export const getBannerSync = createAsyncThunk(
    "banner/getBannerSync",
    async ({ params = {}, callback }, { getState, dispatch }) => {
      try {
        const response = await api.get('/banner',params);
        const {data,status} = response;
        data['status_code'] = status;
        if(typeof callback == 'function') {
          callback(data);
        }
        return data;
      } catch (error) {
        const {status, data} = error.response;
        data['status_code']  = status;
        if(typeof callback == 'function') {
          callback(data);
        }
        return data;
      }
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
        const {data} =  action.payload;
        state.banners = data;
        state.status = "completed";
      },
    );
  },
})

export const { setBanner } = bannerSlice.actions
export default bannerSlice.reducer