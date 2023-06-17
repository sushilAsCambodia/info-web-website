const initialState = { 
    status: 'idle',
    latest:[],
    loading:false,
    lotteryResults:[],
    lotteryCategories:[],
    lotteryHistories:{},
    loading_history:false,
    lotteryResultByID:[],
    lotteryHistoriesAll:[]
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
      
        case 'lottery/history/pending':
        return {
          ...state,
          lotteryHistories: {},
          status:'pending',
          loading_history: true
        };
      case 'lottery/history/fulfilled':
        return {
          ...state,
          lotteryHistories: action?.payload?.data || {},
          status:'completed',
          loading_history: false
        };
      case 'lottery/history/rejected':
        return {
          ...state,
          status:'failed',
          loading_history: false
        };

        case 'lottery/result-by-categoryId/pending':
          return {
            ...state,
            lotteryResultByID: {},
            status:'pending',
            loading_history: true
          };
        case 'lottery/result-by-categoryId/fulfilled':
          return {
            ...state,
            lotteryResultByID: action?.payload?.data || {},
            status:'completed',
            loading_history: false
          };
        case 'lottery/result-by-categoryId/rejected':
          return {
            ...state,
            status:'failed',
            loading_history: false
          };
   
          case 'lottery/history/all/fulfilled':
            return {
              ...state,
              lotteryHistoriesAll: action?.payload?.data || {},
              status:'completed',
              loading_history: false
            };
        }
    return state;
  } 
  export default LotteryReducer;