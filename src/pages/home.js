import NewsJournalTabs from '@/components/homeNews/NewsJournalTabs';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {getBannerSync} from '@/store/reducers/bannerSlice'
import {getCategorySync} from '@/store/reducers/categorySlice'
import { useEffect } from 'react';  
const Home = () => {
    const {banners} = useSelector((state) => state.banner);
    const {categories} = useSelector((state) => state.category); 
    const dispatch = useDispatch();
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
                params: {},
                callback:(res) => {
                    console.log(res,'callback')
                }
            }
        ));
    },[]); 
    return <>
        <NewsJournalTabs banners={banners} categories={categories}/>
    </>
};
export default Home;