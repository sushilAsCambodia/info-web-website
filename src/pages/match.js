import * as React from "react";
import { useEffect, useState } from 'react';

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
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
import Events from "./events";
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

  const [mounted,setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)
  },[]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [age, setAge] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  function Last6Days() {
    var result = [];
    for (var i = 0; i < 6; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push({
        day: moment(d).format(utils.dateLetter),
        DateMonth: moment(d).format(utils.DateMonthFormat),
      });
    }
    console.log("::: 7 days ", result);
    return result;
  }
  return (
  <>  {mounted &&
    <NoSsr>
      <Grid>
        <Grid
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            position: "fixed",
            top: 56,
            width: "100%",
            background: "#fff",
            zIndex: 9,
          }}
          container
          alignItems="center"
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
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Events" {...a11yProps(1)} />
            <Tab label="Category 2" {...a11yProps(2)} />
            <Tab label="Category 3" {...a11yProps(3)} />
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
              onClick={() => {
                console.log("refreshed:::");
              }}
              width={25}
              icon="material-symbols:refresh"
            />
            <Divider
              sx={{
                border: "1px solid white",
              }}
              orientation="vertical"
              flexItem
            />

            <Icon
              color="white"
              onClick={() => {
                console.log("filter:::");
              }}
              width={25}
              icon="material-symbols:filter-alt-outline"
            />
          </Grid>
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
            <Grid container borderBottom="1px solid #ddd" pb={1}>
              <Grid item xs={9} container >
                {Last6Days().map((item, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      xs={"auto"}
                      textAlign="center"
                      className={`${
                        item.day === dateFilter ? "dateSelected" : ""
                      }`}
                      onClick={() => {
                        setDateFilter(item.day);
                      }}
                      sx={{ borderRight: "1px solid #ddd" }}
                    >
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "12px" }}
                        mr={1}
                      >
                        {item.day}
                      </Typography>
                      <Typography mr={1} sx={{ fontSize: "12px" }}>
                        {item.DateMonth}
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                    </Grid>
                  );
                })}
              </Grid>
              <Grid
                item
                xs={3}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <FormControl size="small">
                  <Select
                    value={age}
                    onChange={(e) => {
                      console.log("select:::", e.target.value);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ paddingLeft: "5px", fontSize: "12px" }}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon
                          icon="material-symbols:calendar-today"
                          width={20}
                        />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  {/* <FormHelperText>Without label</FormHelperText> */}
                </FormControl>
              </Grid>
            </Grid>
            <Grid pt={1}>
              {" "}
              <MatchItem />
              <MatchItem />
              <MatchItem />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid sx={{minHeight:"50px"}}></Grid>
          <Events />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Shíshí Cǎi
        </TabPanel>
        <TabPanel value={value} index={3}>
          Shíshí Cǎi
        </TabPanel>
      </Grid>
    </NoSsr>
  }</>
  );
}
