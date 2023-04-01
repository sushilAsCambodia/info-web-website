import Layout from '@/layouts/navigateLayout'
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
const JournalDetail = () => {
    const { t, i18n } = useTranslation();
    return <>
        <Link href="">{t('home')}</Link>
    </>
};
JournalDetail.getLayout = function getLayout(page) {
    return (
        <Layout title="Journal">
            {page}
        </Layout>
    )
}

export default JournalDetail;