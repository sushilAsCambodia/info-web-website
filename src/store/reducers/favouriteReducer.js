const initialState = { 
    status: 'idle',
    loading:false,
    favouriteList:[]
}
const FavouriteReducer =  (state = initialState, action) => {
  switch (action.type) {
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
      case 'list/favourite/pending':
      return {
        ...initialState, 
        loading:true,
        favouriteList:[]
      };
    case 'list/favourite/rejected':
      return {
        ...state,
        status:'failed',
        loading: false,
        favouriteList:[]
      };
    case 'list/favourite/fulfilled':
      return {
        ...state,
        status:'completed',
        loading: false,
        favouriteList:action?.payload?.data
      };
  }
  return state;
}
export default FavouriteReducer;