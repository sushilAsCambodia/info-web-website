import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/http'
const initialState = { 
    status: 'idle',
    sports:[]
}
export const getSportByCategory = createAsyncThunk(
    "sport/getSportByCategory",
    async ({ params = {}, callback }, { getState, dispatch }) => {
      try {
        const response = await api.get('/sport',params);
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
const sportSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSport(state,action) {
      state.sports  = action.payload;
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(getSportByCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
        getSportByCategory.fulfilled,
      (state, action) => {
        const {data} =  action.payload;
        state.sports = data;
        state.status = "completed";
      },
    );
  },
})

export const { setSport } = sportSlice.actions
export default sportSlice.reducer