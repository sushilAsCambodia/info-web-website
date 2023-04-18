const initialState = { 
    status: 'idle',
    journals:[],
    loading:false,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'journal/list/pending':
      return {
        ...initialState, 
        loading:true,
        status:'pending'
      };
    case 'journal/list/fulfilled':
      return {
        ...state,
        journals: action.payload?.data || [],
        status:'completed',
        loading: false
      };

    case 'journal/album-details/pending':
      return {
        ...initialState, 
        loading:true,
        status:'pending'
      };
    case 'journal/album-details/fulfilled':
      return {
        ...state,
        journals: action.payload?.data || [],
        status:'completed',
        loading: false
      };
  }
  return state;
}