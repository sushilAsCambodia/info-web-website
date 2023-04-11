const initialState = { 
    status: 'idle',
    journals:[],
    loading:true,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'journal/list/pending':
      return {
        ...initialState, 
      };
    case 'journal/list/fulfilled':
      return {
        ...state,
        journals: action.payload?.data || [],
        status:'completed',
        loading: false
      };
  }
  return state;
}