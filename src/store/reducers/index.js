import {combineReducers} from "redux";
import bannerReducer from "./bannerSlice";
import drawerReducer from "./drawerReducer";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import sportReducer from "./sport";
export const rootReducer = combineReducers({
    banner: bannerReducer,
    category: categoryReducer,
    user: userReducer,
    sport: sportReducer,
    drawer:drawerReducer,
});
