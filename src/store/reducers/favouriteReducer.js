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
  }
  return state;
}
export default FavouriteReducer;