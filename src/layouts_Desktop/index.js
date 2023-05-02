import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import Navigate from '@/components/navigate';
import { Grid, IconButton } from '@mui/material';
import Head from 'next/head'
import { useTranslation } from 'react-i18next';
import {useMediaQuery} from '@mui/material';

const Layout = (props) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const matches = useMediaQuery("(max-width:1535px)");
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        setMounted(true);
    }, []);
    const { t } = useTranslation();
    let { children } = props;  
    let title = '';

    let width = '';
    if (router.pathname != '') {
        width = matches ? '95%':'80%';
    } if (router.pathname == '/login' || router.pathname == '/register' || router.pathname == '/forgotPassword' || router.pathname == '/download') {
        width = '100%';
    }

    
    return mounted && (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" />
            </Head>
            <Header />
            <Container maxWidth="false" sx={{ bgcolor: '#fff', height: "100%", padding: "0px !important", overflowY: 'auto' }}>
            <main style={{minHeight:'90vh',width:width,margin:"auto",paddingBottom:"20px",paddingTop:"0px"}}>
                {children}
                </main>
            </Container>
            <Footer />
           
             <style jsx global>
                {`
                    html,
                    body {
                        // background: #f9f9f9;
                        // font-size: 14px;


                    }
                    #__next {
                        // min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    main {
                        flex: 1;
                        min-height: 60vh;
                    }
                     p,
                    a {
                        // font-family: 'Poppins' !important;
                        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                    }
                    
                `}
            </style>
        </>
    );
}

export default Layout;