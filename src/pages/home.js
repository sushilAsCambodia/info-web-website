import * as React from "react";
import NewsJournalTabs from '@/components/homeNews/NewsJournalTabs';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';  
import utils from '@/common/utils';
const Home = () => {
    const {advertises} = useSelector((state) => state.advertise);
    const {categories} = useSelector((state) => state.category); 
    const {i18n} = useTranslation();
    React.useEffect(() => {
        localStorage.removeItem("prepage");
      }, []);
    return  <NewsJournalTabs  categories={categories} advertises={advertises} lang_id={utils.convertLangCodeToID(i18n.language)}/>
};
export default Home;