import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/http';
export const getAnnouncement = createAsyncThunk(
    "announcement/list",
    async ({ params = {}, callback }) => {
      try {
        const response = await api.get('/ads/announcements/announcementAll',params);
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
