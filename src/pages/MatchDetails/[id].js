import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBackDrop from "../../components/LoadingBackDrop";
import utils from "@/common/utils";
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
import { Padding } from "@mui/icons-material";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import api from "@/services/http";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";




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
    minHeight: 'fit-content !important',
    padding: '5px 0px 5px 0px'
  }
});


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
  const { t,i18n } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:768px)");

  const router = useRouter();
    const dispatch = useDispatch();
  const { id } = router.query;
  const { status } = router.query;
  const [filterValue, setFilterValue] = useState("all");
  const [selected, setSelected] = useState([]); 
  const [loading, setLoading] = useState([]);
  const [details, setDetails] = useState({});
  const [infodetails, setInfoDetails] = useState({});
  const [infodetailsText, setInfoDetailsText] = useState({});
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
  const lang_ids= utils.convertLangCodeToID(i18n.language)
  let lang_id=lang_ids===2?lang_ids:1
  const handleSelectFilter = (value) => {
    setFilterValue(value);
  };
  const params = useParams();
// if(id){
//   console.log("paramsparamsparams",id);
// }
// if(status){
//   console.log("statusstatusstatus",status);
// }
  async function matchDetails (){
    setLoading(true)
    if(id){

    try {
      // const response = await api.get(`lotto/football-matches/live-team-statistic?match_id=430119`);
      const response = await api.get(`lotto/football-matches/live-team-statistic?match_id=${id}&lang_id=${lang_id}`)
      if(response && response.data){
        setDetails(response && response.data && response.data.data)
       // setLoading(false)
      //console.log("responseresponseresponse",response && response.data && response.data.data && response.data.data.match)
      }
      // const responseInfo = await api.get(`lotto/football-matches/live-info-list?match_id=430119`);
      const responseInfo = await api.get(`lotto/football-matches/live-info-list?match_id=${id}&lang_id=${lang_id}`);
      if(responseInfo && responseInfo.data){
        setInfoDetails(responseInfo && responseInfo.data && responseInfo.data.data)
        //setLoading(false)
      //console.log("responseresponseresponse",response && response.data && response.data.data && response.data.data.match)
      }
      // const responseText = await api.get(`lotto/football-matches/live-text-list?match_id=430119`);
      const responseText = await api.get(`lotto/football-matches/live-text-list?match_id=${id}&lang_id=${lang_id}`);
      if(responseText && responseText.data){
        setInfoDetailsText(responseText && responseText.data && responseText.data.data)
        setLoading(false)
      //console.log("responseresponseresponse",response && response.data && response.data.data && response.data.data.match)
      }


      
     
    }catch (error) {
     return console.log("error")
    }
}
  }
 

  function CustomTabPanel(props) {
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
          <Box>
            { !matches ?
            <Grid className="center-children">{children}</Grid> 
            :
            <Grid className="">{children}</Grid>
          }
          </Box>
        )}
      </div>
    );
  }
  

  useEffect(() => {
    matchDetails()
    
  }, [selected,id,status,lang_id]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('matches',matches)
  return !matches ? (
     <>
       {/* web screen */}
    <Grid container>
      <MatchDetailHeader details={details} status={status} />
      {loading &&<LoadingBackDrop loading={loading} />}
      <Box sx={{ width: '100%' }} >
      <Grid item xs={12} className="sticky-header"  sx={{zIndex:'9', background:"#F3F3F3", borderWidth:"0.5px 0px", borderColor:"#DDDDDD", borderStyle:"solid", paddingBottom:"0px", }}>
        <Grid py={1} container justifyContent="center">
      <HeaderTabs value={value} onChange={handleChange} >
            <Tab className="matchtab" label={langKey && langKey.Info} {...a11yProps(0)} />
            <Tab className="matchtab" label={langKey && langKey.LiveText} {...a11yProps(1)} />
            <Tab className="matchtab" label={langKey && langKey.Statics} {...a11yProps(2)} />
      </HeaderTabs>
    </Grid>
      </Grid>
      <CustomTabPanel value={value} index={0}>
        <Grid className="border-color" >
      <MatchVerticleChart details={details} InfoDetails={infodetails} lang_id={lang_id} />
      </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Grid className="border-color1">
      <MatchDetailLiveText  details={details} InfoDetailsText={infodetailsText} />
      </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <Grid className="border-color1">
      <MatchStats details={details} />
      </Grid>
      </CustomTabPanel>
    </Box>
    </Grid>
    </>
) : (
  <>
    {/* mobile screen */}
   <Grid container>
      <MatchDetailHeader details={details} status={status} />
      {loading &&<LoadingBackDrop loading={loading} />}
      <Box sx={{ width: '100%' }} >
      <Grid item xs={12} className="sticky-header"  sx={{zIndex:'9', background:"#F3F3F3", borderWidth:"0.5px 0px", borderColor:"#DDDDDD", borderStyle:"solid", paddingBottom:"0px", }}>
        <Grid py={1} container justifyContent="center">
      <HeaderTabs value={value} onChange={handleChange} >
            <Tab className="matchtab" label={langKey && langKey.Info} {...a11yProps(0)} />
            <Tab className="matchtab" label={langKey && langKey.LiveText} {...a11yProps(1)} />
            <Tab className="matchtab" label={langKey && langKey.Statics} {...a11yProps(2)} />
      </HeaderTabs>
    </Grid>
      </Grid>
      <CustomTabPanel value={value} index={0}>
      <Grid className="border-color-mobile" paddingBottom={'50px'}>
      <MatchVerticleChart details={details} InfoDetails={infodetails} lang_id={lang_id} />
      </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <MatchDetailLiveText  details={details} InfoDetailsText={infodetailsText} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <MatchStats details={details} />
      </CustomTabPanel>
    </Box>
    </Grid>
  </>
  );
}
