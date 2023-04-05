/* eslint-disable prettier/prettier */
const initialState = {
   
    drawer:false
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case "DRAWER_MODEL":
        return {
          ...state,
          drawer: action.payload,
          loading: false,
        };
      
      default:
        return state;
    }
  }
  