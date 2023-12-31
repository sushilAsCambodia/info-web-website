import * as React from "react";
import { useState,useEffect } from "react";
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
import Router from "next/router";
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
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOption = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
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
  const { favouriteList = {}, status } = useSelector(
    (state) => state?.favourite
  );

  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const [lotteryCategoryList, setLotteryCategoryList] = useState([]);
  const [favLoading, setFavLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const onChangeTab = (hash) => {
    router.replace(`${router.route}#${hash}`);
  };

  useEffect(() => {
    if(Cookies.get('token')) {
      setMounted(true);
    }else {
      goToLogin();
    }
  },[]);

  const goToLogin = () => {
    Router.push("/login");
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
  const allFavouriteList = () => {
    setFavLoading(true);
    dispatch(
      getFavouriteList({
        params: {
          lang_id: utils.convertLangCodeToID(i18n.language),
          member_id: customer.member_ID,
          pick: "favorite",
        },
        callback: (res) => {
          setFavLoading(false);
        },
      })
    );
  };

  React.useEffect(() => {
    handleGetCategory();
  }, [handleGetCategory]);

  React.useEffect(() => {
    lotteryCategories.length > 0
      ? setLotteryCategoryList(
          lotteryCategories.filter((i) => i.lottery_bind !== null)
        )
      : "";
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
     
    } else if (value == 0) {
      customer?.member_ID ? allFavouriteList() : "";
    }
    localStorage.setItem("prepage", "lottery");
  }, [value]);

  const handleToastMessage = (message) => {
    toast.success(message, toastOption);
  };
  
  return <>
{
      mounted && (
    <NoSsr>
      <Box sx={{ width: "100%" }}>
        <ToastContainer />
        <Grid
          sx={{
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
            position: "fixed",
            top: 40,
            width: "100%",
            background: "#fff",
            zIndex: 9,
          }}
          style={{'-webkit-overflow-scrolling': 'touch'}}
        >
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={value}
            texttransform="capitalize"
            onChange={handleChange}
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
        </Grid>
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
              {favLoading ? <DataLoading /> : ""}

              {!favLoading &&
              status === "completed" &&
              favouriteList.length == 0 ? (
                <Grid pt={1} style={{ marginTop: "40%" }} height="100vh">
                  <Image
                    alt="not_found_2"
                    style={{ width: "90%" }}
                    src="./assets/not-found.png"
                  />
                  <Typography textAlign="center">
                    {langKey.no_lottery_data}
                  </Typography>
                </Grid>
              ) : (
                ""
              )}
              {favouriteList?.length > 0 && customer.member_ID?
                favouriteList.map((lr, key) => {
                  return (
                    <div key={key}>
                      <LotteryCard
                        lottery={lr}
                        allFavourite={allFavouriteList}
                        toastMessage={handleToastMessage}
                      />
                      <Box height={12}></Box>
                    </div>
                  );
                }):''}
              {customer?.member_ID ? (
                ""
              ) : (
                <Grid
                  pt={1}
                  style={{ marginTop: "40%", textAlign: "center" }}
                  height="100vh"
                >
                  <Icon
                    width="40vw"
                    color="#ff733e"
                    icon="material-symbols:login"
                  />
                  <Typography> {langKey?.login_for_favorite}</Typography>
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
                      <LotteryCard
                        lottery={lr}
                        allFavourite={allFavouriteList}
                        toastMessage={handleToastMessage}
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
                  <Typography textAlign="center">
                    {langKey.no_lottery_data}
                  </Typography>
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
                          <LotteryCard
                            lottery={lr}
                            allFavourite={allFavouriteList}
                            toastMessage={handleToastMessage}
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
                      <Typography textAlign="center">
                        {langKey.no_lottery_data}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </TabPanel>
          );
        })}
      </Box>
    </NoSsr>

)
}
 </>
}
