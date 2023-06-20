import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/http";
import axios from "axios";


export const getLotteryCategory = createAsyncThunk(
  "football/schedule",
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