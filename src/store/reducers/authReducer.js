import Cookies from 'js-cookie';
import utils from '@/common/utils';
const initialState = {
  status: 'idle',
  customer: typeof window != 'undefined' && window.localStorage.getItem('customer') ? JSON.parse(window.localStorage.getItem('customer')) : {},
  isLogin: typeof window != 'undefined' && Cookies.get(utils.tokenKey) ? true : false,
  loading: false
}
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    // login block
    case 'customers/login/pending':
      return {
        ...state,
        loading: true,
        status: 'pending'
      }
    case 'customers/login/fulfilled':
      const customer = action.payload.data?.customer || {};
      let isLogin = false;
      if([200,201,202,203,204].includes(action.payload.status_code)) {
        Cookies.set(utils.tokenKey,action.payload?.data[utils.tokenKey] || '');
        window.localStorage.setItem('customer', JSON.stringify((customer)));
        isLogin = true;
      }
      return {
        ...state,
        customer: customer,
        loading: false,
        isLogin: isLogin,
        status: 'completed',
      };
    // end login block

    // register block
    case 'customers/register/pending':
      return {
        ...state,
        loading: true,
        status: 'pending',
      };
    case 'customers/register/fulfilled':
      const initState = {
        ...state,
        loading: false,
        isLogin: false,
        status: 'completed',
      };
      if(action.payload) {
        const data = action.payload?.data || {};
        if(Object.keys(data).length > 0) {
          const c = data?.customer;
          const t = data?.token || '';
          if(Object.keys(c).length) {
            Cookies.set(utils.tokenKey,t);
            window.localStorage.setItem('customer', JSON.stringify((c)));
            initState.customer = c;
            initState.isLogin = true;
          }
        }
      }
      return initState;
    // end register block

    // logout block
    case 'customers/logout/rejected':
      window.localStorage.removeItem('customer');
      Cookies.remove(utils.tokenKey);
      return {
        customer: {},
        loading: false,
        isLogin: false,
        status: 'completed',
      };
    case 'customers/logout/fulfilled':
      window.localStorage.removeItem('customer');
      Cookies.remove(utils.tokenKey);
      return {
        customer: {},
        loading: false,
        isLogin: false,
        status: 'completed',
      };
    // end logout block

    // update profile block
    case 'customers/update-nickname/pending':
      return {
        ...state,
        loading: true,
        status: 'pending'
      };
    // update profile block
    case 'customers/update-nickname/rejected':
      return {
        ...state,
        loading: false,
        status: 'failed'
      };
    case 'customers/update-nickname/fulfilled':
      const stateData = {
        ...state,
        loading: false,
        status: 'completed',
      };
      if ([200, 201, 202, 203, 204].includes(action.payload?.status_code)) {
        const c = action.payload?.data || {};
        window.localStorage.setItem('customer', JSON.stringify((c)));
        stateData['customer'] = c; 
      } 
      return stateData;
    // end update profile block
    
    // update password block
    case 'customers/update-password/pending':
      return {
        ...state,
        loading: true,
        status: 'pending'
      };
    case 'customers/update-password/fulfilled':
      return {
        ...state,
        loading: false,
        status: 'completed',
      };
    // end update password block
    // update profile photo block
    case 'customers/update-profile/pending':
      return {
        ...state,
        loading: true,
        status: 'pending'
      };
    case 'customers/update-profile/fulfilled':
      const st = {
        ...state,
        loading: false,
        status: 'completed',
      };
      if ([200, 201, 202, 203, 204].includes(action.payload?.status_code)) {
        const c = action.payload?.data || {};
        window.localStorage.setItem('customer', JSON.stringify((c)));
        st['customer'] = c; 
      } 
      return st; 
    // end profile photo block
  }
  return state;
} 
export default AuthReducer;