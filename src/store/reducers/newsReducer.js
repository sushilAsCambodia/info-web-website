const initialState = { 
  status: 'idle',
  news:[],
  loading:true,
}
export default function (state = initialState, action) {
  switch (action.type) { 
    case 'news/list-by-category/fulfilled':
      return {
        ...state,
        news: action.payload?.data || [],
        status:'completed',
        loading: false
      };
  }
  return state;
}