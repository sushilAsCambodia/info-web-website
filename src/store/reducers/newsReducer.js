const initialState = { 
  status: 'idle',
  news:[],
  recentNews:{},
  mostPopularNews:[],
  newsDetail:{},
  loading:false,
  newsRecentLoading:false,
  newsPopularLoading:false,
}
const NewReducer = (state = initialState, action) => {
  switch (action.type) {

    // request get news by category
    case 'news/list-by-category/pending':
      return {
        ...state,
        status:'pending',
        loading: true
      };
    case 'news/list-by-category/rejected':
      return {
        ...state,
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
      
    // request get news
    case 'news/list/recent/pending':
      return {
        ...state,
        status:'pending',
        newsRecentLoading: true
      };
    case 'news/list/recent/rejected':
      return {
        ...state,
        status:'failed',
        newsRecentLoading: false
      };
    case 'news/list/recent/fulfilled':
      return {
        ...state,
        recentNews: action.payload?.data || {},
        status:'completed',
        newsRecentLoading: false
      };

    // request get next news
    case 'news/list/next-recent/pending':
      return {
        ...state,
        status:'pending',
        newsRecentLoading: true
      };
    case 'news/list/next-recent/rejected':
      return {
        ...state,
        status:'failed',
        newsRecentLoading: false
      };
    case 'news/list/next-recent/fulfilled':
      const d = action.payload?.data;
      d['data'] = [...state.recentNews.data,...action.payload?.data?.data||[]];
      return {
        ...state,
        recentNews: d || {},
        status:'completed',
        newsRecentLoading: false
      };

      
    // request get news
    case 'news/list/popular/pending':
      return {
        ...state,
        status:'pending',
        newsPopularLoading: true
      };
    case 'news/list/popular/rejected':
      return {
        ...state,
        status:'failed',
        newsPopularLoading: false
      };
    case 'news/list/popular/fulfilled':
      return {
        ...state,
        mostPopularNews: action.payload?.data || {},
        status:'completed',
        newsPopularLoading: false
      };
  }
  return state;
}
export default NewReducer;