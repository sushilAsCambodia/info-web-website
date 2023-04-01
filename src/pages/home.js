import Layout from '@/layouts'
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
const Home = () => {
    const { t, i18n } = useTranslation();
    return <>
        <Link as="/journal-detial" href="/journalDetial">{t('home')}</Link>
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