const initialState = { 
    status: 'idle',
    latest:[],
    loading:false,
    lotteryResults:[],
    lotteryCategories:[]
  } 
  const LotteryReducer =  (state = initialState, action) => {
    switch (action.type) {
      case 'lottery/latest/pending':
        return {
          ...state, 
          status:'pending',
          loading: true
        };
      case 'lottery/latest/fulfilled':
        let latest = action?.payload || [];
        
        return {
          ...state,
          latest: latest,
          status:'completed',
          loading: false
        };
      case 'lottery/latest/rejected':
        return {
          ...state, 
          status:'failed',
          latest:[],
          loading: false
        };
      
      case 'lottery/category/fulfilled':
        return {
          ...state,
          lotteryCategories:  action?.payload?.data || [],
          status:'completed',
          loading: false
        };
      case 'lottery/result-by-category/pending':
        return {
          ...state,
          lotteryResults: [],
          status:'pending',
          loading: true
        };
      case 'lottery/result-by-category/fulfilled':
        return {
          ...state,
          lotteryResults:  action?.payload?.data || [],
          status:'completed',
          loading: false
        };
      case 'lottery/result-by-category/rejected':
        return {
          ...state,
          status:'failed',
          loading: false
        };
    }
    return state;
  } 
  export default LotteryReducer;