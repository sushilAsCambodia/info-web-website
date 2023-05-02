import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/http';
export const getLanguage = createAsyncThunk(
  "loadLanguage",
  async ({ params = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.get('/auth/locale-keys/all', params);
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

export const getLanguageKh = createAsyncThunk(
    "loadLanguageKh",
    async ({ params = {}, callback }, { getState, dispatch }) => {
      try {
        const response = await api.get('/ads/advertisements/all', params);
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

  export const getLanguageCh = createAsyncThunk(
    "loadLanguageCh",
    async ({ params = {}, callback }, { getState, dispatch }) => {
      try {
        const response = await api.get('/ads/advertisements/all', params);
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