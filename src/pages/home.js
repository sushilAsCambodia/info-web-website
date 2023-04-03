import JournalCardDetails from '@/components/homeJournal/JournalCardDetails';
import NewsJournalTabs from '@/components/homeNews/NewsJournalTabs';
import Layout from '@/layouts'
import { useTranslation } from 'react-i18next';
const Home = () => {
    const { t, i18n } = useTranslation();
    return <>
<NewsJournalTabs />
<JournalCardDetails />
    </>
};
Home.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default Home;