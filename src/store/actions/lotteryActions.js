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
      console.log("api error :::", error);

      const { status, data } = error.response;
      data["status_code"] = status;
      if (typeof callback == "function") {
        callback(data);
      }
      return data;
    }
  }
);