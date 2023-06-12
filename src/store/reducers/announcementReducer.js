const initialState = { 
    status: 'idle',
    announcements:[],
    loading: true
  } 
  const announcementReducer = (state = initialState, action) => {
    switch (action.type) { 
      case 'announcement/list/pending':
        return {
          ...state,
          announcements: [],
          status:'pending',
          loading: true
        };
      case 'announcement/list/fulfilled':
        return {
          ...state,
          announcements: action?.payload?.data,
          status:'completed',
          loading: false
        };
        case 'announcement/list/rejected':
            return {
              ...state, 
              status:'failed',
              announcements:[],
              loading: false
            };
        }
    return state;
  }
  export default announcementReducer;