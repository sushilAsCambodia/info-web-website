import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LangSwitcher from '@/components/LangSwitcher';

import useMediaQuery from "@mui/material/useMediaQuery";
const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const pages = ['Person', 'Business', 'Feature', 'Pricing','Help','Login'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const matches = useMediaQuery("(max-width:768px)");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{background:'linear-gradient(90.08deg, #FF0000 0.08%, #FF6F31 99.94%)',height: '56px'}} >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
       
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              mr: 2,
              lineHeight:"0px",
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              width:'100px',
             
            }}>
            <img src="./assets/Logo/logowhite.png" />
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