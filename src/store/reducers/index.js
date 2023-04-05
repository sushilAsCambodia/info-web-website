import {combineReducers} from "redux";
import bannerReducer from "./bannerSlice";
import drawerReducer from "./drawerReducer";
import userReducer from "./userSlice";
export const rootReducer = combineReducers({
    banner: bannerReducer,
    user: userReducer,
    drawer:drawerReducer,
});
