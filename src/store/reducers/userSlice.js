import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/http';
const tokenKey = 'access_token';
const initialState = { 
    status: 'idle',
    profile:{}
}
export const login = createAsyncThunk(
    "user/login",
    async ({ body = {}, callback }, { getState, dispatch }) => {
      try {
        const login = await api.post('/login',body);
        if(typeof callback == 'function') {
          callback(login.data);
        }
        if(typeof window !='undefined') {
          if(login.data[tokenKey]) {
            window.localStorage.setItem('token',login.data[tokenKey] || '');
          }
        }
        return login.data;
      } catch (error) {
        if(typeof callback == 'function') {
          callback(error?.response?.data);
        }
        return error?.response?.data;
      }
    },
);
export const register = createAsyncThunk(
  "user/register",
  async ({ body = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.post('/register',body);
      if(typeof callback == 'function') {
        callback(response.data);
      }
      if(typeof window !='undefined') {
        if(response.data[tokenKey]) {
          window.localStorage.setItem('token',response.data[tokenKey] || '');
        }
      }
      return response.data;
    } catch (error) {
      if(typeof callback == 'function') {
        callback(error?.response?.data);
      }
      return error?.response?.data;
    }
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state,action) {
      state.profile  = action.payload;
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
        login.fulfilled,
      (state, action) => {
        state.profile = action.payload;
        state.status = "completed";
      },
    );
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer