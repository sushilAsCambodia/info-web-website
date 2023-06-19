import * as React from "react";
import moment from "moment/moment";
import {
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  styled,
  TableCell,
  TableRow,
  tableCellClasses,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Box,
  Stack,
  Divider,
  Pagination,
  Button,
} from "@mui/material";
import { getLatestLottery } from "@/store/actions/lotteryActions";
import {
  getLotteryCategory,
  getLotteryResultByCategory,
} from "@/store/actions/lotteryActions";
import { useTranslation } from "react-i18next";
import { getLotteryResultByCategoryId } from "@/store/actions/lotteryActions";

import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import DataLoading from "@/components/DataLoading";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";
import LotteryCategoryModal from "@/components/lottery/LotteryCategoryModal";
import { addRemoveFavourite } from "@/store/actions/favouriteActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Router from "next/router";
const toastOption = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
};
import { Image } from "mui-image";
import utils from "@/common/utils";

export default function LotteryPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [select, setSelect] = useState("");
  const [category, setCategory] = useState("");
  const [lotteryData, setLotteryData] = useState([]);
  const { i18n } = useTranslation();
  const perPage = 5;
  const [value, setValue] = React.useState(0);
  const langKey = useSelector((state) => state?.load_language?.language);
  const [mounted, setMounted] = useState(false);
  const { filter } = router.query;
  const {
    lotteryCategories = [],
    lotteryResults = [],
    lotteryResultByID = [],
    loading = false,
  } = useSelector((state) => state?.lottery);
  const { customer = {} } = useSelector((state) => state?.auth);
  // const [loading, setLoading] = useState(false);
  const [lotteryResultList, setLotteryResultList] = useState({});
  const handleChange = (event) => {
    setPage(1);
    setCategory(event.target.value);
  };


  // useEffect(() => {    
  //   if(Cookies.get('token') && select == 'favorite') {
  //     goToLogin();
  //   }
  // },[]);

  const goToLogin = () => {
    Router.push("/login");
  };

  const goToLotteryHistory = (lottery = {}) => {
    const title = lottery?.translation?.translation;
    router.push(
      {
        pathname: "/lotteryHistory",
        query: {
          title: title,
          id: lottery.id,
          icon: lottery.icon
            ? lottery.icon
            : "/assets/Lottery/superlotto-logo1.png",
          categoryId: lottery.category_id,
        },
      },
      `/lotteryPastResults?title=${title}&id=${lottery.id}&categoryId=${lottery.category_id}`
    );
  };

  const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    background: "#F3F3F3",
    borderRight: "1px solid #DDDDDD ",
    borderTop: "1px solid #DDDDDD ",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.grey,
    },
    // hide last border
    "&:first-of-type": {
      borderLeft: "1px solid #DDDDDD",
    },
  }));

  // past result modal controls

  const [noDataSign, setNoDataSign] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // chart modal control

  const [filterCategory, setFilterCategory] = useState(false);
  const handleChartOpen = () => {
    setFilterCategory(true);
  };

  const handleClose = () => {
    setFilterCategory(false);
  };

  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // setLoading(true);
    dispatch(
      getLotteryResultByCategoryId({
        params: {
          rowsPerPage: perPage,
          page: page,
          lang_id: utils.convertLangCodeToID(i18n.language),
          member_id: customer.member_ID,
          pick: select,
          category_id: category,
        },
        callback: (res) => {
          setLotteryData(res && res.data);
          // page == 1
          //   ? (setLotteryHistories(res.data.data),
          //     setPageLimit(res.data.last_page),
          //     handleClose())
          //   : setLotteryHistories((data) => data.concat(res.data.data));
          handleClose();
        },
      })
    );
    // dispatch(getLatestLottery("hey"));
    // setLoading(false);
  }, [page, select, category, i18n.language]);

  useEffect(() => {
    if (filter == "favorite") {
      setSelect("favorite");
    } else setSelect("");
  }, [router.asPath]);

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
          },
        })
      );
    },
    [dispatch, i18n.language]
  );
  React.useEffect(() => {
    handleGetCategory();
  }, [handleGetCategory]);
  useEffect(() => {
    let temp = lotteryData;
    if (!customer.member_ID && select == "favorite") temp = {};
    else temp = lotteryData;

    setLotteryResultList(temp);
    setNoDataSign(
      temp?.data?.find(
        (item) => item?.lottery?.length > 0 && item.lottery_bind != null
      ) == undefined
    );
  }, [lotteryData]);
  React.useEffect(() => {
    if (value >= 0) {
      let hash = "";
      const lotteryCategory = lotteryCategories[value - 1] || {};
      if (Object.keys(lotteryCategory).length) {
        hash = "#" + lotteryCategory?.translation?.translation;
      }
      // router.replace(`${router.route}${hash}`)
      handleGetLotteryResult(lotteryCategory?.id);
    }
    localStorage.setItem("prepage", "LotteryPage");
  }, [value]);

  const handleAddRemove = (lottery_id) => {
    // setLoading(true);
    customer?.member_ID
      ? dispatch(
          addRemoveFavourite({
            body: {
              lottery_id: lottery_id,
              member_ID: customer?.member_ID,
            },
            callback: (res) => {
              setFavorite(true);
              toast.success(langKey[res?.message], toastOption);
              dispatch(
                getLotteryResultByCategoryId({
                  params: {
                    rowsPerPage: perPage,
                    page: select === "favorite" ? 1 : page,
                    lang_id: utils.convertLangCodeToID(i18n.language),
                    member_id: customer.member_ID,
                    pick: select,
                    category_id: "",
                  },
                  callback: (res) => {
                    // handleClose();
                    setLotteryData(res && res.data);
                    console.log("");
                  },
                })
              );
              // setLoading(false);
            },
          })
        )
      : router.push("/login");
  };

  const checkActive = (active_features, value) => {
    if (active_features && active_features !== "") {
      const arr = active_features.split(",");
      if (arr && arr.length > 0) {
        if (arr.includes(value)) return true;
      }
    }
    return false;
  };
  const handleFavoriteLogin=()=>{
    //router.push("/LotteryPage?filter=favorite"),setSelect('favorite')
   
    if(Cookies.get('token')) {
      router.push("/LotteryPage?filter=favorite"),setSelect('favorite')
        } else {
          goToLogin();
        }
  }
  return  (
    
      
        <>
          {/* <Typography variant="h5" fontWeight="bold">
              {langKey && langKey.lottery}
      </Typography> */}
          <TitleBreadCrumbs title={langKey && langKey.lottery} />
          <ToastContainer />

          {/* category filter modal  */}
          <LotteryCategoryModal
            open={filterCategory}
            handleClose={handleClose}
          />

          <Grid
            container
            mb={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid
              item
              xs={"auto"}
              container
              border="1px solid grey"
              borderRadius="10px"
            >
              <MenuItem
                sx={{ borderRadius: "10px 0px 0px 10px" }}
                className={`${select === "" ? "filterTabSelected" : ""}`}
                onClick={() => {
                  router.push("/LotteryPage"), setSelect("");
                }}
              >
                {langKey && langKey.all}
              </MenuItem>

              <MenuItem
                sx={{ borderRadius: "0px 10px 10px 0px" }}
                className={`${
                  select === "favorite" ? "filterTabSelected" : ""
                }`}
                onClick={() =>handleFavoriteLogin()}
              >
                {langKey && langKey.favorites}
              </MenuItem>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Button
                  variant="outlined"
                  id="category-select-label"
                  onClick={() => {
                    handleChartOpen();
                  }}
                >
                  {" "}
                  {langKey && langKey.select_category}
                </Button>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledHeaderCell align="left">
                      {langKey && langKey.lottery}
                    </StyledHeaderCell>
                    <StyledHeaderCell align="left">
                      {langKey && langKey.issue}
                    </StyledHeaderCell>
                    <StyledHeaderCell align="left">
                      {langKey && langKey.draw_time}
                    </StyledHeaderCell>
                    <StyledHeaderCell align="center">
                      {langKey && langKey.result}
                    </StyledHeaderCell>
                    <StyledHeaderCell align="center">
                      {langKey && langKey.past_results}
                    </StyledHeaderCell>
                    <StyledHeaderCell align="center">
                      {langKey && langKey.data_chart}
                    </StyledHeaderCell>
                    <StyledHeaderCell align="center">
                      {langKey && langKey.favorites}
                    </StyledHeaderCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={7}>
                        <Grid textAlign={"center"} item xs={12} paddingTop={5}>
                          <DataLoading />
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                  {!loading &&
                    lotteryResultList?.data?.length > 0 &&
                    lotteryResultList.data.map((rowData, index) => {
                      if (
                        rowData &&
                        rowData.lottery_bind != null &&
                        rowData &&
                        rowData.lottery.length > 0
                      )
                        return (
                          <>
                            <TableRow key={index}>
                              <TableCell
                                component="th"
                                scope="row"
                                colSpan={7}
                                style={{
                                  backgroundColor: "#dbd6d6",
                                }}
                              >
                                <Grid display="flex" alignItems="center">
                                  {" "}
                                  <Image
                                    alt={rowData.lottoTitle}
                                    width={30}
                                    style={{
                                      marginRight: "10px",
                                      width: "30px",
                                      height: "30px",
                                      borderRadius: "20px",
                                    }}
                                    src={rowData.icon}
                                  />
                                  <Typography fontWeight={600} paddingLeft={1}>
                                    {rowData &&
                                      rowData.translation &&
                                      rowData.translation.translation}{" "}
                                  </Typography>
                                </Grid>
                              </TableCell>
                            </TableRow>
                            {rowData &&
                              rowData.lottery &&
                              rowData.lottery.map((item, index) => {
                                return (
                                  <TableRow key={item?.latest_result?.id}>
                                    <TableCell component="th" scope="row">
                                      <Grid
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Image
                                          alt={item?.latest_result?.id + "icon"}
                                          width="30px"
                                          src={item.icon}
                                          style={{}}
                                        />{" "}
                                        <Typography paddingLeft={1}>
                                          {item?.translation?.translation}
                                        </Typography>
                                      </Grid>
                                    </TableCell>
                                    <TableCell align="left">
                                      {item?.latest_result?.issue}
                                    </TableCell>
                                    <TableCell align="left">
                                      {/* {item?.latest_result?.created_at} */}
                                      {moment(
                                        item?.latest_result?.created_at
                                      ).format("YYYY-MM-DD")}
                                    </TableCell>
                                    <TableCell align="center">
                                      <Grid
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        {lottoTable(item?.latest_result)}
                                      </Grid>
                                    </TableCell>
                                    <TableCell align="center">
                                  
                                      <IconButton
                                        sx={{
                                          background: "#F3F3F3",
                                          border: "1px solid #DDDDDD",
                                        }}
                                        disabled={!checkActive(item?.active_features, "PastResult")}
                                        onClick={() => goToLotteryHistory(item)}
                                      >
                                        <Icon
                                          width="25px"
                                          icon="solar:clipboard-bold"
                                          color={ checkActive(item?.active_features, "PastResult") ? "#6f6f6f":'#e0e0e0'}
                                        />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                      <IconButton
                                        sx={{
                                          background: "#F3F3F3",
                                          border: "1px solid #DDDDDD",
                                        }}
                                        disabled={!checkActive(item?.active_features, "Chart")}
                                      >
                                        <Icon
                                          width="25px"
                                          icon="material-symbols:add-chart-rounded"
                                          color={ checkActive(item?.active_features, "Chart") ? "#6f6f6f":'#e0e0e0'}
                                        />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                      <IconButton
                                        sx={{
                                          background: "#F3F3F3",
                                          border: "1px solid #DDDDDD",
                                        }}
                                      >
                                        {/* {item.calories % 2 == 0 ? (
                                <Icon
                                width="20px"
                                  color="#C9C9C9"
                                  icon="clarity:favorite-solid"
                                />
                              ) : (
                                <Icon
                                width="20px"
                                  color="#FF6F31"
                                  icon="clarity:favorite-solid"
                                />
                              )} */}

                                        {item.is_favorite ? (
                                          <Icon
                                            icon="ant-design:star-filled"
                                            color="#F2DA00"
                                            onClick={() => {
                                              handleAddRemove(item?.lottery_id);
                                            }}
                                          />
                                        ) : (
                                          <Icon
                                            icon="ant-design:star-filled"
                                            color="#6f6f6f"
                                            onClick={() => {
                                              handleAddRemove(item?.lottery_id);
                                            }}
                                          />
                                        )}
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </>
                        );
                    })}

                  {lotteryResultList?.data?.length == 0 && !loading ||
                    (noDataSign && !loading &&(
                      <TableRow>
                        <TableCell component="th" scope="row" colSpan={7}>
                          <Grid
                            textAlign={"center"}
                            item
                            xs={12}
                            paddingTop={5}
                          >
                            <img
                              alt="not_found_2"
                              style={{ height: "50vh" }}
                              src="./assets/Home/not-found.gif"
                            />
                            <Typography textAlign="center">
                              {langKey.no_lottery_data}
                            </Typography>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))}
                  {!customer.member_ID && select == "favorite" && (
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={7}>
                        <Grid textAlign={"center"} item xs={12} paddingTop={5}>
                          <Icon
                            width="20vw"
                            color="#ff733e"
                            icon="material-symbols:login"
                          />
                          <Typography>{langKey?.login_for_favorite}</Typography>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {lotteryResultList?.data?.length > 0 && !noDataSign && (
              <Grid
                mt={10}
                item
                xs={12}
                sx={{ justifyContent: "center", display: "flex" }}
              >
                <Pagination
                  count={lotteryResultList.last_page}
                  page={page}
                  onChange={handlePageChange}
                />
              </Grid>
            )}

            {/* {rows?.length > 0 && (
            <Grid
              item
              xs={12}
              textAlign="center"
              display="flex"
              justifyContent="center"
              paddingTop={3}
              paddingBottom={3}
            >
              <Stack spacing={2} sx={{ textAlign: "center" }}>
                <Pagination count={5} variant="outlined" shape="rounded" className="announce-pagination" />
              </Stack>
            </Grid>
          )}
      */}
          </Grid>
        </>
      
  
  );
}

export function lottoTable(lottos) {
  return (
    <>
      <Grid
        container
        width="max-content"
        // border="1px solid grey"
        // borderRadius="10px"
        background={lottos}
      >
        {lottos &&
          lottos.result_data &&
          lottos.result_data.length > 0 &&
          lottos.result_data.map((lotto, index) => {
            return (
              // <Grid
              //   key={index}
              //   px={1}
              //   color={'white'}
              //   backgroundColor={lotto.color}
              //   borderRadius="10px"
              //   // className={`${
              //   //   lotto === lottos.winner ? "lotteryPageHit" : "lotteryPageMiss"
              //   // }`}
              // >
              //   {lotto.num}
              // </Grid>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                key={lotto.num}
                mx={0.2}
                sx={{
                  background: lotto.color,
                  width: "25px",
                  height: "25px",
                  borderRadius: "20px",
                }}
              >
                <Grid container justifyContent="center" alignItems="center">
                  <Typography color={"white"} fontSize="12px">
                    {lotto.num}
                  </Typography>{" "}
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
