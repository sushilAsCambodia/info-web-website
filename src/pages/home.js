import FullSilder from '@/components/home/FullSilder';
import NewsJournalTabs from '@/components/home/NewsJournalTabs';
import News from '@/components/home/NewsJournalTabs';
import Layout from '@/layouts'
import { useTranslation } from 'react-i18next';
const Home = () => {
    const { t, i18n } = useTranslation();
    return <>
<NewsJournalTabs />
 {/* <FullSilder />       */}
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