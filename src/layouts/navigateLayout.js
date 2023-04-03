import React, { useEffect } from 'react';
import Navigate from '@/components/navigate';
import Footer from './footer';
import Container from '@mui/material/Container';
const NavigateLayout =(props) => {
    const {children, title = '', lead = '', tail = ''} = props;
    return(
        <>
            <Navigate title={title} lead={lead} tail={tail}/>
                <Container maxWidth="false" sx={{  height: 'calc(100vh - 56px)' }}>
                    <main>
                        {children}
                    </main>
                </Container>
            <Footer/> 
        </>
    );
}

export default NavigateLayout;