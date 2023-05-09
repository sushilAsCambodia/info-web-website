import {
  Typography,
  Grid,
  Card,
  Tab,
  Tabs,
  Chip,
  Divider,
  Collapse,
} from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";

import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import MatchLiveScroll from "./MatchLiveScroll";
import ChipDataFilter from "./ChipDataFilter";
import LiveScoreCardTab from "./LiveScoreCardTab";
import ChatScroll from "./ChatScroll";
import ChatScrollCollapse from "./ChatScrollCollapse";

const HeaderTabs = styled(Tabs)({
  backgroundColor: "black",
  "& .MuiTabs-indicator": {
    backgroundColor: "#ff000000",
  },
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
    <Grid
      width="100%"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function MatchLiveFeed(props) {
  const router = useRouter();
  const theme = useTheme();
 
  const { matchData } = props;

  

  return (
    <Grid alignItems="baseline" container>
      <Grid item xs={9}>
        <LiveScoreCardTab />

        <ChipDataFilter />
      </Grid>

      <Grid item xs={3} px={1}>
        
        <ChatScroll />

        <ChatScrollCollapse />
        
      </Grid>
    </Grid>
  );
}
