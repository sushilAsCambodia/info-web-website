import NewsJournalTabs from '@/components/homeNews/NewsJournalTabs';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {getBannerSync} from '@/store/reducers/bannerSlice'
import {getCardSync} from '@/store/reducers/cardSlice'
import {getCategorySync} from '@/store/reducers/categorySlice'
import { useEffect } from 'react';  
import utils from '@/common/utils';
const Home = () => {
    const {banners} = useSelector((state) => state.banner);
    const {cards} = useSelector((state) => state.card);
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
        dispatch(getCardSync(
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
        <NewsJournalTabs banners={banners} categories={categories} cards={cards} lang_id={utils.convertLangCodeToID(i18n.language)}/>
    </>
};
export default Home;