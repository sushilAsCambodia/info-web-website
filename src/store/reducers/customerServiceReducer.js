const initialState = { 
    status: 'idle',
    loading:false,
    data:[]
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'customer-service-settings/list/pending':
      return {
        ...initialState, 
        loading:true,
        data:[]
      };
    case 'customer-service-settings/list/rejected':
      return {
        ...state,
        status:'failed',
        loading: false,
        data:[]
      };
    case 'customer-service-settings/list/fulfilled':
      return {
        ...state,
        status:'completed',
        loading: false,
        data: action.payload?.data || [],
      };
  }
  return state;
}