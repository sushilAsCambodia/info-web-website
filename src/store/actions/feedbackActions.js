import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/http';
export const createFeedback = createAsyncThunk(
  "feedback/create",
  async ({ body = {}, callback }) => {
    try {
      const response = await api.post('/auth/feedbacks', body, true);
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