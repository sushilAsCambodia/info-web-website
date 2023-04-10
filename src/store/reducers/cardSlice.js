import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/http'
const initialState = { 
  status: 'idle',
  cards:[]
}
export const getCardSync = createAsyncThunk(
    "banner/getCardSync",
    async ({ params = {}, callback }, { getState, dispatch }) => {
      try {
        const response = await api.get('/card',params);
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
const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCard(state,action) {
      state.cards  = action.payload;
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(getCardSync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
        getCardSync.fulfilled,
      (state, action) => {
        const {data} =  action.payload;
        state.cards = data;
        state.status = "completed";
      },
    );
  },
})

export const { setCard } = cardSlice.actions
export default cardSlice.reducer