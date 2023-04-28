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


export const getNewsRecent = createAsyncThunk(
  "news/list/recent",
  async ({ params = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.get('/news/news-popularRecent',params);
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
export const getNextNewsRecent = createAsyncThunk(
  "news/list/next-recent",
  async ({ params = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.get('/news/news-popularRecent',params);
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
export const getNewsPopular = createAsyncThunk(
  "news/list/popular",
  async ({ params = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.get('/news/news-popularRecent',params);
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
export const getNextNewsPopular = createAsyncThunk(
  "news/list/next-popular",
  async ({ params = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.get('/news/news-popularRecent',params);
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