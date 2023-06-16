import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Button, Link } from "@mui/material";
import { Grid, Card, CardHeader } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getNewsByCategory } from "@/store/actions/newsActions";
import moment from "moment/moment";
import Slider from "react-slick";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnFocus: true,
  arrows: false,
  lazyLoad: false,
  centerMode: false,
};

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
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


export default function LottoListComp({lottery}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const lottos = { numbers: [12, 32, 4, 5, 12, 34], winner: 34 };
  const lottery_result=lottery && lottery.latest_result

 

  return (
    <>
   <Card sx={{ maxWidth: 345 }} style={{padding:"0px", margin:"5px", marginTop:"10px"}}>
<Grid padding={1} style={{background:"#F9F9F9"}}>{ moment(lottery && lottery.created_at).format('YYYY-MM-DD h:s')}</Grid>
    <Divider />
<Grid sx={12} display={'flex'}>
<Grid sx={2}>
  <CardHeader style={{padding:"16px 0px 16px 10px"}}
   avatar={
    <Grid
      sx={{
        background: "#FFE0E0",
        borderRadius: "50%",
        width: "38px",
        height: "38px",
      }}
      textAlign="center"
    >
      <picture>
        {lottery && lottery.icon?
        <img
          width="100%"
          height="100%"
          alt="supper-logo"
          src={lottery && lottery.icon}
        />:<img
        width="100%"
        height="100%"
        alt="supper-logo"
        src="/assets/Logo/superlotto-logo.png"
      />}
      </picture>
    </Grid>
  }
  />
</Grid>
<Grid sx={10}>
<Grid sx={12}>
<Typography>
          <CardHeader style={{padding:"16px 0px 0px 0px"}}
            title={
              <Typography fontSize="13px" fontWeight="bold">
                {lottery && lottery.translation && lottery.translation.translation}      {lottery_result && lottery_result.issue}                
              </Typography>
            }
          />
</Typography>
<Typography>


<Box sx={{ maxWidth: { sm: 240 }, bgcolor: 'background.paper' }}>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="11" />
        <Tab label="22" />
        <Tab label="33" />
        <Tab label="44" />
        <Tab label="55" />
        <Tab label="66" />
        <Tab label="77" />
      </Tabs>
    </Box>


</Typography>
</Grid>
</Grid>
</Grid>
     
      
    </Card>
     
    </>
  );
}
