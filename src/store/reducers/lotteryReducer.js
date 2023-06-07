const initialState = { 
    status: 'idle',
    latest:[],
    loading:false
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
    }
    return state;
  } 
  export default LotteryReducer;