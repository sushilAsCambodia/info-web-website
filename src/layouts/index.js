import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Container from '@mui/material/Container';
const Layout =({children}) => {
    return(
        <>
            <Header/>
                <Container maxWidth="false" sx={{ bgcolor: '#fff', height: 'calc(100vh - 112px)', padding:"0px !important" }}>
                    <main>
                        {children}
                    </main>
                </Container>
            <Footer/> 
        </>
    );
}

export default Layout;