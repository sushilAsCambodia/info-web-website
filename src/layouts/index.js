import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import Navigate from '@/components/navigate';
import { Grid, IconButton } from '@mui/material';
import Head from 'next/head'
import { useTranslation } from 'react-i18next'; 
import DrawerComponent from '@/components/drawer'; 
const Layout = (props) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [openDrawer, setOpenDrawer] = useState({ 
        open:false,
        anchor:'bottom'
     }); 
    useEffect(() => {
        setMounted(true);
    }, []);
    const { t } = useTranslation();
    let { children } = props;  
    let title = '';
    const pages = [
        '/lottery',
        '/games',
        '/journalCardDetails',
    ];
    const innerpages = [
        '/login',
        '/register',
        '/forgotPassword',
        '/profile',
        '/profileDetail',
        '/feedback',
        '/customerService',
        '/announcement',
        '/newsCardDetails',
        '/logout',
    ];
    let height = '';
    if (router.pathname != '/') {
        height = 'calc(100vh - 112px)';
    } if (router.pathname == '/login' || router.pathname == '/register' || router.pathname == '/forgotPassword') {
        height = 'calc(100vh - 56px)';
    }
    const switchHeader = () => {
        if (router.pathname != '/') {
            if (pages.includes(router.pathname)) {
                
                return <Navigate
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
                    tail={
                        <Grid onClick={() => setOpenDrawer({open: true,anchor:'bottom'})}>
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.8333 15.8333H2.16667V6.66666H13.8333M13.8333 2.49999H13V0.833328H11.3333V2.49999H4.66667V0.833328H3V2.49999H2.16667C1.72464 2.49999 1.30072 2.67559 0.988155 2.98815C0.675595 3.30071 0.5 3.72463 0.5 4.16666V15.8333C0.5 16.2754 0.675595 16.6993 0.988155 17.0118C1.30072 17.3244 1.72464 17.5 2.16667 17.5H13.8333C14.2754 17.5 14.6993 17.3244 15.0118 17.0118C15.3244 16.6993 15.5 16.2754 15.5 15.8333V4.16666C15.5 3.72463 15.3244 3.30071 15.0118 2.98815C14.6993 2.67559 14.2754 2.49999 13.8333 2.49999ZM11.775 9.21666L10.8917 8.33333L6.825 12.4L5.05833 10.6333L4.175 11.5167L6.825 14.1667L11.775 9.21666Z" fill="white" />
                            </svg>
                        </Grid>
                    } />
            } else if (innerpages.includes(router.pathname)) {
                let title = router.pathname.replace('/', '').toLowerCase();
                return <Navigate
                    title={t(title)}
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
                />
            }
            else {
                return <Header />
            }
        }
        return;
    };
    const switchFooter = () => {
        if (router.pathname != '/') {
            if (router.pathname == '/login' ||
                router.pathname == '/register' ||
                router.pathname == '/forgotPassword') {
                return;
            } else {
                return <Footer />
            }
        }
        return;
    };

    switch (router.pathname.toLocaleLowerCase()) {
        case '/home':
            title = t('home_info_web')
            break;
        case '/lottery':
            title = t('lottery_info_web')
            break;
        case '/match':
            title = t('match_info_web')
            break;
        case '/profile':
            title = t('profile_info_web')
            break;
        case '/profiledetail':
            title = t('profile_detail_info_web')
            break;
        case '/announcement':
            title = t('announcement_info_web')
            break;
        case '/feedback':
            title = t('feedback_info_web')
            break;
        case '/customerservice':
            title = t('customer_service_info_web')
            break;
        case '/journalcarddetails':
            title = t('journal_card_details_info_web')
            break;
        case '/newscarddetails':
            title = t('news_card_details_info_web')
            break;
        case '/login':
            title = t('login_info_web')
            break;
        case '/register':
            title = t('register_info_web')
            break;
        case '/forgotpassword':
            title = t('forgot_password_info_web')
            break;
        default:
            break;
    }
    return mounted && (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" />
            </Head>
            {switchHeader()}
            <Container maxWidth="false" sx={{ bgcolor: '#fff', height: height, padding: "0px !important", overflowY: 'auto' }}>
                <main style={{height:'100%'}}>
                    {children}
                </main>
            </Container>
            {switchFooter()}
            <Grid item >
                <DrawerComponent openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/> 
            </Grid>
        </>
    );
}

export default Layout;