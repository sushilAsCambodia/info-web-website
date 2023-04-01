import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import Container from '@mui/material/Container';
const Layout =({children}) => {
    return(
        <>
            <Header/>
                <Container maxWidth="false" sx={{ bgcolor: '#bbdefb', height: 'calc(100vh - 112px)' }}>
                    <main>
                        {children}
                    </main>
                </Container>
            <Footer/> 
        </>
    );
}

export default Layout;