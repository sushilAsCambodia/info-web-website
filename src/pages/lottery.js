import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import LotteryCard from "@/components/lottery/LoteryCard";
import LotteryHistoryCard from "@/components/lottery/LotteryHistoryCard";
import NoSsr from "@mui/base/NoSsr";
import { Icon } from "@iconify/react";

import router from "next/router";
import MatchWithDates from "@/components/match/MatchWithDates";
import MatchWithRounds from "@/components/match/MatchWithRounds";

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

export default function Lottery() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <NoSsr>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            position: "fixed",
            top: 40,
            width: "100%",
            background: "#fff",
            zIndex: 9,
          }}
        >
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            textTransform="capitalize"
            onChange={handleChange}
            aria-label="basic tabs example"
         
            TabIndicatorProps={{
              style: {
                background: "#FF6F31",
                textTransform:"capitalize"
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
            <Tab className="lotterytab" label="Guānzhù" {...a11yProps(0)} />
            <Tab className="lotterytab" label="History" {...a11yProps(1)} />
            <Tab className="lotterytab" label="Soccer" {...a11yProps(2)} />
            <Tab className="lotterytab" label="Basket Ball" {...a11yProps(3)} />
            <Tab className="lotterytab" label="xxx Cǎixxx" {...a11yProps(4)} />
          </Tabs>
          {value == 1 ? '':
         <> <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #FF0000 0%, #FF6E31 100%)",
              position: "absolute",
              right: 10,
              top: 20,
              color: "#fff",
              height: 30,
              width: 58,
              zIndex: 9,
             
              transform: "translate(0, -38%)",
            }}
           
          >
            <Typography
              component="span"
              sx={{
                whiteSpace: "nowrap",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.541693 1.67498C2.22503 3.83331 5.33336 7.83331 5.33336 7.83331V12.8333C5.33336 13.2916 5.70836 13.6666 6.16669 13.6666H7.83336C8.29169 13.6666 8.66669 13.2916 8.66669 12.8333V7.83331C8.66669 7.83331 11.7667 3.83331 13.45 1.67498C13.5455 1.55196 13.6046 1.40459 13.6204 1.24965C13.6363 1.09472 13.6083 0.938442 13.5397 0.798622C13.4711 0.658803 13.3646 0.541057 13.2324 0.458793C13.1001 0.376529 12.9474 0.333053 12.7917 0.333314H1.20003C0.50836 0.333314 0.116693 1.12498 0.541693 1.67498Z"
                  fill="white"
                />
              </svg>
              &nbsp; Filter
            </Typography>
          </Button></>}
        </Box>
        <TabPanel value={value} index={0}>
          <Grid
            item
            xs={12}
            style={{
              backgroundImage: "url('/assets/stadium.png')",
              height: 150,
              position: "relative",
            }}
          >
            <span
              style={{
                background: "rgba(0, 0, 0, 0.7)",
                position: "absolute",
                height: "100%",
                width: "100%",
              }}
            ></span>
              <Grid
            item
            xs={12}
            style={{
              padding: 10,
              position: "absolute",
              top: 50,
              width: "100%",
            }}
          >
            <LotteryCard />
            <Box height={12}></Box>
            <LotteryCard /> 
            <Box height={12}></Box>
            <LotteryCard />
            <Box height={12}></Box>
            <LotteryCard />
            <Box height={12}></Box>
            <LotteryCard />
            <Box height={12}></Box>
            <LotteryCard />
          </Grid>
          </Grid>
        
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: "50px", padding: 10 }}
          >
            <Typography>Super Loto 2390</Typography>
            <Grid >
              {/* <Button
               size="small"
               textTransform="capitalize !important"
                variant="outlined"
                sx={{ border: "1px solid #ddd",  color: "#8C8C8C", textTransform:"capitalize !important" }}
                onClick={()=>{router.push('/games')}}
              >
                <Icon width={15} icon="icon-park-solid:game-ps" />
                <Typography fontSize="12px">Games</Typography>
              </Button> */}

              <Button
             size="small"
             textTransform="capitalize !important"
              variant="outlined"
              sx={{ border: "1px solid #ddd",  color: "#8C8C8C", textTransform:"capitalize !important" }}
              onClick={()=>{router.push('/games')}}
           
          >
            <Typography
              component="span"
              sx={{
                whiteSpace: "nowrap",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
               <path d="M5.5 0.25H1C0.801088 0.25 0.610322 0.329018 0.46967 0.46967C0.329018 0.610322 0.25 0.801088 0.25 1V5.5C0.25 5.69891 0.329018 5.88968 0.46967 6.03033C0.610322 6.17098 0.801088 6.25 1 6.25H5.5C5.69891 6.25 5.88968 6.17098 6.03033 6.03033C6.17098 5.88968 6.25 5.69891 6.25 5.5V1C6.25 0.801088 6.17098 0.610322 6.03033 0.46967C5.88968 0.329018 5.69891 0.25 5.5 0.25ZM13 7.75H8.5C8.30109 7.75 8.11032 7.82902 7.96967 7.96967C7.82902 8.11032 7.75 8.30109 7.75 8.5V13C7.75 13.1989 7.82902 13.3897 7.96967 13.5303C8.11032 13.671 8.30109 13.75 8.5 13.75H13C13.1989 13.75 13.3897 13.671 13.5303 13.5303C13.671 13.3897 13.75 13.1989 13.75 13V8.5C13.75 8.30109 13.671 8.11032 13.5303 7.96967C13.3897 7.82902 13.1989 7.75 13 7.75ZM10.75 0.25C9.0955 0.25 7.75 1.5955 7.75 3.25C7.75 4.9045 9.0955 6.25 10.75 6.25C12.4045 6.25 13.75 4.9045 13.75 3.25C13.75 1.5955 12.4045 0.25 10.75 0.25ZM3.25 7.75C1.5955 7.75 0.25 9.0955 0.25 10.75C0.25 12.4045 1.5955 13.75 3.25 13.75C4.9045 13.75 6.25 12.4045 6.25 10.75C6.25 9.0955 4.9045 7.75 3.25 7.75Z" fill="#8C8C8C"/>
              </svg>
              &nbsp; Games
            </Typography>
          </Button>


            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: 10 }}>
            <LotteryHistoryCard />
            <Box height={12}></Box>
            <LotteryHistoryCard />
            <Box height={12}></Box>
            <LotteryHistoryCard />
            <Box height={12}></Box>
            <LotteryHistoryCard />
            <Box height={12}></Box>
            <LotteryHistoryCard />
            <Box height={12}></Box>
            <LotteryHistoryCard />
            <Box height={12}></Box>
            <LotteryHistoryCard />
            <Box height={12}></Box>
            <LotteryHistoryCard />
            <Box height={12}></Box>
            <LotteryHistoryCard />
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MatchWithDates />  
        </TabPanel>
        <TabPanel value={value} index={3}>
        <MatchWithRounds />
        </TabPanel>
        <TabPanel value={value} index={4}>
          Shíshí Cǎi
        </TabPanel>
      </Box>
    </NoSsr>
  );
}
