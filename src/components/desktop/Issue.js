import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
export default function DialogDesktop() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
    const tabElms = (length) => {
        let tabs = [];
        for (let i = 0 ; i < length ; i++) {
            tabs.push(<Tab sx={{ padding: '0', minWidth: '80px', position: 'relative' }} label={2020+i} {...a11yProps(i)} /> );
        }
        return tabs;
    };
    const tabPanelElms = (length) => {
        let tabPanels = [];
        for (let i = 0 ; i < length ; i++) {
            tabPanels.push( <TabPanel value={value} index={i} padding="0px !important" >
            <List sx={{ padding: "10px !important", margin: "0px !important", display: "grid", gridTemplateColumns: "auto auto auto auto auto", gridGap: "10px", justifyContent: "flex-start", textAlign: "center !important" }}>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 01</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 02</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 03</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 04</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 05</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 06</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 07</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 08</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 09</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 10</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 11</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 12</Typography>
                </ListItem>
                <ListItem style={{ justifyContent: "center", textAlign: "center !important" }}>
                    <Typography fontSize="10px">Issue 13</Typography>
                </ListItem>
            </List>
        </TabPanel>);
        }
        return tabPanels;
    };
    return (
        <Box
            role="presentation"
            className="calendraDrawer">
            <Typography textAlign="left" fontSize="16px" color="#000" fontWeight="bold">Choose the number of periods</Typography>
            <Typography textAlign="left" fontSize="12px" className='yearheadline'>Year</Typography>
            <List sx={{ padding: '0px' }}>
                <ListItem disablePadding>
                    <Grid item xs={12} sm={12} width='100%'>
                        <Box sx={{ width: '100%' }}>
                            {/* <Box sx={{ borderBottom: 1, borderColor: 'divider'}}> */}
                            <Tabs
                                indicatorColor="transparent" 
                                sx={{
                                    position:'relative',
                                    '& .Mui-selected': {
                                        color:'#FF0000',
                                        fontWeight:'bold'
                                    }
                                }}
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
                                aria-label="basic tabs example" className='scrollable-custom issue-card-custom'>
                                {tabElms(13)}
                            </Tabs>
                            {tabPanelElms(13)}
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
                                .issue-card-custom > .MuiButtonBase-root:first-child {
                                    position: absolute;
                                    top: 47%;
                                    z-index: 9;
                                    left: 15px;
                                    transform: translate(-50%, -50%);
                                }
                                .issue-card-custom > .MuiButtonBase-root:last-child {
                                    position: absolute;
                                    top: 47%;
                                    z-index: 9;
                                    right:-29px;
                                    transform: translate(-50%, -50%);
                                }
                                .issue-card-custom .MuiTabs-scroller > .MuiTabs-flexContainer{
                                    justify-content:center
                                }
                                .issue-card-custom > .MuiButtonBase-root svg {
                                    background: #FF6F31;
                                    border-radius:50%;
                                    color:#fff;
                                }
                            `
                        }
                    </style>
                </ListItem>
            </List>
        </Box>
    );
}