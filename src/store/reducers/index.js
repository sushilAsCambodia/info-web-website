import {combineReducers} from "redux";
import bannerReducer from "./bannerSlice";
import userReducer from "./userSlice";
export const rootReducer = combineReducers({
    banner: bannerReducer,
    user: userReducer
});
