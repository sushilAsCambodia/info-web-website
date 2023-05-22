const initialState = { 
  status: 'idle',
  categories:[],
  loading: true
} 
const CategoryReducer = (state = initialState, action) => {
  switch (action.type) { 
    case 'category/list/fulfilled':
      let categories = action.payload?.data?.category || [];
      if(categories.length > 0) {
        // sort DESC
        categories = categories.sort(function(a, b) {
          return  parseInt(b.sorting) - parseInt(a.sorting);
        }).filter(cat => cat.news_bind != null);
      }
      return {
        ...state,
        categories: categories,
        status:'completed',
        loading: false
      };
  }
  return state;
}
export default CategoryReducer;