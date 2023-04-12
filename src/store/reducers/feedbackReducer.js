const initialState = { 
    status: 'idle',
    loading:false,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'feedback/create/pending':
      return {
        ...initialState, 
        loading:true
      };
    case 'feedback/create/rejected':
      return {
        ...state,
        status:'failed',
        loading: false
      };
    case 'feedback/create/fulfilled':
      return {
        ...state,
        status:'completed',
        loading: false
      };
  }
  return state;
}