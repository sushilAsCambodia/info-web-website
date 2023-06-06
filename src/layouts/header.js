import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LangSwitcher from '@/components/LangSwitcher';
import Image from 'mui-image';
const Header = () => {   
  return (
    <AppBar position="static" style={{background:'linear-gradient(90.08deg, #FF0000 0.08%, #FF6F31 99.94%)',minHeight: '56px', justifyContent:'center'}} >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            display="grid"
            sx={{
              flexGrow: 1,
              mr: 2,
              lineHeight:"0px",
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            <Image src="./assets/Logo/logo-infoweb.png" width="120px" height="100%" alt='logo-infoweb' />
          </Typography> 
          <Box sx={{ alignItems:'center' }}>
            <LangSwitcher/>
          </Box> 
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;