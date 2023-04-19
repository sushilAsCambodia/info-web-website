const initialState = { 
    status: 'idle',
    journals:[],
    issues:[],
    loading:false,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'journal/list/pending':
      return {
        ...initialState, 
        loading:true,
        status:'pending'
      };
    case 'journal/list/fulfilled':
      return {
        ...state,
        journals: action.payload?.data || [],
        status:'completed',
        loading: false
      };

    case 'journal/album-details/pending':
      return {
        ...initialState, 
        loading:true,
        status:'pending'
      };
    case 'journal/album-details/fulfilled':
      return {
        ...state,
        journals: action.payload?.data || [],
        status:'completed',
        loading: false
      };
    // issue block
    case 'journal/issue/list/pending':
      return {
        ...initialState, 
        loading:true,
        issues:[],
        status:'pending'
      };
    case 'journal/issue/list/fulfilled':
      return {
        ...state,
        status:'completed',
        issues: action.payload?.data || [],
        loading: false
      };
    case 'journal/issue/list/rejected':
      return {
        ...initialState, 
        loading:false,
        issues:[],
        status:'failed'
      };
    // end issue block
  }
  return state;
}