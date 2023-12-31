import React, { useCallback, useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Navigate from '@/components/navigate';
import { Grid, IconButton } from '@mui/material';
import Head from 'next/head'
import { useTranslation } from 'react-i18next'; 
import {getLanguage} from '../store/actions/languageActions'
import { logout } from "@/store/actions/authActions";
import api from '@/services/http';
import utils from "@/common/utils";

import DrawerComponent from '@/components/drawer'; 
const Layout = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { customer } = useSelector((state) => state.auth);
    const [mounted, setMounted] = useState(false); 
    const [hash, setHash] = useState(''); 
    const [openDrawer, setOpenDrawer] = useState({ 
        open:false,
        anchor:'bottom'
    }); 
    const { t,i18n } = useTranslation();
    const langKey = useSelector((state) => state && state.load_language && state.load_language.language); 
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if(i18n.language) {
            if(i18n.language == 'kh') {
                document.documentElement.setAttribute('lang',i18n.language);
            }
        }
        dispatch(getLanguage(
            {
                params: {
                    lang_id: utils.convertLangCodeToID(i18n.language)
                },
                callback:(res) => {

    localStorage.setItem('languageKey', JSON.stringify(res))
    
                 }
            }
        ));
    },[dispatch,i18n.language])
    let { children } = props;  
    let title = '';
    const pages = [
        '/lottery',
        '/lotteryHistory',
        '/games',               
        '/match',
        '/journalCardDetails',
    ];
    const innerpages = [
        '/login',
        '/register',
        '/forgotPassword',
        '/profile',
        '/MatchDetails/[id]', 
        '/events',
        '/profileDetail',
        '/feedback',
        '/customerService',
        '/announcement',
        '/newsCardDetails',
        '/logout',
    ];
    let height = '';
    if (router.pathname != '/') {
        height = 'calc(100vh - 96px)';
    } if (router.pathname == '/login' || router.pathname == '/register' || router.pathname == '/forgotPassword') {
        height = 'calc(100vh - 40px)';
    } 
    console.log("router.pathname",router.pathname)
    const switchHeader = () => { 
        if (router.pathname != '/') {
            if (pages.includes(router.pathname)) {
                const {query} = router;
                let title = '';
                if(Object.keys(query).length > 0) {
                    // title = langKey && langKey[(query?.title || '').toLowerCase()];
                    title = ( query?.title || '').toLowerCase();
                }
                if(router.pathname == '/lottery') {
                    return <Navigate
                        // title={router.asPath.replace(router.pathname,'').replace('#','')}
                        title={langKey.lottery}
                        lead={<IconButton
                        onClick={() => router.push('/home')}
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
                }else if(router.pathname == '/lotteryHistory') {
                    return <Navigate
                        title={langKey?.history}
                        lead={<IconButton
                        onClick={() => router.push('/home')}
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
                }else if(router.pathname == '/match'){
                    return <Navigate
                    title={langKey?.match}
                    lead={<IconButton
                        onClick={() => router.push('/home')}
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
                else if(router.pathname === '/MatchDetails/[id]'){
                    return <Navigate
                    title={langKey?.match}
                    lead={<IconButton
                        onClick={() => router.push('/match')}
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
                }else if(router.pathname === '/events'){
                    return <Navigate
                    title={langKey?.match}
                    lead={<IconButton
                        onClick={() => router.push('/match')}
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
                    return <Navigate
                    title={langKey?.journal}
                    lead={<IconButton
                        onClick={() => router.push('/home')}
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
                }
                
            } else if (innerpages.includes(router.pathname)) {
                //let title = router.pathname.replace('/', '').toLowerCase();
             
                let title = langKey && langKey[router.pathname.replace('/', '').toLowerCase()];
                const onNavigate = (r) => {
                    console.log("r.pathname",r.pathname)
                    if(r.pathname === '/login' || r.pathname === '/register' || r.pathname === '/forgotPassword') {
                       r.push('/home')
                    } else if(r.pathname === '/MatchDetails/[id]' || r.pathname === '/events') {
                        // r.back();
                        r.push('/match')
                    }else {
                        // r.back();
                        r.push('/home')
                    }
                }
                return <Navigate
                    title={title}
                    lead={
                    <IconButton
                        onClick={() => onNavigate(router)}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }} >
                        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.13716 0.700943L0.837158 7.00001L7.13716 13.2991L8.45528 11.9509L4.44185 7.93751H23.25V6.06251H4.44091L8.45528 2.04907L7.13716 0.700943Z" fill="white" />
                        </svg>
                    </IconButton>
                    }
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
            title = (langKey && langKey.home_info_web)
            break;
        case '/lottery':
            title = (langKey && langKey.lottery_info_web)
            break;
        case '/match':
            title = (langKey && langKey.match_info_web)
            break;
        case '/profile':
            title = (langKey && langKey.profile_info_web)
            break;
        case '/profiledetail':
            title = (langKey && langKey.profile_detail_info_web)
            break;
        case '/announcement':
            title = (langKey && langKey.announcement_info_web)
            break;
        case '/feedback':
            title = (langKey && langKey.feedback_info_web)
            break;
        case '/customerservice':
            title = (langKey && langKey.customer_service_info_web)
            break;
        case '/journalcarddetails':
            title = (langKey && langKey.journal_card_details_info_web)
            break;
        case '/newscarddetails':
            title = (langKey && langKey.news_card_details_info_web)
            break;
        case '/login':
            title = (langKey && langKey.login_info_web)
            break;
        case '/register':
            title = (langKey && langKey.register_info_web)
            break;
        case '/forgotpassword':
            title = (langKey && langKey.forgot_password_info_web)
            break;
        default:
            break;
    }
    const handleLogout = useCallback(() => {
        dispatch(
            logout({
            callback: (res) => {
                // signOut(); // third party will refresh the page
                // use this without social login 
                router.push("/login");
            },
            auth: true,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch]);
    useEffect(() => {
        if (customer && Object.keys(customer).length > 0) {
            if (!['/login', '/register', '/forgotPassword','/match','/MatchDetails/[id]'].includes(router.pathname)) {
            api.get(`${utils.adminUrl}/auth/customers/${customer.id}/edit`, {}, true).then((result) => {
                if (result && (result.status == 200 || result.status == 201)) {
                const customer = result?.data?.data;
                if (customer && customer.status == 0) {
                    handleLogout();
                }
                }
            }).catch((err) => { });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);
    return mounted && (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" /> 
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
            </Head>
            {switchHeader()}
            <Container id="main-container-wrapper" maxWidth="false" sx={{ bgcolor: '#fff', height: height, padding: "0px !important", overflowY: 'auto' }}>
                <main style={{height:'100%',overflow:router.asPath === '/home#newsfeed' || router.asPath === '/home'?'hidden':'auto'}}>
                    {children}
                </main>
            </Container>
            {switchFooter()}
            <Grid item >
                <DrawerComponent openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/> 
            </Grid>
            <style jsx global>
          {`
            html,
            body {
              // background: #f9f9f9;
              font-size: 14px;
            }
            p,
            a {
              // font-family: 'Poppins' !important;
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            }
            p{
              color:'black'
            }
          `}
        </style>
        </>
    );
}

export default Layout;