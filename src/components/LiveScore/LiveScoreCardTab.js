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
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

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

export default function LiveScoreCardTab(props) {
  const router = useRouter();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { matchData } = props;

  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Grid
        item
        container
        textAlign="center"
        justifyContent="center"
        alignContent="flex-start"
        sx={{
          color: "white",
          borderRadius: "5px",
        }}
        className="LiveScoreBg"
        style={{ "--liveBg": `url(${"./assets/LiveScore/basketBall.png"})` }}
      >
        <Grid item xs={12}>
          <HeaderTabs variant="fullWidth" value={value} onChange={handleChange}>
            <HeaderTab
              label={
                <Typography style={{ fontWeight: "bold" }}>
                 { langKey && langKey.score_card} 
                </Typography>
              }
            />
            <HeaderTab
              label={
                <Typography style={{ fontWeight: "bold" }}>
                  { langKey && langKey.live_video} 
                </Typography>
              }
            />
          </HeaderTabs>
        </Grid>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{ width: "100%", paddingTop: "10px", paddingBottom: "10px" }}
        >
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            minHeight="400px"
          >
            <>
              <Grid color="white" container justifyContent="center" my={2}>
                <Grid
                  container
                  item
                  xs={8}
                  justifyContent="center"
                  component={Card}
                >
                  <Grid
                    item
                    xs={12}
                    p={2}
                    sx={{
                      background:
                        "linear-gradient(90.03deg, #FF0000 0.03%, #F24E1E 99.99%)",
                    }}
                  >
                    <Typography color="white" fontWeight="bold">
                      Russian Basketball Super League
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Did Not Start</Typography>
                  </Grid>
                  <Grid item xs={4.5}>
                    <img
                      width={60}
                      src={
                        "https://i.pinimg.com/originals/9a/70/de/9a70de3e4c7e4d046209036746b4a943.png"
                      }
                    />
                    <Typography fontWeight="bold">
                      Dynamo Vladivostok
                    </Typography>
                    <Typography>GUEST</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    container
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={8} container justifyContent="center">
                      <Grid
                        width={50}
                        height={50}
                        container
                        alignItems="center"
                        justifyContent="center"
                        sx={{ background: "#F24E1E", borderRadius: "50px" }}
                      >
                        <Typography sx={{ color: "white", fontWeight: "bold" }}>
                          VS
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={4.5}>
                    <img
                      width={60}
                      src={
                        "https://i.pinimg.com/originals/9a/70/de/9a70de3e4c7e4d046209036746b4a943.png"
                      }
                    />
                    <Typography fontWeight="bold">
                      Dynamo Vladivostok
                    </Typography>
                    <Typography>GUEST</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid px={5}>
                <Grid component={Card} container>
                  <Grid container px={1} borderBottom="1px solid #DDDDDD">
                    <Grid item xs={4} container alignItems="center">
                      <img
                        width={40}
                        src={
                          "https://i.pinimg.com/originals/9a/70/de/9a70de3e4c7e4d046209036746b4a943.png"
                        }
                      />
                      <Grid textAlign="left">
                        <Typography fontWeight="bold">
                          Dynamo Vladivostok
                        </Typography>
                        <Typography>GUEST</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid p={2}>
                        <Typography>Did not start</Typography>
                        <Typography variant="h5" fontWeight="bold">
                          0:0
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      container
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Grid textAlign="right">
                        <Typography fontWeight="bold">
                          Dynamo Vladivostok
                        </Typography>
                        <Typography>GUEST</Typography>
                      </Grid>
                      <img
                        width={40}
                        src={
                          "https://i.pinimg.com/originals/9a/70/de/9a70de3e4c7e4d046209036746b4a943.png"
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container height="150px">
                    <Grid
                      item
                      xs={3}
                      p={2}
                      container
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      <Chip
                        label={
                          <Typography p={1} fontWeight="bold">
                          { langKey && langKey.pause} 
                          </Typography>
                        }
                        className="scoreChip"
                        variant="outlined"
                      />
                      <Chip
                        label={
                          <Typography p={1} fontWeight="bold">
                       { langKey && langKey.foul} 
                          </Typography>
                        }
                        className="scoreChip"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6} container alignItems="center">
                      <Grid item xs={12} container justifyContent="center">
                        <Typography mx={1} variant="h5">
                          0
                        </Typography>
                        <Grid item xs={8}>
                          <Divider
                            sx={{
                              "&::before, &::after": {
                                borderTop: "2px dotted black",
                              },
                            }}
                          >
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="center"
                              px={3}
                            >
                              <Typography>3 Point Shot</Typography>
                            </Grid>
                          </Divider>
                        </Grid>
                        <Typography mx={1} variant="h5">
                          0
                        </Typography>
                      </Grid>
                      <Grid item xs={12} container justifyContent="center">
                        <Typography mx={1} variant="h5">
                          0
                        </Typography>
                        <Grid item xs={8}>
                          <Divider
                            sx={{
                              "&::before, &::after": {
                                borderTop: "2px dotted black",
                              },
                            }}
                          >
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="center"
                              px={3}
                            >
                              <Typography>3 Point Shot</Typography>
                            </Grid>
                          </Divider>
                        </Grid>
                        <Typography mx={1} variant="h5">
                          0
                        </Typography>
                      </Grid>
                      <Grid item xs={12} container justifyContent="center">
                        <Typography mx={1} variant="h5">
                          0
                        </Typography>
                        <Grid item xs={8}>
                          <Divider
                            sx={{
                              "&::before, &::after": {
                                borderTop: "2px dotted black",
                              },
                            }}
                          >
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="center"
                              px={3}
                            >
                              <Typography>3 Point Shot</Typography>
                            </Grid>
                          </Divider>
                        </Grid>
                        <Typography mx={1} variant="h5">
                          0
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      p={2}
                      container
                      flexDirection="column"
                      alignItems="flex-end"
                      justifyContent="space-between"
                    >
                      <Chip
                        label={
                          <Typography p={1} fontWeight="bold">
                            { langKey && langKey.pause} 
                          </Typography>
                        }
                        className="scoreChip"
                        variant="outlined"
                      />
                      <Chip
                        label={
                          <Typography p={1} fontWeight="bold">
                           { langKey && langKey.foul} 
                          </Typography>
                        }
                        className="scoreChip"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            minHeight="400px"
          >
            Item Two
          </TabPanel>
        </SwipeableViews>
      </Grid>
    </>
  );
}
