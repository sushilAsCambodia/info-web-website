import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/http";
import axios from "axios";


export const getScheduleList = createAsyncThunk(
  "football/schedule",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get('lotto/data44-aistat/match-schedules', params);
      console.log("response", response && response.data && response.data.data)
      console.log("paramsparams",params && params.competition_ids)
      // const { data, status } = response;
      // data["status_code"] = status;      
      const {status} = response;
      const data = {data:response && response.data && response.data.data && response.data.data.data && response.data.data.data.data? response.data.data.data.data : []};
      data['status_code'] = status;
      data['current_page'] = response.data && response.data.data.data &&  response.data.data.data.current_page ? response.data.data.data.current_page : 0  ;
      data['per_page'] = response.data && response.data.data.data &&  response.data.data.data.per_page ? response.data.data.data.per_page : 0  ;
      data['last_page'] = response?.data?.data?.data?.last_page;
      data['competition'] = response?.data?.data?.competition;     
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    } catch (error) {
      const { status, data } = error.response;
      data["status_code"] = status;
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    }
  }
);

export const getMatchEndList = createAsyncThunk(
  "football/endmatch",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get('lotto/data44-aistat/match-schedules', params);
      console.log("response", response && response.data && response.data.data)
      console.log("paramsparams",params && params.competition_ids)
      // const { data, status } = response;
      // data["status_code"] = status;      
      const {status} = response;
      const data = {data:response && response.data && response.data.data && response.data.data.data && response.data.data.data.data? response.data.data.data.data : []};
      data['status_code'] = status;
      data['current_page'] = response.data && response.data.data.data &&  response.data.data.data.current_page ? response.data.data.data.current_page : 0  ;
      data['per_page'] = response.data && response.data.data.data &&  response.data.data.data.per_page ? response.data.data.data.per_page : 0  ;
      data['last_page'] = response?.data?.data?.data?.last_page;
      data['competition'] = response?.data?.data?.competition;     
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    } catch (error) {
      const { status, data } = error.response;
      data["status_code"] = status;
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    }
  }
);

export const getMatchListFavorite = createAsyncThunk(
  "football/favorite",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get('lotto/data44-aistat/match-schedules', params);
      console.log("response", response && response.data && response.data.data)
      console.log("paramsparams",params && params.competition_ids)
      // const { data, status } = response;
      // data["status_code"] = status;      
      const {status} = response;
      const data = {data:response && response.data && response.data.data && response.data.data.data && response.data.data.data.data? response.data.data.data.data : []};
      data['status_code'] = status;
      data['current_page'] = response.data && response.data.data.data &&  response.data.data.data.current_page ? response.data.data.data.current_page : 0  ;
      data['per_page'] = response.data && response.data.data.data &&  response.data.data.data.per_page ? response.data.data.data.per_page : 0  ;
      data['last_page'] = response?.data?.data?.data?.last_page;
      data['competition'] = response?.data?.data?.competition;     
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    } catch (error) {
      const { status, data } = error.response;
      data["status_code"] = status;
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    }
  }
);
export const getMatchLiveScoreList = createAsyncThunk(
  "football/livescore",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get('lotto/data44-aistat/match-live-score', params);
      const { data, status } = response;
      data["status_code"] = status;
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    } catch (error) {
      const { status, data } = error.response;
      data["status_code"] = status;
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    }
  }
);

export const getCompetitionList = createAsyncThunk(
  "football/competition",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get('lotto/data44-aistat/competition-group-by-country', params);
      const { data, status } = response;
      data["status_code"] = status;
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    } catch (error) {
      const { status, data } = error.response;
      data["status_code"] = status;
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    }
  }
);
export const addRemoveFavourite = createAsyncThunk(
  "add/remove/favourite",
  async ({ body = {}, callback }) => {
    try {
      const response = await api.post('lotto/favorites/store', body, true);
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