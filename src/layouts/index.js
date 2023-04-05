import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import Navigate from '@/components/navigate';
import { Grid, IconButton } from '@mui/material'; 
const Layout =({children}) => {
    
    const pages = [
        '/lottery',
        '/games',
        '/JournalCardDetails',
        
    ];
    const innerpages = [
        '/Login',
        '/Register',
        '/ForgotPassword',
        '/Profile',
        '/ProfileDetail',
        '/Feedback',
        '/CustomerService',
        '/Announcement',
        '/NewsCardDetails',
        '/Logout',
        
       
        
    ];
    const router = useRouter();
    let height = '';
    if(router.pathname != '/') {
        height = 'calc(100vh - 112px)';
    }if (router.pathname == '/Login' || router.pathname == '/Register' || router.pathname == '/ForgotPassword') {
        height = 'calc(100vh - 56px)';
    }
    console.log("router", router)
    const switchHeader = () => {
        if(router.pathname!='/') {
            if(pages.includes(router.pathname)) {
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
                    <Grid onClick={() => {console.log("hello")}}>
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8333 15.8333H2.16667V6.66666H13.8333M13.8333 2.49999H13V0.833328H11.3333V2.49999H4.66667V0.833328H3V2.49999H2.16667C1.72464 2.49999 1.30072 2.67559 0.988155 2.98815C0.675595 3.30071 0.5 3.72463 0.5 4.16666V15.8333C0.5 16.2754 0.675595 16.6993 0.988155 17.0118C1.30072 17.3244 1.72464 17.5 2.16667 17.5H13.8333C14.2754 17.5 14.6993 17.3244 15.0118 17.0118C15.3244 16.6993 15.5 16.2754 15.5 15.8333V4.16666C15.5 3.72463 15.3244 3.30071 15.0118 2.98815C14.6993 2.67559 14.2754 2.49999 13.8333 2.49999ZM11.775 9.21666L10.8917 8.33333L6.825 12.4L5.05833 10.6333L4.175 11.5167L6.825 14.1667L11.775 9.21666Z" fill="white"/>
                </svg>
                    </Grid>
                }/>
            }else if(innerpages.includes(router.pathname)) {
                return <Navigate
                title={router.pathname.replace('/','')}

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
                return <Header/>
            }
        }
        return '';
    };
    const switchFooter = () => {
        if(router.pathname!='/') {
            if (router.pathname == '/Login' || router.pathname == '/Register' || router.pathname == '/ForgotPassword') {
                
                return  ;
            }else{
                return <Footer/>
            }
        } 
        return '';
    };
    
    return(
        <>
            {switchHeader()}
                <Container maxWidth="false" sx={{ bgcolor: '#fff', height: height, padding:"0px !important" }}>
                    <main>
                        {children}
                    </main>
                </Container>
            {switchFooter()}
        </>
    );
}

export default Layout;