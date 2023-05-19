const initialState = { 
  status: 'idle',
  banners:[],
  loading: true
}
const BannerReducer =  (state = initialState, action) => {
  switch (action.type) {
    case 'banner/list/pending':
      return {
        ...state, 
        status:'pending',
        loading: true
      };
    case 'banner/list/rejected':
      return {
        ...state, 
        status:'failed',
        banners:[],
        loading: false
      };
    case 'banner/list/fulfilled':
      let banners = action.payload?.data || [];
      if(banners.length > 0) {
        // sort DESC
        banners.sort(function(a, b) {
          return  parseInt(b.sorting) - parseInt(a.sorting);
        });
      }
      return {
        ...state,
        banners: banners,
        status:'completed',
        loading: false
      };
  }
  return state;
}
export default BannerReducer;