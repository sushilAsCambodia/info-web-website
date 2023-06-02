import NewsJournalTabs from '@/components/homeNews/NewsJournalTabs';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import {getBanner} from '@/store/actions/bannerActions'
import {getAdvertise} from '@/store/actions/advertiseActions'
import {getCategory} from '@/store/actions/categoryActions'
import { useEffect } from 'react';  
import utils from '@/common/utils';
const Home = () => {
    // const {banners} = useSelector((state) => state.banner);
    const {advertises} = useSelector((state) => state.advertise);
    const {categories} = useSelector((state) => state.category); 
    // const dispatch = useDispatch();
    const {i18n} = useTranslation();
    // useEffect(() => { 
    //     // dispatch(getBanner(
    //     //     {
    //     //         params: {
    //     //             lang_id: utils.convertLangCodeToID(i18n.language)
    //     //         },
    //     //         callback:(res) => { }
    //     //     }
    //     // ));
    //     // dispatch(getAdvertise(
    //     //     {
    //     //         params: {
    //     //             lang_id: utils.convertLangCodeToID(i18n.language)
    //     //         },
    //     //         callback:(res) => { }
    //     //     }
    //     // )); 
    //     // dispatch(getCategory(
    //     //     {
    //     //         params: {lang_id: utils.convertLangCodeToID(i18n.language)},
    //     //         callback:(res) => { }
    //     //     }
    //     // ));
    // },[i18n.language]); 
    return <>
        <NewsJournalTabs  categories={categories} advertises={advertises} lang_id={utils.convertLangCodeToID(i18n.language)}/>
    </>
};
export default Home;