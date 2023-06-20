const initialState = { 
    status: 'idle',    
    loading:false,    
    footballScheduleList:[]
  } 
  const FootballReducer =  (state = initialState, action) => {
    switch (action.type) {
      case 'football/schedule/pending':
        return {
          ...state, 
          status:'pending',
          loading: true
        };
      case 'football/schedule/fulfilled':
     
        
        return {
          ...state,
          footballScheduleList: action?.payload?.data || [],
          status:'completed',
          loading: false
        };
      case 'football/schedule/rejected':
        return {
          ...state, 
          status:'failed',
          latest:[],
          loading: false
        };      
      
        }
    return state;
  } 
  export default FootballReducer;