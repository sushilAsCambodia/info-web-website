import NewsJournalTabs from '@/components/homeNews/NewsJournalTabs';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {getBannerSync} from '@/store/reducers/bannerSlice'
import {getCategorySync} from '@/store/reducers/categorySlice'
import { useEffect } from 'react';  
import utils from '@/common/utils';
const Home = () => {
    const {banners} = useSelector((state) => state.banner);
    const {categories} = useSelector((state) => state.category); 
    const dispatch = useDispatch();
    const {i18n} = useTranslation();
    useEffect(() => { 
        dispatch(getBannerSync(
            {
                params: { fake:true },
                callback:(res) => {
                    console.log(res,'callback')
                }
            }
        ));
        dispatch(getCategorySync(
            {
                params: {lang_id: utils.convertLangCodeToID(i18n.language)},
                callback:(res) => {
                    console.log(res,'callback')
                }
            }
        ));
    },[i18n.language]); 
    return <>
        <NewsJournalTabs banners={banners} categories={categories} lang_id={utils.convertLangCodeToID(i18n.language)}/>
    </>
};
export default Home;