import {combineReducers} from "redux";
import bannerReducer from "./bannerReducer";
import drawerReducer from "./drawerReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import newsReducer from "./newsReducer";
import cardReducer from "./cardReducer";
import journalReducer from "./journalReducer";
import feedbackReducer from "./feedbackReducer";
import customerServiceReducer from "./customerServiceReducer";
export default  combineReducers({
    banner: bannerReducer,
    category: categoryReducer,
    auth: authReducer,
    news: newsReducer,
    journal: journalReducer,
    drawer:drawerReducer,
    card:cardReducer,
    feedback:feedbackReducer,
    customer_service:customerServiceReducer,
});
