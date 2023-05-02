const initialState = { 
  loading:false,
  language:[]

} 
const LanguageReducer =  (state = initialState, action) => {  
  switch (action.type) {   
    case 'loadLanguage':
      return {
        ...state,
        language: action.payload,
        status:'completed',
        loading: false
      };      
    
  }
  return state;
} 
export default LanguageReducer;