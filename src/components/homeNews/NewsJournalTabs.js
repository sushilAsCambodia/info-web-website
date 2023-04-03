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


export default function NewsJournalTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Grid item className='tabclass'>
     <Grid sx={{ padding:'10px 10px' }} >
      
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="News" {...a11yProps(0)} onClick={() => router.push('/home#newsfeed')} />
          <Tab label="journal" {...a11yProps(1)} onClick={() => router.push('/home#journal')}/>
        </Tabs>
      
      
        <TabPanel  value={value} index={0} >
        <FullSilder />
        <MultiTabs />
        </TabPanel>
        <TabPanel value={value} index={1} >
        <JournalCard />
        </TabPanel>

    </Grid>
    </Grid>
  )
}
