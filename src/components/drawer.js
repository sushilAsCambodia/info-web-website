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
import { useDispatch, useSelector } from 'react-redux';
import { getIssue, getYear, getSelectedIssue } from '@/store/actions/journalActions';
import { useRouter } from 'next/router';
import DataLoading from './DataLoading';
import DataNotFound from './DataNotFound';
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
    const {openDrawer = { anchor:'bottom', open: false }, setOpenDrawer} = props;
    const [value, setValue] = React.useState(0);
    const [activeIssue, setActiveIssue] = React.useState(0);
    const { loading, issue = {}, years = [] } = useSelector(state => state.journal);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }; 
    const dispatch = useDispatch(); 
    const router = useRouter();
    useEffect(() => {
        if(router.query?.album_id) {
            dispatch(
                getYear(
                    {
                        params:{
                            albumId: router.query?.album_id,
                        },
                        callback:(res) => {  }
                    }
                )
            );
            
        }
    },[router.query]);
    useEffect(() => {
        if(years.length  > 0) {
            fetchIssue(years[value]);
        }
    },[years]);
    const fetchIssue = (issueDate) => {
        dispatch(
            getIssue(
                {
                    params: {
                        albumId: router.query?.album_id,
                        issueDate
                    },
                    callback:(res) => {
                        const {data = {}} = res;
                        if(Object.keys(data).length > 0 && data.hasOwnProperty('data') && data.data.length > 0) {
                            const firstIssue = data.data[0];
                            openIssue(firstIssue.issue,0)
                        }
                    }
                }
            )
        )
    };
    const openIssue = (issue,index) => {
        setActiveIssue(index);
        dispatch(
            getSelectedIssue(
                {
                    params: {
                        albumId: router.query?.album_id,
                        issue:issue,
                        issueDate:years[value]
                    },
                    callback:(res) => { },
                }
            )
        );
    } 
    const tabPanelElms = ( ) => { 
        return <TabPanel  value={value} index={value} padding="0px !important" >
            <List sx={{  margin: "5px !important", display:"grid", gridTemplateColumns:"auto auto auto auto auto", gridGap:"5px", justifyContent: "flex-start", textAlign: "center !important" }}>
                {
                    issue && issue.hasOwnProperty('data') && issue.data.map((is,index) => {
                        return <ListItem key={index} onClick={() => openIssue(is.issue,index)} className={activeIssue == index ? 'active-issue mui-issue-custom':'mui-issue-custom'} style={{ width:'53px', justifyContent: "center", textAlign: "center !important" }}>
                            <Typography fontSize="10px">Issue {is.issue || ''}</Typography>
                        </ListItem>
                    })
                } 
            </List>
        </TabPanel>
    }
    return <Drawer className='custom-drawer-wrapper' anchor={openDrawer['anchor']} open={openDrawer['open']} onClose={() => { setOpenDrawer({open: false,anchor:'bottom'});setActiveIssue(0)}}>
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
                        {years.length > 0 ? <Box sx={{ width: '100%' }}>
                            <Tabs
                                indicatorColor="transparent"
                                TabIndicatorProps={{
                                    children: <span className='dot-custom' style={{
                                        bottom: '-4px',
                                        width: '10px',
                                        height: '10px',
                                        background: 'red',
                                        position: 'absolute',
                                        left: '50%',
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
                                    position:"relative",
                                    '& .Mui-selected': {
                                        color:'#FF0000 !important',
                                        fontWeight:'bold'
                                    },
                                    '&:before':{
                                        content:'""',
                                        height:'1px',
                                        width:'100%',
                                        background:'#DDDDDD',
                                        position:'absolute',
                                        bottom:'5px'
                                    }
                                }}
                                aria-label="basic tabs example" className='scrollable-custom'>
                                {years.length > 0 && years.map((res,index) => {
                                    return <Tab onClick={() => fetchIssue(res)} key={index} sx={{ padding: '0', minWidth: '56px', position: 'relative' }} label={res} {...a11yProps(index)} />;
                                })}
                            </Tabs>
                            {loading ? <DataLoading size={20}/> : (issue && issue.hasOwnProperty('data') && issue.data.length <= 0 ? <DataNotFound height={200} width={200}/> : tabPanelElms())} 
                        </Box>:<DataNotFound height={200} width={200}/>}
                        
                    </Grid>
                    <style>
                        {
                            ` 
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