const initialState = { 
  status: 'idle',
  banners:[],
  loading: true
}
export default function (state = initialState, action) {
  switch (action.type) {
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