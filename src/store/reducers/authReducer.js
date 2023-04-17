import Cookies from 'js-cookie';
import utils from '@/common/utils';
const initialState = {
  status: 'idle',
  customer: typeof window != 'undefined' && window.localStorage.getItem('customer') ? JSON.parse(window.localStorage.getItem('customer')) : {},
  isLogin: typeof window != 'undefined' && Cookies.get(utils.tokenKey) ? true : false,
  loading: false
}
export default function (state = initialState, action) {
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
      window.localStorage.setItem('customer', JSON.stringify((customer)));
      return {
        ...state,
        customer: customer,
        loading: false,
        isLogin: true,
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
      return {
        ...state,
        loading: false,
        isLogin: false,
        status: 'completed',
      };
    // end register block

    // logout block
    case 'customers/logout/fulfilled':
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('customer');
        Cookies.remove(utils.tokenKey);
      }
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