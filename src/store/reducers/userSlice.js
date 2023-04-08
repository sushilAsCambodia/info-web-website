import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/services/http';
import utils from '@/common/utils';
var initialState = { 
    status: 'idle',
    profile: typeof window != 'undefined' && window.localStorage.getItem('profile') ? JSON.parse(window.localStorage.getItem('profile')) : {},
    isLogin: typeof window != 'undefined' && window.localStorage.getItem(utils.tokenKey) ? true : false
}
export const login = createAsyncThunk(
    "customers/login",
    async ({ body = {}, callback }, { getState, dispatch }) => {
      try {
        const response = await api.post('/auth/customers/login',body);
        const { data, status } = response;
        data['status_code'] = status;
        if(typeof window !='undefined') { 
          if(data.data[utils.tokenKey]) {
            window.localStorage.setItem(utils.tokenKey,data.data[utils.tokenKey] || '');
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
  async ({ body = {}, callback }, { getState, dispatch }) => {
    try {
      const response = await api.post('/auth/customers/register',body);
      const { data, status } = response;
      data['status_code'] = status;
      if(typeof callback == 'function') {
        callback(data);
      }
      if(typeof window !='undefined') {
        if(data.data[utils.tokenKey]) {
          window.localStorage.setItem(utils.tokenKey,data.data[utils.tokenKey] || '');
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
  async ({ body = {}, callback, auth = false }, { getState, dispatch }) => {
    try {
      const response = await api.post('/auth/customers/logout',body, auth);
      const { data, status } = response;
      data['status_code'] = status;
      if(typeof callback == 'function') {
        callback(data);
      }
      if(typeof window !='undefined') {
        dispatch(userSlice.actions.setLogout);
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
const userSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setUser(state,action) {
      state.profile  = action.payload;
    },  
    setLogin(state,action) {
      state.isLogin  = action.payload;
    },  
    setLogout(state,action) {
      state.isLogin  = false;
      state.profile  = {};
      window.localStorage.removeItem(utils.tokenKey);
      window.localStorage.removeItem('profile');
    }, 
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
        login.fulfilled,
      (state, action) => {
        const {data} = action.payload;
        if(data && data.customer) {
          state.profile = data && data.customer ? data.customer : {};
          window.localStorage.setItem('profile',JSON.stringify(state.profile));
          state.isLogin = true;
          state.status = "completed";
        }
      },
    );
  },
})

export const { setUser, setLogout } = userSlice.actions
export default userSlice.reducer