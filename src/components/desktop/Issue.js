import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getIssue, getYear, getSelectedIssue } from '@/store/actions/journalActions';
import DataLoading from '../DataLoading';
import DataNotFound from '../DataNotFound';
export default function DialogDesktop(props) {
    const dispatch = useDispatch();
    const { albumId,setYear } = props;
    const [value, setValue] = React.useState(0);
    const [firstFetch, setFirstFetch] = React.useState(true);
    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

    const [activeIssue, setActiveIssue] = React.useState(0);
    const { loading, issue = {}, years = [] } = useSelector(state => state.journal);
    React.useEffect(() => {
        if(albumId) {
            dispatch(
                getYear(
                    {
                        params:{
                            albumId: albumId,
                        },
                        callback:(res) => {}
                    }
                )
            );
            
        }
    },[dispatch,albumId]);
    React.useEffect(() => {
        if(years.length > 0) {
            if(firstFetch) { 
                setFirstFetch(false);
                fetchIssue(years[value]);
                setYear(years[value]);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[years,value]);
    const fetchIssue = (issueDate) => {
        dispatch(
            getIssue(
                {
                    params: {
                        albumId: albumId,
                        issueDate
                    },
                    callback:(res) => { 
                        setFirstFetch(true);
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
    const tabPanelElms = () => { 
        return <TabPanel value={value} index={value} padding="0px !important" >
        <List sx={{ padding:'8px 13px',  margin: "0px !important", display: "grid", gridTemplateColumns: "auto auto auto auto auto auto auto auto auto auto", gridGap: "8px", justifyContent: "flex-start", textAlign: "center !important" }}>
                {
                    issue && issue.hasOwnProperty('data') && issue.data.map((is,index) => {
                        return <ListItem key={index} onClick={() => openIssue(is.issue,index)} className={activeIssue == index ? 'active-issue mui-issue-custom':'mui-issue-custom'} style={{ width: '53px', justifyContent: "center", textAlign: "center !important",cursor:"pointer" }}>
                            <Typography fontSize="10px">{langKey && langKey.issue} {is.issue || ''}</Typography>
                        </ListItem>
                    })
                } 
        </List>
    </TabPanel>
    };
    const openIssue = (issue,index) => { 
        setActiveIssue(index);
        dispatch(
            getSelectedIssue(
                {
                    params: {
                        albumId: albumId,
                        issue:issue,
                        issueDate:years[value]
                    },
                    callback:(res) => {},
                }
            )
        );
    }
    return (
        <>
            {years.length > 0 ? <Box
                role="presentation"
                className="calendraDrawer">
                <Typography textAlign="left" fontSize="16px" color="#000" fontWeight="bold">  {langKey && langKey.choose_the_number_of_periods}</Typography>
                <Typography padding="5px 0 0 0" textAlign="left" fontSize="11px" className='yearheadline'>{langKey && langKey.year}</Typography>
                <List sx={{ padding: '0px' }}>
                    <ListItem disablePadding>
                        <Grid item xs={12} sm={12} width='100%'>
                            <Box sx={{ width: '100%' }}>
                                <Tabs
                                    indicatorColor="transparent" 
                                    sx={{
                                        position:'relative',
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
                                    aria-label="basic tabs example" className='scrollable-custom issue-card-custom'>
                                    {years.length > 0 && years.map((year,index) => {
                                        return <Tab key={index} sx={{ padding: '0', minWidth: '80px', position: 'relative' }} label={year} {...a11yProps(index)} />
                                    })}
                                </Tabs>
                                {loading ? <DataLoading size={20}/> : (issue && issue.hasOwnProperty('data') && issue.data.length <= 0 ? <DataNotFound height={200} width={200}/> : tabPanelElms())} 
                            </Box>
                        </Grid>
                        <style>
                            {
                                ` 
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
                                        // justify-content:center
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
            </Box> : ""}
        </>
    );
}