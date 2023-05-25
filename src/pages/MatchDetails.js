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
    minHeight: 'fit-content !important'
  }
});

const HeaderTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    backgroundColor: "#222222",
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    color: "#A6A6A6",

    "&.Mui-selected": {
      color: "white",
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: "black",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

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
      <Grid item xs={12} className="sticky-header"  sx={{background:"#f6f6f6",borderTop: "1px solid #8c8c8c",borderBottom: "1px solid #8c8c8c"}}>
        <Grid py={1}>
          <HeaderTabs value={value} onChange={handleChange} >
            <Tab label="Info" {...a11yProps(0)} />
            <Tab label="Live Text" {...a11yProps(1)} />
            <Tab label="Statistics" {...a11yProps(2)} />
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
