import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/http'
import i18n from '@/common/i18n';
const initialState = { 
    status: 'idle',
    categories:[]
}
export const getCategorySync = createAsyncThunk(
    "category/getCategorySync",
    async ({ params = {}, callback }, { getState, dispatch }) => {
      try {
        console.log(i18n);
        const response = await api.get('/news/categories/all?lang_id=1',params);
        const {data, status} = response;
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
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state,action) {
      state.categories  = action.payload;
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(getCategorySync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
        getCategorySync.fulfilled,
      (state, action) => {
        const {data} =  action.payload;
        state.categories = data.category;
        state.status = "completed";
      },
    );
  },
})

export const { setCategory } = categorySlice.actions
export default categorySlice.reducer