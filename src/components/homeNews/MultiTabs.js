/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Button,
  List,
  ListItemButton,
  IconButton,
  Container,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Card,
  Link,
  Skeleton,
} from "@mui/material";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from "prop-types";
import Router from "next/router";
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
          <Grid>
            {children}
          </Grid>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };



export default function MultiTabs({ _setPage }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const goToNewsCardDetails = () => {
      Router.push("/NewsCardDetails");
  };

  return (
    <Grid
      item
      xs={12}
      container
      alignContent="flex-start"
      alignItems="center"
      overflow="auto"
      className="multitabs"
    >
      <Grid item xs={12} paddingTop="10px">
        <Grid container >
          <Grid item xs={12}  justifyContent="center" >
          <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        <Tab label="Zuìxīn" />
        <Tab label="Rèmén" />
        <Tab label="Wǔháng" />
        <Tab label="Xīngzuò" />
        <Tab label="Zhǔtí" />
        <Tab label="Fēnggé" />
      </Tabs>


          </Grid>
          <Grid xs={12} item>
            <TabPanel value={value} index={0}>
            <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                  <List padding="0px">
                    <ListItem sx={{ padding: "10px 0px 10px 0px", borderBottom:'1px solid #D9D9D9;' }} onClick={goToNewsCardDetails}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "8px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} display="flex" alignItems="center">
                      <img
                        src="./assets/NewsJourney/tabcard1.png"
                        width="80px"
                        height="55px"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                          <Typography textAlign="left"  fontSize="11px !important">
                          15/04/2023
                          </Typography>
                        </Grid>
                       
                      </Grid>
                    </Grid>
                  </Grid>
                    </ListItem>
                    <ListItem sx={{ padding: "10px 0px 10px 0px", borderBottom:'1px solid #D9D9D9;' }} onClick={goToNewsCardDetails}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "8px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} display="flex" alignItems="center">
                      <img
                        src="./assets/NewsJourney/tabcard2.png"
                        width="80px"
                        height="55px"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                          <Typography textAlign="left"  fontSize="11px !important">
                          15/04/2023
                          </Typography>
                        </Grid>
                       
                      </Grid>
                    </Grid>
                  </Grid>
                    </ListItem>
                    <ListItem sx={{ padding: "10px 0px 10px 0px", borderBottom:'1px solid #D9D9D9;' }} onClick={goToNewsCardDetails}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "8px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} display="flex" alignItems="center">
                      <img
                        src="./assets/NewsJourney/tabcard3.png"
                        width="80px"
                        height="55px"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                          <Typography textAlign="left"  fontSize="11px !important">
                          15/04/2023
                          </Typography>
                        </Grid>
                       
                      </Grid>
                    </Grid>
                  </Grid>
                    </ListItem>
                  
             
            </List>
            </Grid>
            </TabPanel>

            <TabPanel value={value} index={1}>
            <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                  <List padding="0px">
                    <ListItem sx={{ padding: "10px 0px 10px 0px", borderBottom:'1px solid #D9D9D9;' }} onClick={goToNewsCardDetails}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "8px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} display="flex" alignItems="center">
                      <img
                        src="./assets/NewsJourney/tabcard2.png"
                        width="80px"
                        height="55px"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                          <Typography textAlign="left"  fontSize="11px !important">
                          15/04/2023
                          </Typography>
                        </Grid>
                       
                      </Grid>
                    </Grid>
                  </Grid>
                    </ListItem>
                    <ListItem sx={{ padding: "10px 0px 10px 0px", borderBottom:'1px solid #D9D9D9;' }} onClick={goToNewsCardDetails}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "8px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} display="flex" alignItems="center">
                      <img
                        src="./assets/NewsJourney/tabcard3.png"
                        width="80px"
                        height="55px"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                          <Typography textAlign="left"  fontSize="11px !important">
                          15/04/2023
                          </Typography>
                        </Grid>
                       
                      </Grid>
                    </Grid>
                  </Grid>
                    </ListItem>
            </List>
            </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                  <List padding="0px">
                    <ListItem sx={{ padding: "10px 0px 10px 0px", borderBottom:'1px solid #D9D9D9;' }} onClick={goToNewsCardDetails}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "8px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} display="flex" alignItems="center">
                      <img
                        src="./assets/NewsJourney/tabcard3.png"
                        width="80px"
                        height="55px"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                          <Typography textAlign="left"  fontSize="11px !important">
                          15/04/2023
                          </Typography>
                        </Grid>
                       
                      </Grid>
                    </Grid>
                  </Grid>
                    </ListItem>
            </List>
            </Grid>
            </TabPanel>

            <TabPanel value={value} index={3}>
            <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                  <List padding="0px">
                    <ListItem sx={{ padding: "10px 0px 10px 0px", borderBottom:'1px solid #D9D9D9;' }} onClick={goToNewsCardDetails}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "8px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} display="flex" alignItems="center">
                      <img
                        src="./assets/NewsJourney/tabcard2.png"
                        width="80px"
                        height="55px"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                          <Typography textAlign="left"  fontSize="11px !important">
                          15/04/2023
                          </Typography>
                        </Grid>
                       
                      </Grid>
                    </Grid>
                  </Grid>
                    </ListItem>
                    <ListItem sx={{ padding: "10px 0px 10px 0px", borderBottom:'1px solid #D9D9D9;' }} onClick={goToNewsCardDetails}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "8px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} display="flex" alignItems="center">
                      <img
                        src="./assets/NewsJourney/tabcard3.png"
                        width="80px"
                        height="55px"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                          <Typography textAlign="left"  fontSize="11px !important">
                          15/04/2023
                          </Typography>
                        </Grid>
                       
                      </Grid>
                    </Grid>
                  </Grid>
                    </ListItem>
            </List>
            </Grid>
            </TabPanel>

            <TabPanel value={value} index={4}>
            <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                  <List padding="0px">
                    <ListItem sx={{ padding: "10px 0px 10px 0px", borderBottom:'1px solid #D9D9D9;' }} onClick={goToNewsCardDetails}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "8px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} display="flex" alignItems="center">
                      <img
                        src="./assets/NewsJourney/tabcard3.png"
                        width="80px"
                        height="55px"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                          <Typography textAlign="left"  fontSize="11px !important">
                          15/04/2023
                          </Typography>
                        </Grid>
                       
                      </Grid>
                    </Grid>
                  </Grid>
                    </ListItem>
            </List>
            </Grid>
            </TabPanel>

            <TabPanel value={value} index={5}>
            <Grid item xs={12} sm={12} md={12} xl={12} padding="0px">
                  <List padding="0px">
                    <ListItem sx={{ padding: "10px 0px 10px 0px", borderBottom:'1px solid #D9D9D9;' }} onClick={goToNewsCardDetails}>
                  <Grid
                    item
                    xs={12}
                    sx={{ padding: "8px 0px", borderRadius: "5px" }}
                    boxShadow="none"
                    display="flex"
                    alignItems="center"
                  >
                    <Grid item xs={3} display="flex" alignItems="center">
                      <img
                        src="./assets/NewsJourney/tabcard3.png"
                        width="80px"
                        height="55px"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography fontWeight="600" fontSize="10px">The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...</Typography>
                          <Typography textAlign="left"  fontSize="11px !important">
                          15/04/2023
                          </Typography>
                        </Grid>
                       
                      </Grid>
                    </Grid>
                  </Grid>
                    </ListItem>
            </List>
            </Grid>
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
