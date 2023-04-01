import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid'; 
import Typography from '@mui/material/Typography'; 
import {Container,Link} from '@mui/material';
import api from '../services/http';
const Home = () => {
    React.useEffect(() => {
        api.get().then(res => {
            console.log(res);
        });
    },[])
    return (
        <React.Fragment>
            {/* <CssBaseline /> */}
            <Container maxWidth="false" sx={{ bgcolor: '#bbdefb', height:'100vh' }}>
                <Container maxWidth="xl">    
                    <Grid container>
                        <Typography variant="h6" component="h6">
                            <Link href="/home"> Home page</Link>
                        </Typography>
                    </Grid>
                </Container>
            </Container>
        </React.Fragment>
    );
};  
export default Home;