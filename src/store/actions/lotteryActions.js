import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/http";
import axios from "axios";

export const getLatestLottery = createAsyncThunk(
  "lottery/latest",
  async ({ params = {}, callback }, { getState, dispatch }) => {
    try {

      const response = await api.get("http://vip.lkag3.com/K2647fedd378626/p/10.json", params);

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

export const getLotteryCategory = createAsyncThunk(
  "lottery/category",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get('lotto/lotteryCategory/all', params);
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

export const getLotteryResultByCategory = createAsyncThunk(
  "lottery/result-by-category",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get('lotto/lotteryList/all', params);
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

export const getLotteryHistory = createAsyncThunk(
  "lottery/history",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get('lotto/lotteryResult/all', params);
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

export const getLotteryResultByCategoryId = createAsyncThunk(
  "lottery/result-by-categoryId",
  async ({ params = {}, callback }) => {
    try {
      const response = await api.get('lotto/lotteryCategory/all-with-lotto', params);
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