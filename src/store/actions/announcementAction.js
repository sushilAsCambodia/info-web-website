import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/http';
export const getAnnouncement = createAsyncThunk(
    "announcement/list",
    async ({ params = {}, callback }) => {
      try {
       // const response = await api.get('/ads/announcements/announcementAll',params);
       const response = await api.get('/ads/announcements/announcementAll/paginate?lang_id=1&rowsPerPage=10',params);
        //const {data, status} = response;
        const {status} = response;

        const data = {data:response && response.data && response.data.data.data &&  response.data.data.data ? response.data.data.data : []};

        data['status_code'] = status;

        console.log('data:',data);
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
