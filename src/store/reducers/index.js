import {combineReducers} from "redux";
import bannerReducer from "./bannerSlice";
import drawerReducer from "./drawerReducer";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import sportReducer from "./sportSlice";
import cardReducer from "./cardSlice";
import journalReducer from "./jounalSlice";
export const rootReducer = combineReducers({
    banner: bannerReducer,
    category: categoryReducer,
    user: userReducer,
    sport: sportReducer,
    journal: journalReducer,
    drawer:drawerReducer,
    card:cardReducer,
});
