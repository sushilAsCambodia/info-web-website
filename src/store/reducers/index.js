import {combineReducers} from "redux";
import bannerReducer from "./bannerReducer";
import drawerReducer from "./drawerReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import newsReducer from "./newsReducer";
import advertiseReducer from "./advertiseReducer";
import languageReducer from "./languageReducer";
import journalReducer from "./journalReducer";
import feedbackReducer from "./feedbackReducer";
import customerServiceReducer from "./customerServiceReducer";
import LotteryReducer from "./lotteryReducer";
import announcementReducer from "./announcementReducer";
import FavouriteReducer from "./favouriteReducer";
import FootballReducer from "./footballReducer";
export default  combineReducers({
    banner: bannerReducer,
    category: categoryReducer,
    auth: authReducer,
    news: newsReducer,
    journal: journalReducer,
    drawer:drawerReducer,
    advertise:advertiseReducer,
    feedback:feedbackReducer,
    customer_service:customerServiceReducer,
    load_language:languageReducer,
    lottery: LotteryReducer,
    announcement:announcementReducer,
    favourite:FavouriteReducer,
    football:FootballReducer
});
