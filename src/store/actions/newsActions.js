import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/http';
export const getNewsByCategory = createAsyncThunk(
  "news/list-by-category",
  async ({ params = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.get('/news/news/all',params);
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