const initialState = { 
    status: 'idle',    
    loading:false,    
    footballScheduleList:[],
    footballEndMatchList:[],
    footballCompetitiomList:[],
    competitions:[],
    footballMatchListFavorite:[],
    footballLiveScoreList:[]
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
          footballScheduleList: action?.payload?.data,
          current_page:action?.payload?.current_page,
          per_page:action?.payload?.per_page,
          last_page:action?.payload?.last_page,
          competitions:action?.payload?.competition,
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
        case 'football/favorite/pending':
          return {
            ...state, 
            status:'pending',
            loading: true
          };
        case 'football/favorite/fulfilled':       
          return {
            ...state,         
            footballMatchListFavorite: action?.payload?.data,
            current_page:action?.payload?.current_page,
            per_page:action?.payload?.per_page,
            last_page:action?.payload?.last_page,
            competitions:action?.payload?.competition,
            status:'completed',
            loading: false
          };
        case 'football/favorite/rejected':
          return {
            ...state, 
            status:'failed',
            latest:[],
            loading: false
          };       
        case 'football/endmatch/pending':
          return {
            ...state, 
            status:'pending',
            loading: true
          };
        case 'football/endmatch/fulfilled':         
          return {
            ...state,           
            footballEndMatchList: action?.payload?.data,
            current_page:action?.payload?.current_page,
            per_page:action?.payload?.per_page,
            last_page:action?.payload?.last_page,
            competitions:action?.payload?.competition,
            status:'completed',
            loading: false
          };
        case 'football/endmatch/rejected':
          return {
            ...state, 
            status:'failed',
            latest:[],
            loading: false
          };    
          
          case 'football/competition/pending':
            return {
              ...state, 
              status:'pending',
              loading: true
            };
          case 'football/competition/fulfilled':         
            return {
              ...state,
              footballCompetitiomList: action?.payload?.data || [],
              status:'completed',
              loading: false
            };
          case 'football/competition/rejected':
            return {
              ...state, 
              status:'failed',
              latest:[],
              loading: false
            };  
            case 'football/livescore/pending':
            return {
              ...state, 
              status:'pending',
              loading: true
            };
          case 'football/livescore/fulfilled':         
            return {
              ...state,
              footballLiveScoreList: action?.payload?.data || [],
              status:'completed',
              loading: false
            };
          case 'football/livescore/rejected':
            return {
              ...state, 
              status:'failed',
              latest:[],
              loading: false
            };  
            case 'add/remove/favourite/pending':
              return {
                ...initialState, 
                loading:true
              };
            case 'add/remove/favourite/rejected':
              return {
                ...state,
                status:'failed',
                loading: false
              };
            case 'add/remove/favourite/fulfilled':
              return {
                ...state,
                status:'completed',
                loading: false
              };
      
        }
    return state;
  } 
  export default FootballReducer;