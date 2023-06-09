import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Typography,
  Divider,
  Button,
  Checkbox,
  IconButton,
  Tab,Tabs,
  styled,
  colors
} from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import MatchDetailHeader from "@/components/match/MatchDetailHeader";
import MatchDetailLiveText from "@/components/match/MatchDetailLiveText";
import MatchStats from "@/components/match/MatchStats";
import MatchVerticleChart from "@/components/match/MatchVerticleChart";
import { Padding } from "@mui/icons-material";


const HeaderTabs = styled(Tabs)({
  minHeight: 'fit-content !important',
  // backgroundColor: "#dddddd",
  "& .MuiTabs-indicator": {
    display: 'none'
  },
  "& .Mui-selected":{
    background: 'red !important',
    borderRadius: '50px',
    color:"white !important"
  },
  "& .MuiTab-root":{
    background: 'white',
    border: "1px solid #8c8c8c",
    borderRadius: '50px',
    color:"black",
    marginRight: '10px',
    marginLeft: '10px',
    fontSize: '11px',
    minHeight: 'fit-content !important',
    padding: '5px 0px 5px 0px'
  }
});


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
          <Grid py={1}>{children}</Grid>
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

export default function MatchDetails(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [filterValue, setFilterValue] = useState("all");
  const [selected, setSelected] = useState([]);

  const handleSelectFilter = (value) => {
    setFilterValue(value);
  };

  useEffect(() => {
    console.log("new selectedList:::", selected);
  }, [selected]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container>
      <MatchDetailHeader />
      <Grid item xs={12} className="sticky-header"  sx={{background:"#F3F3F3", borderWidth:"0.5px 0px", borderColor:"#DDDDDD", borderStyle:"solid", paddingBottom:"0px", }}>
        <Grid py={1} container justifyContent="center">
          <HeaderTabs value={value} onChange={handleChange} >
            <Tab className="matchtab" label="Info" {...a11yProps(0)} />
            <Tab className="matchtab" label="Live Text" {...a11yProps(1)} />
            <Tab className="matchtab" label="Statics" {...a11yProps(2)} />
          </HeaderTabs>
        </Grid>
      </Grid>
      <TabPanel value={value} index={0}>
        <MatchVerticleChart />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MatchDetailLiveText />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MatchStats />
      </TabPanel>
    </Grid>
  );
}
