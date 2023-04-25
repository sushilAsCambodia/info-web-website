const initialState = { 
  status: 'idle',
  news:[],
  newsDetail:{},
  loading:false,
}
const NewReducer = (state = initialState, action) => {
  switch (action.type) {

    // request get news by category
    case 'news/list-by-category/pending':
      return {
        ...state,
        news: [],
        status:'pending',
        loading: true
      };
    case 'news/list-by-category/rejected':
      return {
        ...state,
        news: [],
        status:'failed',
        loading: false
      };
    case 'news/list-by-category/fulfilled':
      return {
        ...state,
        news: action.payload?.data?.data || [],
        status:'completed',
        loading: false
      };
    // end request get news by category

    // request next page blog 
    case 'news/nextpage/list-by-category/pending':
      return {
        ...state,
        status:'pending',
        loading: true
      };
    case 'news/nextpage/list-by-category/rejected':
      return {
        ...state,
        news: [],
        status:'failed',
        loading: false
      };
    case 'news/nextpage/list-by-category/fulfilled':
      const newData = action.payload?.data?.data || [];
      return {
        ...state,
        news: [...state.news,...newData],
        status:'completed',
        loading: false
      };
    // end request next page blog 

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
  }
  return state;
}
export default NewReducer;