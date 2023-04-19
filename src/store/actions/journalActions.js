import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/http';
export const getJournal = createAsyncThunk(
  "journal/list",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get('/journal/albums/all',params);
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

export const getJournalDetial = createAsyncThunk(
  "journal/album-details",
  async ({ id, params = {}, callback }) => {
    try {
      const response = await api.get(`/journal/albums/${id}/album-details`, params);
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

export const getIssue = createAsyncThunk(
  "journal/issue/list",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get(`/journal/albumSlavs/albumSlav-GetIssueDate`, params);
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