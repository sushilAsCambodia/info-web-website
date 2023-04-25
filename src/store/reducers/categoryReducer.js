const initialState = { 
  status: 'idle',
  categories:[],
  loading: true
} 
const CategoryReducer = (state = initialState, action) => {
  switch (action.type) { 
    case 'category/list/fulfilled':
      return {
        ...state,
        categories: action.payload?.data?.category || [],
        status:'completed',
        loading: false
      };
  }
  return state;
}
export default CategoryReducer;