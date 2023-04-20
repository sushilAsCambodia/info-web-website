const initialState = { 
  status: 'idle',
  banners:[],
  loading: true
}
export default function (state = initialState, action) {
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
      return {
        ...state,
        banners: action.payload?.data || [],
        status:'completed',
        loading: false
      };
  }
  return state;
}