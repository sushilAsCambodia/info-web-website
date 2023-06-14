import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import LotteryCard from "@/components/lottery/LoteryCard";
import NoSsr from "@mui/base/NoSsr";
import { Icon } from "@iconify/react";
import Image from "mui-image";
import router, { useRouter } from "next/router";
import MatchWithDates from "@/components/match/MatchWithDates";
import MatchWithRounds from "@/components/match/MatchWithRounds";
// import FavouritePage from "@/components/favourite/FavouritePage";
import {
  getLotteryCategory,
  getLotteryResultByCategory,
} from "@/store/actions/lotteryActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import utils from "@/common/utils";
import DataLoading from "@/components/DataLoading";
import { getFavouriteList } from "@/store/actions/favouriteActions";
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
  const {
    loading,
    lotteryCategories = [],
    lotteryResults = [],
  } = useSelector((state) => state.lottery);
  const langKey = useSelector((state) => state?.load_language?.language);
  const { customer = {} } = useSelector((state) => state?.auth);
  const { favouriteList = {} } = useSelector((state) => state?.favourite);

  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const [lotteryCategoryList, setLotteryCategoryList] = useState([]);
  const onChangeTab = (hash) => {
    router.replace(`${router.route}#${hash}`);
  };
  const handleGetCategory = React.useCallback(() => {
    dispatch(
      getLotteryCategory({
        params: {
          lang_id: utils.convertLangCodeToID(i18n.language),
        },
      })
    );
  }, [dispatch, i18n.language]);
  const handleGetLotteryResult = React.useCallback(
    (categoryId = undefined) => {
      dispatch(
        getLotteryResultByCategory({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            category_id: categoryId,
            member_id: customer.member_ID,
          },
        })
      );
    },
    [dispatch, i18n.language]
  );
  const allFavouriteList = React.useCallback(() => {
    dispatch(
      getFavouriteList({
        params: {
          lang_id: utils.convertLangCodeToID(i18n.language),
          member_id: customer.member_ID,
          pick: "favorite",
        },
        callback: (res) => {},
      })
    );
  },[dispatch, i18n.language])

  React.useEffect(() => {
    handleGetCategory();
  }, [handleGetCategory]);

  React.useEffect(() => {
    lotteryCategories.length >0 ? setLotteryCategoryList(lotteryCategories.filter(i => i.lottery_bind !== null)):''

  }, [lotteryCategories]);

  React.useEffect(() => {
    if (value > 1) {
      let hash = "";
      const lotteryCategory = lotteryCategoryList[value - 2] || {};
      if (Object.keys(lotteryCategory).length) {
        hash = "#" + lotteryCategory?.translation?.translation;
      }
      // router.replace(`${router.route}${hash}`)
      handleGetLotteryResult(lotteryCategory?.id);
    } else if (value == 1) {
      handleGetLotteryResult();
      console.log(":::value", value);
    } else if (value == 0) {
      allFavouriteList();
    }
  }, [value]);
  return (
    <NoSsr>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
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
            texttransform="capitalize"
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: {
                background: "#FF6F31",
                textTransform: "capitalize",
              },
            }}
            sx={{
              position: "relative",
              "& .Mui-selected": {
                color: "#000 !important",
                fontWeight: "bold",
              },
            }}
          >
            <Tab
              className="lotterytab"
              label={langKey?.favorites}
              {...a11yProps(0)}
            />
            <Tab
              className="lotterytab"
              label={langKey?.all}
              {...a11yProps(1)}
            />

            {lotteryCategoryList.map((lc, index) => {
              return (
                <Tab
                  key={index}
                  className="lotterytab"
                  label={lc?.translation?.translation}
                  {...a11yProps(index + 2)}
                />
              );
            })}
            {/* <Tab className="lotterytab" label="Guānzhù" {...a11yProps(0)}/>
            <Tab className="lotterytab" label="History" {...a11yProps(1)}/>
            <Tab className="lotterytab" label="Soccer" {...a11yProps(2)}/>
            <Tab className="lotterytab" label="Basket Ball" {...a11yProps(3)}/>
            <Tab className="lotterytab" label="xxx Cǎixxx" {...a11yProps(4)}/>
            <Tab className="lotterytab" label="Favourite" {...a11yProps(5)}/> */}
          </Tabs>
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
              {loading ? (
                <DataLoading />
              ) : favouriteList.length > 0 ? (
                favouriteList.map((lr, key) => {
                  return (
                    <div key={key}>
                      <LotteryCard lottery={lr} 
                      allFavourite={allFavouriteList} 
                      />
                      <Box height={12}></Box>
                    </div>
                  );
                })
              ) : (
                <Grid pt={1} style={{ marginTop: "40%" }} height="100vh">
                  <Image
                    alt="not_found_2"
                    style={{ width: "90%" }}
                    src="./assets/not-found.png"
                  />
                  <Typography textAlign="center">No Data Found</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
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
              {loading ? (
                <DataLoading />
              ) : lotteryResults.length > 0 ? (
                lotteryResults.map((lr, key) => {
                  return (
                    <div key={key}>
                      <LotteryCard lottery={lr} />
                      <Box height={12}></Box>
                    </div>
                  );
                })
              ) : (
                <Grid pt={1} style={{ marginTop: "40%" }} height="100vh">
                  <Image
                    alt="not_found_2"
                    style={{ width: "90%" }}
                    src="./assets/not-found.png"
                  />
                  <Typography textAlign="center">No Data Found</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </TabPanel>
        {lotteryCategoryList.map((lc, index) => {
          return (
            <TabPanel key={index} value={value} index={index + 2}>
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
                  {loading ? (
                    <DataLoading />
                  ) : lotteryResults.length > 0 ? (
                    lotteryResults.map((lr, key) => {
                      return (
                        <div key={key}>
                          <LotteryCard lottery={lr} />
                          <Box height={12}></Box>
                        </div>
                      );
                    })
                  ) : (
                    <Grid pt={1} style={{ marginTop: "40%" }} height="100vh">
                      <Image
                        alt="not_found_2"
                        style={{ width: "90%" }}
                        src="./assets/not-found.png"
                      />
                      <Typography textAlign="center">No Data Found</Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </TabPanel>
          );
        })}
      </Box>
    </NoSsr>
  );
}
