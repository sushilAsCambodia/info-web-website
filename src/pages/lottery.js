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

import router, { useRouter } from "next/router";
import MatchWithDates from "@/components/match/MatchWithDates";
import MatchWithRounds from "@/components/match/MatchWithRounds";
import FavouritePage from "@/components/favourite/FavouritePage";
import { getLotteryCategory,getLotteryResultByCategory } from "@/store/actions/lotteryActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import utils from "@/common/utils";
import DataLoading from "@/components/DataLoading";
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
  const { i18n } = useTranslation();
  const {loading, lotteryCategories = [], lotteryResults = []} = useSelector(state => state.lottery)
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const onChangeTab = (hash) => {
    router.replace(`${router.route}#${hash}`)
  }
  const handleGetCategory = React.useCallback(() => {
    dispatch(
      getLotteryCategory({
        params: {
          lang_id:utils.convertLangCodeToID(i18n.language)
        }
      })
    ); 
  },[dispatch,i18n.language]);
  const handleGetLotteryResult = React.useCallback((categoryId = undefined) => {
    dispatch(
      getLotteryResultByCategory({
        params: {
          lang_id:utils.convertLangCodeToID(i18n.language),
          category_id: categoryId
        }
      })
    ); 
  },[dispatch,i18n.language]);
  React.useEffect(() => {
    handleGetCategory();
  },[handleGetCategory]);
  React.useEffect(() => {
    console.log(lotteryCategories,'alotteryCategories:::')
  },[lotteryCategories])
  React.useEffect(() => {
    console.log('value',value)
    if(value >= 0) {
      let hash = '';
      const lotteryCategory = lotteryCategories[value - 1] || {};
      if(Object.keys(lotteryCategory).length) {
        hash = '#'+(lotteryCategory?.translation?.translation);
      }
      // router.replace(`${router.route}${hash}`)
        handleGetLotteryResult(lotteryCategory?.id);
    }
  },[value]);
  return (
    <NoSsr>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            
           boxShadow:"0px 1px 4px rgba(0, 0, 0, 0.1)",
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
            <Tab  className="lotterytab" label="all" {...a11yProps(0)}/>
            {
              lotteryCategories.map((lc,index) => {
                return (
                  <Tab key={index} className="lotterytab" label={lc?.translation?.translation} {...a11yProps((index+1))}/>
                )
              })
            }
            {/* <Tab className="lotterytab" label="Guānzhù" {...a11yProps(0)}/>
            <Tab className="lotterytab" label="History" {...a11yProps(1)}/>
            <Tab className="lotterytab" label="Soccer" {...a11yProps(2)}/>
            <Tab className="lotterytab" label="Basket Ball" {...a11yProps(3)}/>
            <Tab className="lotterytab" label="xxx Cǎixxx" {...a11yProps(4)}/>
            <Tab className="lotterytab" label="Favourite" {...a11yProps(5)}/> */}
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
            {
              loading ? <DataLoading/> : (
                lotteryResults.map((lr,key) => {
                  return (
                    <div key={key}>
                      <LotteryCard lottery={lr}/>
                      <Box height={12}></Box> 
                    </div>
                  );
                })
              )
            }
          </Grid>
          </Grid>
        </TabPanel>
        {
          lotteryCategories.map((lc,index) => {
            return (
              <TabPanel key={index} value={value} index={(index+1)}>
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
                  {
                    loading ? <DataLoading/> : (
                      lotteryResults.map((lr,key) => {
                        return (
                          <div key={key}>
                            <LotteryCard lottery={lr}/>
                            <Box height={12}></Box> 
                          </div>
                        );
                      })
                    )
                  }
                </Grid>
                </Grid>
              </TabPanel>
            )
          })
        }
      </Box>
    </NoSsr>
  );
}
