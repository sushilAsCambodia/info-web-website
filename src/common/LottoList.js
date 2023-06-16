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



// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

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
  return (
    <>
    
      <Box sx={{ maxWidth: { sm: 230 } }} className="lottotablist">
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        style={{
          paddingTop:"10px"
        }}
        
      >
           {lottos?.map((item, index) => {
          return (
            <Grid key={index} >
        <Tab label={item.num} className="tbsbutton"  sx={{background:item.color,width:'25px',height:'25px',borderRadius:'20px'}} />
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

  const lottos = { numbers: [12, 32, 4, 5, 12, 34], winner: 34 };
const lottery_result=lottery && lottery.latest_result

  return (
    <>
      <div
        style={{
          paddingRight: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            border: "1px solid #ddd",
            marginY: "5px",
            width: "300px",
            overflow: "auto",
          }}
        >
          <Grid
            sx={{ fontSize: "15px", borderBottom: "1px solid #ddd" }}
            px={1}
          >
          {/* {item?.opendate} */}
          {/* 2023-06-01 21:30:00 */}
          { moment(lottery && lottery.created_at).format('YYYY-MM-DD h:s')}
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
            subheader= {lottoBalls(lottery_result  && lottery_result.result_data
)} 
          />
                  

        </Card>
      </div>
    </>
  );
}
