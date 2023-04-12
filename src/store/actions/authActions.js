import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/http';
import utils from '@/common/utils';

export const login = createAsyncThunk(
    "customers/login",
    async ({ body = {}, callback }) => {
      try {
        const response = await api.post('/auth/customers/login',body);
        const { data, status } = response;
        data['status_code'] = status;
        if(typeof window !='undefined') { 
          if(data.data[utils.tokenKey]) {
            Cookies.set(utils.tokenKey,data.data[utils.tokenKey] || '');
          }
        } 
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
export const register = createAsyncThunk(
  "customers/register",
  async ({ body = {}, callback }) => {
    try {
      const response = await api.post('/auth/customers/register',body);
      const { data, status } = response;
      data['status_code'] = status;
      if(typeof callback == 'function') {
        callback(data);
      }
      if(typeof window !='undefined') {
        if(data.data[utils.tokenKey]) {
          Cookies.set(utils.tokenKey,data.data[utils.tokenKey] || '');
        }
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
export const logout = createAsyncThunk(
  "customers/logout",
  async ({ body = {}, callback, auth = false }) => {
    try {
      const response = await api.post('/auth/customers/logout',body, auth);
      const { data, status } = response;
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