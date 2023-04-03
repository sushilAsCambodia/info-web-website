import FullSilder from '@/components/home/FullSilder';
import NewsJournalTabs from '@/components/home/NewsJournalTabs';
import News from '@/components/home/NewsJournalTabs';
import Layout from '@/layouts'
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
const Home = () => {
    const { t, i18n } = useTranslation();
    return <>
<NewsJournalTabs />
 {/* <FullSilder />       */}
    </>
}; 
export default Home;