import * as React from "react";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Box,
  FormControl,
  Grid,
  Divider,
  Select,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import GamesInfo from "@/components/gamesMobilePage/gamesInfo";
import NoSsr from "@mui/base/NoSsr";
import MatchItem from "@/common/MatchItem";

import { Icon } from "@iconify/react";

import utils from "@/common/utils";
import moment from "moment/moment";
import Router, { useRouter } from "next/router";
import MatchWithDates from "@/components/match/MatchWithDates";
import MatchWithRounds from "@/components/match/MatchWithRounds";
import FavouritePage from "@/components/favourite/favouritePage";
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
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Match() {
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  const route = useRouter()
  const [mounted,setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)
  },[]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
  return (
  <>  
    <NoSsr>
      <Box sx={{ width: "100%" }}>
        <Grid
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            position: "fixed",
            top: 40,
            width: "100%",
            background: "#fff",
            zIndex: 9,
          }}
          container
          alignItems="center"
          style={{'-webkit-overflow-scrolling': 'touch'}}
        >
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: {
                background: "#FF6F31",
              },
            }}
            sx={{
              width: "80%",
              position: "relative",
              "& .Mui-selected": {
                color: "#000 !important",
                fontWeight: "bold",
              },
            }}
          >
            <Tab className="matchtab" label={langKey?.favourite} {...a11yProps(0)} />
            <Tab className="matchtab" label={langKey?.foot_ball} {...a11yProps(1)} />
            {/* <Tab className="matchtab" label={langKey?.basket_ball} {...a11yProps(2)} /> */}
          </Tabs>
          <Grid
            width="60px"
            height="30px"
            sx={{
              background: "linear-gradient(90deg, #FF0000 0%, #FF6E31 100%)",
              borderRadius: "50px",
            }}
            container
            justifyContent="center"
            alignItems="center"
          >
          

            <Icon
              color="white"
             onClick={()=>{route.push('/events')}}
              width={25}
              icon="material-symbols:filter-alt-outline"
            />
          </Grid>
        </Grid>
        <TabPanel value={value} index={0} >
        <FavouritePage/>
        </TabPanel>       
        <TabPanel value={value} index={1}>
          <MatchWithDates />  
        </TabPanel>
        <TabPanel value={value} index={2}>
        <MatchWithRounds />
        </TabPanel>
      </Box>
    </NoSsr>
  </>
  );
}
