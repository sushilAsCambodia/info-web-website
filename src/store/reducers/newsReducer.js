const initialState = { 
  status: 'idle',
  news:[],
  newsDetail:{},
  newsAll:{},
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
    case 'news/list-by-id/pending':
      return {
        ...state,
        status:'pending',
        loading: true
      };
    case 'news/list-by-id/fulfilled':
      return {
        ...state,
        status:'completed',
        newsDetail: action.payload?.data || {},
        loading: false
      };
    case 'news/list-by-id/rejected':
      return {
        ...state,
        status:'failed',
        newsDetail: {},
        loading: false
      };
    case 'news/All/fulfilled':
      return {
        ...state,
        status:'completed',
        newsAll: action.payload?.data || [],
        loading: false
      };
  }
  return state;
}