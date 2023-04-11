const initialState = { 
  status: 'idle',
  categories:[],
  loading: true
} 
export default function (state = initialState, action) {
  switch (action.type) { 
    case 'category/list/fulfilled':
      return {
        ...state,
        categories: action.payload?.data?.category || [],
        status:'completed',
        loading: false
      };
  }
  return state;
}