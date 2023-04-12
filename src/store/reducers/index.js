import {combineReducers} from "redux";
import bannerReducer from "./bannerReducer";
import drawerReducer from "./drawerReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import newsReducer from "./newsReducer";
import cardReducer from "./cardReducer";
import journalReducer from "./journalReducer";
export default  combineReducers({
    banner: bannerReducer,
    category: categoryReducer,
    auth: authReducer,
    news: newsReducer,
    journal: journalReducer,
    drawer:drawerReducer,
    card:cardReducer,
});
