import JournalCardDetails from '@/pages/JournalCardDetails';
import NewsJournalTabs from '@/components/homeNews/NewsJournalTabs';
import Layout from '@/layouts'
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t, i18n } = useTranslation();
    return <>
<NewsJournalTabs />
    </>
}; 
export default Home;