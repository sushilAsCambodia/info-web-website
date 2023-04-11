const initialState = { 
  status: 'idle',
  cards:[],
  loading:true
} 
export default function (state = initialState, action) {
  switch (action.type) {
    case 'card/list/pending':
      return {
        ...initialState, 
      };
    case 'card/list/fulfilled':
      return {
        ...state,
        cards: action.payload?.data || [],
        status:'completed',
        loading: false
      };
  }
  return state;
} 