import Cookies from 'js-cookie';
import utils from '@/common/utils';
const initialState = { 
  status: 'idle',
  customer: typeof window != 'undefined' && window.localStorage.getItem('customer') ? JSON.parse(window.localStorage.getItem('customer')) : {},
  isLogin: typeof window != 'undefined' && Cookies.get(utils.tokenKey) ? true : false,
  loading: true
} 
export default function (state = initialState, action) {
  switch (action.type) {
    case 'customers/login/fulfilled': 
      const customer = (({ customer }) => ({ customer }))(action.payload.data); 
      window.localStorage.setItem('customer',JSON.stringify((customer?.customer||{})));
      return {
        ...state,
        ...customer,
        loading: false,
        isLogin: true,
        status: 'completed',
      };
    case 'customers/register/fulfilled': 
      return {
        ...state,
        loading: false,
        isLogin: false,
        status: 'completed',
      };
    case 'customers/logout/fulfilled': 
      if(typeof window !=='undefined') {
        window.localStorage.removeItem('customer');
        Cookies.remove(utils.tokenKey);
      }
      return {
        customer: {},
        loading: false,
        isLogin: false,
        status: 'completed',
      };
  }
  return state;
} 