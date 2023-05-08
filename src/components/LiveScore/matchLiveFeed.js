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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const { matchData } = props;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid alignItems="baseline" container>
      <Grid item xs={9}>
        <LiveScoreCardTab />

        <ChipDataFilter />
      </Grid>

      <Grid item xs={3} px={1}>
        
        <ChatScroll />

        <Grid border="1px solid #ddd" mt={1}>
          <Grid component={Card} container p={1} elevation={3}>
            <Grid container alignItems="center">
              {expanded ? (
                <Icon
                  icon="mdi:horizontal-line"
                  color="#F24E1E"
                  height="30px"
                  onClick={handleExpandClick}
                />
              ) : (
                <Icon
                  icon="ic:baseline-plus"
                  color="#F24E1E"
                  height="30px"
                  onClick={handleExpandClick}
                />
              )}
              <Typography>Dynamic</Typography>
            </Grid>
          </Grid>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid height="500px" overflow="auto">
              {[
                {
                  id: 1,
                  title: "Russian Basketball Super League",
                  card: { img: "./assets/LiveScore/basketballcard.png" },
                },
                {
                  id: 2,
                  title: "Russian Basketball Super League 20:00",
                  card: null,
                },
                { id: 3, title: "Latin Basketball Super League", card: null },
                {
                  id: 4,
                  title: "Asia Basketball Super League",
                  card: { img: "./assets/LiveScore/basketballcard.png" },
                },
                {
                  id: 5,
                  title: "Eroupean Basketball Super League",
                  card: null,
                },
              ].map((item, index) => {
                return (
                  <Grid key={index}>
                    <MatchLiveScroll item={item} />
                  </Grid>
                );
              })}
            </Grid>
          </Collapse>
        </Grid>
        
      </Grid>
    </Grid>
  );
}
