import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/http'
const initialState = { 
    status: 'idle',
    journals:[],
}
export const getJournalSync = createAsyncThunk(
    "journal/getJournalSync",
    async ({ params = {}, callback }, { getState, dispatch }) => {
      try {
        const response = await api.get('/journal',params);
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
const jouralSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setJournal(state,action) {
      state.journals  = action.payload;
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(getJournalSync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
        getJournalSync.fulfilled,
      (state, action) => {
        const {data} =  action.payload;
        state.journals = data;
        state.status = "completed";
      },
    );
  },
})

export const { setJournal } = jouralSlice.actions
export default jouralSlice.reducer