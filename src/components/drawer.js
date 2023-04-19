import React, { useEffect, useState } from 'react'; 
import { Grid, IconButton } from '@mui/material'; 
import {
    Typography, 
    Box, 
    ListItem,
    List, 
} from "@mui/material";
import Drawer from '@mui/material/Drawer'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
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
const DrawerComponent = (props) => {
    const {openDrawer = {anchor:'bottom',open:false},setOpenDrawer} = props;
    
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tabElem = (length) => {
        const tabs = [];
        for (let i = 0; i < length; i++) {
            tabs.push(<Tab key={i} sx={{ padding: '0', minWidth: '80px', position: 'relative' }} label={2020+i} {...a11yProps(i)} /> );
        }
        return tabs;
    }
    const tabPanelElms = (length) => {
        const tabPanels = [];
        for (let i = 0; i < length; i++) {
            tabPanels.push(<TabPanel key={i} value={value} index={i} padding="0px !important" >
                        <List sx={{ padding: "10px !important", margin: "0px !important", display:"grid", gridTemplateColumns:"auto auto auto auto auto", gridGap:"10px", justifyContent: "center", textAlign: "center !important" }}>
                            <ListItem className='active-issue' style={{ justifyContent: "center", textAlign: "center !important" }}>
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
                    </TabPanel>);
        }
        return tabPanels;
    }
    return <Drawer className='custom-drawer-wrapper' anchor={openDrawer['anchor']} open={openDrawer['open']} onClose={() => setOpenDrawer({open: false,anchor:'bottom'})}>
        <Box
            sx={{ width: openDrawer['anchor'] === 'bottom' ? 'auto' : 250}}
            role="presentation"
            className="calendraDrawer">
            <Typography className="drawerline"></Typography>
            <br />
            <Typography textAlign="center" fontSize="12px">Choose the number of periods</Typography>
            <Typography textAlign="left" fontSize="12px" className='yearheadline'>Year</Typography>
            <Box onClick={() => setOpenDrawer({open: false, anchor:'bottom'})} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '26px', height: '26px', bgcolor: 'white', borderRadius: '50%', position: 'absolute', top: '-17px', left: '50%', transform: "translate(-50%, -50%)" }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.25 0.75L0.75 7.25M0.75 0.75L7.25 7.25" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Box>
            <List sx={{padding:'0px'}}>
                <ListItem disablePadding>
                    <Grid item xs={12} sm={12} width='100%'>
                        <Box sx={{ width: '100%' }}>
                            <Tabs
                                indicatorColor="transparent"
                                TabIndicatorProps={{
                                    children: <span className='dot-custom' style={{
                                        bottom: '-4px',
                                        width: '10px',
                                        height: '10px',
                                        background: 'red',
                                        position: 'absolute',
                                        left: '46%',
                                        transform: 'translate(-50%, -50%)',
                                        borderRadius: '50%',
                                        zIndex: 9999
                                    }} />
                                }}
                                variant="scrollable"
                                scrollButtons
                                value={value}
                                onChange={handleChange}
                                sx={{
                                    '& .Mui-selected': {
                                        color:'#FF0000 !important',
                                        fontWeight:'bold'
                                    }
                                }}
                                aria-label="basic tabs example" className='scrollable-custom'>
                                {tabElem(12)}
                            </Tabs>
                            {/* </Box> */}
                            {tabPanelElms(12)}
                        </Box>
                    </Grid>
                    <style>
                        {
                            `
                                .scrollable-custom .MuiTab-root::before {
                                    content: '';
                                    width: 100%;
                                    height: 1px;
                                    position: absolute;
                                    background: #ddd;
                                    bottom: 5px;
                                }
                                .custom-drawer-wrapper .MuiDrawer-paper{
                                    overflow-y: initial;
                                }
                            `
                        }
                    </style>
                </ListItem>
            </List>
        </Box>
</Drawer>;
}
export default DrawerComponent;