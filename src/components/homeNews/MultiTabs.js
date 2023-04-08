/* eslint-disable prettier/prettier */
import { useState } from "react";
import {
  Grid, 
} from "@mui/material";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from "prop-types";
import DataTabComponent from "./DataTabComponent";
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



export default function MultiTabs(props) {
  const { categories } = props;
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 
  return (categories && categories.length > 0) && (
    <Grid
      item
      xs={12}
      container
      alignContent="flex-start"
      alignItems="center"
      overflow="auto"
      className="multitabs">
      <Grid item xs={12} paddingTop="10px">
        <Grid container >
          <Grid item xs={12} justifyContent="center" >
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
              }}>
              { categories.map((category, index) => <Tab key={index} label={category.translation ? category.translation?.category_name : (category.label||'N/A')} />)}
            </Tabs>
          </Grid>
          <Grid xs={12} item>
            { categories.map((category,index) => {
                return (
                  <TabPanel key={index} value={value} index={index}>
                    <DataTabComponent id={category?.id}/>
                  </TabPanel>
                );
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
