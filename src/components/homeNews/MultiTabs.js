import { useEffect, useState } from "react";
import {
  Grid, 
} from "@mui/material";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import DataTabComponent from "./DataTabComponent";
import { useSelector } from "react-redux";
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

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #D9D9D9',
});
export default function MultiTabs(props) {
  const { categories,lang_id } = props;
  const [value, setValue] = useState(0); 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 
  // reset tab if lang changed
  useEffect(() => {
    setValue(0);
  },[lang_id]); 

  const viewport_height= window.innerHeight;

  const {advertises} = useSelector((state) => state.advertise);

  return (categories && categories.length > 0) && (
    <Grid
      item
      xs={12}
      container
      alignContent="flex-start"
      alignItems="center"
      // overflow="auto"
      className="multitabs" 
     
      >
      <Grid item xs={12}>
        <Grid container >
          <Grid item xs={12} justifyContent="center" sx={{background:"white", }}  >
            <AntTabs 
            id="news-multiTabs"
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              aria-label="visible arrows tabs example"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3, },
                },
                '& .MuiTabs-indicator':{
                  background: 'linear-gradient(90deg, #FF0000 0%, #FF6F31 100%)'
                },
                // borderBottom: '1px solid #e8e8e8',

              }}>
              { categories.map((category, index) => <Tab id='test' key={index} label={category.translation ? category.translation?.category_name : (category.category_name||'N/A')} />)}
            </AntTabs>
          
            { categories.map((category,index) => {
                return (
                  <TabPanel key={index} value={value} index={index}>
                    <Grid sx={{overflow:"auto", height:advertises?.length > 0 ?`${viewport_height/21}vh`:`50vh`}}>
                    {/* <Grid sx={{overflow:"auto", height:`50vh`}}> */}
                    <DataTabComponent id={category?.id} lang_id={lang_id}/>
                    </Grid>
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
