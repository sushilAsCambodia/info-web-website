import React from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import FullSilder from './FullSilder';
import MultiTabs from './MultiTabs';
import JournalCard from '../homeJournal/JournalCard';
import { useRouter }  from "next/router";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import {getJournal} from '@/store/actions/journalActions'
import { useDispatch, useSelector } from 'react-redux';
import AdvertiseSlide from './AdvertiseSlide';
function TabPanel(props) {
  const { children, value, index, ...other } = props; 
  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid>
          {children}
        </Grid>
      )}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


export default function NewsJournalTabs(props) {
  const {t} = useTranslation();
  const {banners = [], categories = [], advertises = [], lang_id} = props; 
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if(hash == 'journal') {
      setValue(1);
    }else {
      setValue(0);
    }
   }, [ router.asPath ]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 
  useEffect(() => {
    if(value === 1) {
      dispatch(getJournal(
        {
            params: {lang_id: lang_id,take: 10},
            callback:(res) => { }
        }
      ));
    }
  },[lang_id,value])
  return (
    <Grid item className='tabclass' sx={{height:'100%'}}>
      <Grid sx={{ height:'100%' }} >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{paddingTop:'10px',paddingBottom:'10px'}}
        >
          <Tab label={t('news')} {...a11yProps(0)} onClick={() => router.push('/home#newsfeed')} />
          <Tab label={t('journal')} {...a11yProps(1)} onClick={() => router.push('/home#journal')}/>
        </Tabs>
        <TabPanel  value={value} index={0} >
          <FullSilder banners={banners}/>
          <AdvertiseSlide advertises={advertises}/>
          <MultiTabs categories={categories} lang_id={lang_id}/>
        </TabPanel>
        <TabPanel value={value} index={1} >
          <JournalCard lang_id={lang_id}/>
        </TabPanel>
      </Grid>
    </Grid>
  )
}
