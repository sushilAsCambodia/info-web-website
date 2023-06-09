import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import GamesInfo from "@/components/gamesMobilePage/gamesInfo";
import utils from "@/common/utils";
import NoSsr from "@mui/base/NoSsr";
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

export default function Games() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <NoSsr>
      <Grid>
        <Grid
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            position: "fixed",
            // top: 56,
            width: "100%",
            background: "#fff",
            zIndex: 9,
          }}
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
              width: "100%",
              position: "relative",
              "& .Mui-selected": {
                color: "#000 !important",
                fontWeight: "bold",
              },
            }}
          >
            <Tab className="gametab" label="All" {...a11yProps(0)} />
            <Tab className="gametab" label="Category 1" {...a11yProps(1)} />
            <Tab className="gametab" label="Category 2" {...a11yProps(2)} />
            <Tab className="gametab" label="Category 3" {...a11yProps(3)} />
            <Tab className="gametab" label="Category 4" {...a11yProps(4)} />
            <Tab className="gametab" label="Category 5" {...a11yProps(5)} />
          </Tabs>
     
        </Grid>
        <TabPanel value={value} index={0} style={{ position: "relative" }}>
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
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`Sydney Super Lotto`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Big Win football`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`American Dream Football Lottery`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`Sydney Super Lotto`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} style={{ position: "relative" }}>
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

            <GamesInfo name={utils.subString(`American Dream Football Lottery`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`Sydney Super Lotto`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} style={{ position: "relative" }}>
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

            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Big Win football`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`American Dream Football Lottery`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`Sydney Super Lotto`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={3} style={{ position: "relative" }}>
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
        
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Big Win football`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`American Dream Football Lottery`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`Sydney Super Lotto`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={4} style={{ position: "relative" }}>
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
            <GamesInfo name={utils.subString(`Sydney Super Lotto`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Big Win football`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`American Dream Football Lottery`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`Sydney Super Lotto`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={5} style={{ position: "relative" }}>
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
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`Sydney Super Lotto`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Big Win football`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`American Dream Football Lottery`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`Sydney Super Lotto`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`Red Wacky League Antlez Broke the Stereo Neon Tide Bring Back Honesty`,50)} favourite={true}/>
            <GamesInfo name={utils.subString(`My Rocking Football 11`,50)} favourite={false}/>
            <GamesInfo name={utils.subString(`My Circle 11`,50)} favourite={false}/>
          </Grid>
        </TabPanel>
      </Grid>
    </NoSsr>
  );
}
