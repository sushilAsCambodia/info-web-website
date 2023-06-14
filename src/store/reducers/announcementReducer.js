const initialState = { 
    status: 'idle',
    announcements:[],
    loading: true,
    current_page:1,
    per_page:10,
    total:0

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
          current_page:action?.payload?.current_page,
          per_page:action?.payload?.per_page,
          total:action?.payload?.total,
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