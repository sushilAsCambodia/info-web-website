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
import utils from "@/common/utils";

import Slider from "react-slick";
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import moment from 'moment/min/moment-with-locales'
import useMediaQuery from "@mui/material/useMediaQuery";


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
export function lottoGrid(lottos) {
  

  return (
    <>
      <Grid
        container
        width="max-content"
        border="1px solid #ddd"
        borderRadius="10px"
        className="lottoGrid"
      >
        {lottos.numbers.map((lotto, index) => {
          return (
            <Grid
              key={index}
              px={1}
              className={`${lotto === lottos.winner ? "hitLotto" : ""}`}
            >
              {lotto}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
export function lottoBalls(lottos) {


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
}; 
  return (
    <>
    
      <Box  sx={{
        flexGrow: 1,
        maxWidth: {sm:260, md: 230,lg:240,xl:230 },
        bgcolor: 'background.paper',
      }} 
      className="lottotablist">
      <Tabs
        variant="scrollable"
        style={{
          paddingTop:"5px",
        
        }}
          onChange={handleChange}
          value={value}
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#ff000000",
          },
          
        }}


      >
           {lottos?.map((item, index) => {
          return (
            <Grid key={index} >
        <Tab label={item.num} className="tbsbutton"  sx={{background:item.color,width:'25px',height:'25px',borderRadius:'20px'}} {...a11yProps(index)} />
        </Grid>
        );
      })}
      </Tabs>
    </Box>



    </>
  );
}
export default function LottoList({lottery}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  //const { item } = props;

  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [newsList, setNewsList] = useState([]);

  const matches = useMediaQuery("(max-width:950px)");

const lottery_result=lottery && lottery.latest_result

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          px:'5px'
        }}
      >
        <Card
          sx={{
            border: "1px solid #ddd",
            marginY: "5px",
            width: {xs:'340px', lg:"300px"},
            overflow: "auto",
            
          }}
        >
          <Grid
            sx={{ fontSize: "15px", backgroundColor:"#F9F9F9", borderBottom: "1px solid #ddd" }}
            padding={'5px 10px'}
          >
          {/* {item?.opendate} */}
          {/* 2023-06-01 21:30:00 */}

       <Typography color={'#555555'} fontSize={'15px'} fontWeight={'500'}>
       {moment(lottery && lottery.opendate).locale(utils.localChange(i18n.language)).format(utils.lotteryLatestResult)}
       </Typography>

          </Grid>
          <CardHeader
            sx={{ padding: "10px" }}
            className="cardhead"
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
            title={
              <Typography fontSize="13px" fontWeight="bold">
                {/* {item?.lotterycode} */}
                {lottery && lottery.translation && lottery.translation.translation}      {lottery_result && lottery_result.issue}                
              </Typography>
            }
            subheader= {!matches ? lottoBalls(lottery_result  && lottery_result.result_data):''} 
          />
                  {matches ? lottoBalls(lottery_result  && lottery_result.result_data):''}

        </Card>
      </Grid>
    </>
  );
}
