const initialState = { 
  status: 'idle',
  advertises:[],
  loading:false
} 
const AdvertiseReducer =  (state = initialState, action) => {
  switch (action.type) {
    case 'advertise/list/pending':
      return {
        ...state, 
        status:'pending',
        loading: true
      };
    case 'advertise/list/fulfilled':
      let ads = action.payload?.data || [];
      if(ads.length > 0) {
        // sort DESC
        ads.sort(function(a, b) {
          return  parseInt(a.sorting) - parseInt(b.sorting);
        });
      }
      return {
        ...state,
        advertises: ads,
        status:'completed',
        loading: false
      };
    case 'advertise/list/rejected':
      return {
        ...state, 
        status:'failed',
        advertises:[],
        loading: false
      };
  }
  return state;
} 
export default AdvertiseReducer;