import NewsJournalTabs from '@/components/homeNews/NewsJournalTabs';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {getBanner} from '@/store/actions/bannerActions'
import {getCard} from '@/store/actions/cardActions'
import {getCategory} from '@/store/actions/categoryActions'
import { useEffect } from 'react';  
import utils from '@/common/utils';
const Home = () => {
    const {banners} = useSelector((state) => state.banner);
    const {cards} = useSelector((state) => state.card);
    const {categories} = useSelector((state) => state.category); 
    const dispatch = useDispatch();
    const {i18n} = useTranslation();
    useEffect(() => { 
        dispatch(getBanner(
            {
                params: { fake:true },
                callback:(res) => {
                    console.log(res,'callback')
                }
            }
        ));
        dispatch(getCard(
            {
                params: { fake:true },
                callback:(res) => {
                    console.log(res,'callback')
                }
            }
        ));
        dispatch(getCategory(
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