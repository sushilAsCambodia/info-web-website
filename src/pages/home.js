import Layout from '@/layouts'
import { useTranslation } from 'react-i18next';
const Home = () => {
    const { t, i18n } = useTranslation();
    return <>
        {t('home')}
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