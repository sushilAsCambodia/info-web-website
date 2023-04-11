import React, { useEffect, useState } from 'react';
import Header from './header';
import Footer from './footer';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import Navigate from '@/components/navigate';
import { Grid, IconButton } from '@mui/material';
import Head from 'next/head'
import { useTranslation } from 'react-i18next';
import {
    Button,
    Typography,
    FormControl,
    Box,
    InputAdornment,
    OutlinedInput,
    Link,
    ListItem,
    ListItemText,
    ListItemIcon,
    List,
    Divider
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}




const Layout = (props) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
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
            let title = '';
            if(router.pathname === '/journalCardDetails') {
                title = router.query?.title || '';
            }
            if (pages.includes(router.pathname)) {
                return <Navigate
                    title={title}
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
                        <Grid onClick={toggleDrawer('bottom', true)}>
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
        case '/login':
            title = t('login_info_web')
            break;
        case '/register':
            title = t('regiter_info_web')
            break;
        case '/forgotpassword':
            title = t('forgot_password_info_web')
            break;
        default:
            break;
    }

    const [state, setState] = useState({ bottom: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };


    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'bottom' ? 'auto' : 250}}
            role="presentation"
            className="calendraDrawer">
            <Typography className="drawerline"></Typography>
            <br />
            <Typography textAlign="center" fontSize="12px">Choose the number of periods</Typography>
            <Typography textAlign="left" fontSize="12px" className='yearheadline'>Year</Typography>
            <Box onClick={toggleDrawer('bottom', false)} sx={{display:'flex',justifyContent:'center',alignItems:'center', width: '26px',height:'26px',bgcolor:'white', borderRadius: '50%',position:'absolute',top: '-17px', left: '50%', transform: "translate(-50%, -50%)"}}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.25 0.75L0.75 7.25M0.75 0.75L7.25 7.25" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </Box>
            <List sx={{padding:0}}>
                <ListItem disablePadding >
                    <Grid item xs={12} sm={12} width='100%'>
                        <Box sx={{ width: '100%' }}>
                            {/* <Box sx={{ borderBottom: 1, borderColor: 'divider'}}> */}
                                <Tabs 
                                indicatorColor="transparent"
                                TabIndicatorProps={{  children: <span className='dot-custom' style={{  
                                    bottom:'-4px', 
                                    width: '10px',
                                    height: '10px',
                                    background: 'red',
                                    position: 'absolute',
                                    left: '46%',
                                    transform: 'translate(-50%, -50%)',
                                    borderRadius: '50%',
                                    zIndex: 9999}} /> }}
                                    variant="scrollable"
                                    scrollButtons 
                                    value={value} 
                                    onChange={handleChange} 
                                    aria-label="basic tabs example" className='abc'>
                                    <Tab sx={{padding:'0',minWidth:'80px', position:'relative'}} label="2020" {...a11yProps(0)} />
                                    <Tab sx={{padding:'0',minWidth:'80px', position:'relative'}} label="2021" {...a11yProps(1)} /> 
                                    <Tab sx={{padding:'0',minWidth:'80px', position:'relative'}} label="2022" {...a11yProps(2)} /> 
                                    <Tab sx={{padding:'0',minWidth:'80px', position:'relative'}} label="2023" {...a11yProps(3)} /> 
                                    <Tab sx={{padding:'0',minWidth:'80px', position:'relative'}} label="2024" {...a11yProps(4)} /> 
                                    <Tab sx={{padding:'0',minWidth:'80px', position:'relative'}} label="2025" {...a11yProps(5)} /> 
                                    <Tab sx={{padding:'0',minWidth:'80px', position:'relative'}} label="2026" {...a11yProps(6)} /> 
                                </Tabs>
                            {/* </Box> */}
                            <TabPanel value={value} index={0} padding="0px !important" >
                                <List sx={{ padding: "10px !important", margin: "0px !important", display:"grid", gridTemplateColumns:"auto auto auto auto auto", gridGap:"10px", justifyContent: "flex-start", textAlign: "center !important" }}>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 02</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 03</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 04</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 05</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 06</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 07</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 08</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 09</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 10</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 11</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 12</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 13</Typography>
                                    </ListItem>
                                </List>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <List sx={{ padding: "10px !important", margin: "0px !important", display:"grid", gridTemplateColumns:"auto auto auto auto auto", gridGap:"10px", justifyContent: "flex-start", textAlign: "center !important" }}>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                
                                </List>
                            </TabPanel> 
                            <TabPanel value={value} index={2} padding="0px !important" >
                                <List sx={{ padding: "10px !important", margin: "0px !important", display:"grid", gridTemplateColumns:"auto auto auto auto auto", gridGap:"10px", justifyContent: "flex-start", textAlign: "center !important" }}>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 02</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 03</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 04</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 05</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 06</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 07</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 08</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 09</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 10</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 11</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 12</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 13</Typography>
                                    </ListItem>
                                </List>
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <List sx={{ padding: "10px !important", margin: "0px !important", display:"grid", gridTemplateColumns:"auto auto auto auto auto", gridGap:"10px", justifyContent: "flex-start", textAlign: "center !important" }}>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                </List>
                            </TabPanel> 
                            <TabPanel value={value} index={4} padding="0px !important" >
                                <List sx={{ padding: "10px !important", margin: "0px !important", display:"grid", gridTemplateColumns:"auto auto auto auto auto", gridGap:"10px", justifyContent: "flex-start", textAlign: "center !important" }}>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 02</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 03</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 04</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 05</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 06</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 07</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 08</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 09</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 10</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 11</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 12</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 13</Typography>
                                    </ListItem>
                                </List>
                            </TabPanel>
                            <TabPanel value={value} index={5}>
                                <List sx={{ padding: "10px !important", margin: "0px !important", display:"grid", gridTemplateColumns:"auto auto auto auto auto", gridGap:"10px", justifyContent: "flex-start", textAlign: "center !important" }}>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                
                                </List>
                            </TabPanel> 
                            <TabPanel value={value} index={6}>
                                <List sx={{ padding: "10px !important", margin: "0px !important", display:"grid", gridTemplateColumns:"auto auto auto auto auto", gridGap:"10px", justifyContent: "flex-start", textAlign: "center !important" }}>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                    <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                                        <Typography fontSize="10px">Issue 01</Typography>
                                    </ListItem>
                                
                                </List>
                            </TabPanel> 
                        </Box>
                    </Grid>
                    <style>
                        {
                            `
                                .abc .MuiTab-root::before {
                                    content: '';
                                    width: 100%;
                                    height: 1px;
                                    position: absolute;
                                    background: #ddd;
                                    bottom: 5px;
                                }
                            `
                        }
                    </style>
                </ListItem>
            </List>
        </Box>
    );
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
            <Box>
                <Drawer PaperProps={{
                    style:{
                        overflow:'initial'
                    }
                }} anchor={'bottom'} open={state['bottom']} onClose={toggleDrawer('bottom', false)}>
                    {list('bottom')}
                </Drawer>
            </Box>
        </>
    );
}

export default Layout;