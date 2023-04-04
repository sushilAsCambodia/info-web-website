import {combineReducers} from "redux";
import bannerReducer from "./bannerSlice";
export const rootReducer = combineReducers({
    banner: bannerReducer
});
