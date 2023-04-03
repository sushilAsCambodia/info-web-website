import Layout from '@/layouts/navigateLayout'
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';

const JournalDetail = () => {
    const { t, i18n } = useTranslation();
    return <>
        <Link href="">{t('home')}</Link>
    </>
};
JournalDetail.getLayout = function getLayout(page) {
    const router = useRouter();
    return (
        <Layout 
            title="Journal" 
            lead={<IconButton
            onClick={() => router.back()}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }} >
            <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.13716 0.700943L0.837158 7.00001L7.13716 13.2991L8.45528 11.9509L4.44185 7.93751H23.25V6.06251H4.44091L8.45528 2.04907L7.13716 0.700943Z" fill="white" />
            </svg>
            </IconButton>}
            >
            {page}
        </Layout>
    )
}

export default JournalDetail;