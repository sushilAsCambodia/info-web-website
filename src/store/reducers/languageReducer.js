const initialState = { 
  loading:false,
  language:[],
  languageKh:[],
  languageCh:[]
} 
const LanguageReducer =  (state = initialState, action) => {
  switch (action.type) {   
    case 'loadLanguage':
      return {
        ...state,
        language: action.payload?.data || [],
        status:'completed',
        loading: false
      };
      case 'loadLanguageKh':
      return {
        ...state,
        languageKh: action.payload?.data || [],
        status:'completed',
        loading: false
      };
      case 'loadLanguageCh':
      return {
        ...state,
        languageCh: action.payload?.data || [],
        status:'completed',
        loading: false
      };
    
  }
  return state;
} 
export default LanguageReducer;