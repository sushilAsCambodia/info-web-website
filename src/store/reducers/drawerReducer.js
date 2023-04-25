const initialState = {
  drawer:false
};
const DrawerReducer = (state = initialState, action) => {
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
export default DrawerReducer;
  