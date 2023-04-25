import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/http';

export const getNewsByCategory = createAsyncThunk(
  "news/list-by-category",
  async ({ params = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.get('/news/news/viewAll',params);
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
// for get next news data next page
export const getNextNewsByCategory = createAsyncThunk(
  "news/nextpage/list-by-category",
  async ({ params = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.get('/news/news/viewAll',params);
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

export const getNewsById = createAsyncThunk(
  "news/list-by-id",
  async ({ id, params = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.get(`/news/news-details/${id}`,params);
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

export const getNewsAll = createAsyncThunk(
  "news/All",
  async ({ params = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.get('/news/news/viewAll',params);
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