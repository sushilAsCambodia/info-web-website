import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/http';
export const getAnnouncement = createAsyncThunk(
    "announcement/list",
    async ({ params = {}, callback }) => {
      try {
       const response = await api.get('/ads/announcements/announcementAll/paginate',params);
        const {status} = response;
        const data = {data:response && response.data && response.data.data.data &&  response.data.data.data ? response.data.data.data : []};
        data['status_code'] = status;
        data['current_page'] = response.data && response.data.data.data &&  response.data.data.current_page ? response.data.data.current_page : 0  ;
        data['per_page'] = response.data && response.data.data.data &&  response.data.data.per_page ? response.data.data.per_page : 0  ;
        data['last_page'] = response?.data?.data?.last_page;

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
