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
  Divider,
  Collapse,
  Button,
  Pagination,
  TextField,
} from "@mui/material";
// import moment from "moment/moment";
import moment from 'moment/min/moment-with-locales'


import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";
import utils from "@/common/utils";
import {
  getLotteryHistory,
  getLotteryCategory,
  getLotteryResultByCategoryId,
  getLotteryHistoryAll
} from "@/store/actions/lotteryActions";
import { useRouter } from "next/router";
import DataLoading from "@/components/DataLoading";

import { Icon } from "@iconify/react";
import { lottoTable } from "./LotteryPage";
import { Image } from "mui-image";
export default function LotteryPastReults() {
  const router = useRouter();
  const { id, icon, title, categoryId } = router.query;
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const rowsPerPage = 10
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [toSearch, setToSearch] = useState(false);
  const [titleIcon, setTitleIcon] = useState({ title: "", icon: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState("");
  const { lotteryHistories = {}, loading_history,lotteryResultByID = [],lotteryHistoriesAll } = useSelector(
    (state) => state.lottery
  );
const {total} = useSelector(
  (state) => state.lottery.lotteryHistories
);
  const handleExpandClick = (index) => {
    if (index === expanded) setExpanded("");
    else setExpanded(index);
  };

  const [age, setAge] = useState("");

  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

  const handleGetLotteryHistory = () => {
    dispatch(
      getLotteryHistory({
        params: {
          rowsPerPage: rowsPerPage,
          page: currentPage,
          lottery_id: filter ? filter : id,
          lang_id: utils.convertLangCodeToID(i18n.language),
        },
        callback: (res) => {
          console.log(':::',res.data.data[0].lottery.icon)
          setTitleIcon({icon:res.data.data[0].lottery.icon,title:title})
        },
      })
    );
  };

  const handleGetLotteryHistoryAll = () => {
    dispatch(
      getLotteryHistoryAll({
        params: {
          rowsPerPage: lotteryHistories? lotteryHistories.total:50,
          page: 1,
          lottery_id: filter ? filter : id,
          lang_id: utils.convertLangCodeToID(i18n.language),
        },
        callback: (res) => { },
      })
    )
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (id !== undefined && !toSearch) {
      handleGetLotteryHistory(), setFilter(filter == "" ? id : filter);
    }
  }, [currentPage, router.isReady, filter, i18n.language]);

  useEffect(() => {
    allReset()
  }, [filter]);

  useEffect(()=>{
    handleGetLotteryHistoryAll()
  },[search,i18n.language,total])

  useEffect(() => {
    if (categoryId !== undefined) {
      setExpanded(categoryId);
    }
  }, [router.isReady]);
  useEffect(() => {
    dispatch(
      getLotteryResultByCategoryId({
        params: {
          rowsPerPage: rowsPerPage,
          page: 1,
          lang_id: utils.convertLangCodeToID(i18n.language),
          pick: "",
          category_id: "",
        },
        callback: (res) => {
          
        },
      })
    );
  }, [i18n.language]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#DDDDDD",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: "10px",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.grey,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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

  const lotteryResultByIDFilter = () => {
    const item = lotteryResultByID?.data?.filter((obj) => {
      return obj.lottery_bind !== null;
    });
    return item;
  };

  const lotteryGameHistoryResult = () => {
    const item = lotteryHistoriesAll?.data?.filter((obj) => {
      return obj?.issue.includes(search);
    });
const pagination = <Pagination
    count={Math.ceil(item?.length / 10)}
    page={currentPage}
    onChange={handlePageChange}
  />
    return({item,pagination});
  };
  const localChange =(key)=>{
    switch(key){
      case 'kh':
      return 'km';
      case 'de':
        return 'zh-cn'
        default:
          return 'en'
    }
  }
  const allReset=()=>{
    setSearch(''),
    setCurrentPage(1)
  }
  return (
    <>
<<<<<<< HEAD
      <TitleBreadCrumbs title={langKey && langKey.past_result} />
=======
      <TitleBreadCrumbs title={langKey?.past_results} />
>>>>>>> 19ca9519bcb45f7442d74510d7bee54a5518d469
      <Grid container height="100vh">
        <Grid item xs={4} p={1}>
          <Grid py={1} border="1px solid #DDDDDD">
            {lotteryResultByIDFilter()?.length > 0 &&
              lotteryResultByIDFilter().map((item, index) => {
                return (
                  <Grid container key={index}>
                    <Grid className="container" item xs={10}>
                      <div
                        className={`step ${"completed"}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleExpandClick(item.id)}
                      >
                        <div className="v-stepper">
                          <div
                            className="circle"
                            style={{
                              "--iconImg": `url("${item?.icon}")`,
                            }}
                          ></div>
                          {/* <div className="line"></div> */}
                        </div>

                        <div
                          className="contents"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          {item?.translation?.translation
                            ? item.translation.translation
                            : ""}
                        </div>
                      </div>
                      <Collapse
                      style={{paddingLeft:'20px'}}
                        in={expanded == item.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        {item?.lottery.map((lottery, i) => {
                          return (
                            <>
                              <div
                                className={`step ${
                                  filter == lottery?.lottery_id
                                    ? "completed"
                                    : ""
                                }`}
                                style={{ cursor: "pointer" }}
                              >
                                <div className="v-stepper">
                                  <div
                                    onClick={() => {
                                      setFilter(lottery?.lottery_id),
                                        setTitleIcon({
                                          title:
                                            lottery.translation.translation,
                                          icon: lottery.icon,
                                        });
                                    }}
                                    className="circle"
                                    style={{
                                      "--iconImg": `url("${lottery?.icon}")`,
                                    }}
                                  ></div>
                                  <div className="line"></div>
                                </div>
                                <div
                                  className="contents"
                                  onClick={() => {
                                    setFilter(lottery?.lottery_id),
                                      setTitleIcon({
                                        title: lottery.translation.translation,
                                        icon: lottery.icon,
                                      });
                                  }}
                                >
                                  {lottery?.translation?.translation}
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </Collapse>
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                      <IconButton
                        onClick={() => handleExpandClick(item.id)}
                        className="rotate"
                        sx={{ paddingTop: "15px" }}
                      >
                        <Icon
                          width="15px"
                          className={`${
                            expanded == item.id ? "rotate90" : "rotate0"
                          }`}
                          icon="material-symbols:arrow-forward-ios-rounded"
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid item xs={8} p={1}>
          <Grid border="1px solid #DDDDDD" container p={1}>
            <Grid container item xs={6} alignItems="center">
              <Image
                alt="Welfare lottery lottery"
                width="30px"
                height="30px"
                style={{ borderRadius: "30px" }}
                src={titleIcon.icon ? titleIcon.icon : icon}
              />
              <Typography ml={1}>
                {titleIcon.title ? titleIcon.title : title}
              </Typography>{" "}
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <TextField
                
                className="issue-textfield"
                  id="search-filter"
                  name="search-filter"
                  label={langKey?.issue}
                  value={search}
                  onChange={() => {
                    (setSearch(event.target.value),setCurrentPage(1));
                  }}
                  variant="outlined"
                />
              </FormControl>
              <Button
                variant="contained"
                disabled={search=='' ? true:false}

                sx={{
                  background: "#FF6F31",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  color: "white",
                  textTransform: "capitalize",
                }}
                onClick={()=>(setToSearch(true),setCurrentPage(1))}
              >
                {langKey?.search}
              </Button>

              <Button
                variant="contained"
                sx={{
                  background: "#FF6F31",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  color: "white",
                  textTransform: "capitalize",
                  marginLeft:'5px'
                }}
                onClick={()=>(setToSearch(false),allReset())}
              >
                {langKey?.reset}
              </Button>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledHeaderCell width="50px">
                      {" "}
                      {langKey && langKey.issue}{" "}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="80px" align="left">
                      {langKey && langKey.draw_time}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                      {langKey && langKey.result}
                    </StyledHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {toSearch &&
                    lotteryGameHistoryResult().item?.slice((currentPage-1)*rowsPerPage,(rowsPerPage*currentPage)).map((item, index) => {
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="left">
                            {item.issue}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {moment(item.opendate).locale(localChange(i18n.language)).format(utils.lotteryFormat)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Grid
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {lottoTable(item)}
                            </Grid>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                    {toSearch && lotteryGameHistoryResult().item?.length ==0 &&
                     <TableRow>
                     <TableCell component="th" scope="row" colSpan={3}>
                       <Grid textAlign={"center"} item xs={12} paddingTop={5}>
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
                      
                    }

                  {!loading_history &&
                    !toSearch &&
                    lotteryHistories?.data?.length > 0 &&
                    lotteryHistories?.data?.map((item, index) => {
                      return (
                        <StyledTableRow key={item.name}>
                          <StyledTableCell align="left">
                            {item.issue}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {moment(item.opendate).locale(localChange(i18n.language)).format(utils.lotteryFormat)}

                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Grid
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {lottoTable(item)}
                            </Grid>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}

                  {loading_history && (
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={3}>
                        <Grid textAlign={"center"} item xs={12} paddingTop={5}>
                          <DataLoading />
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {!toSearch ? (
              lotteryHistories?.data?.length > 0 && (
                <Grid
                  my={1}
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Pagination
                    count={lotteryHistories.last_page}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Grid>
              )
            ) : (
              <Grid
                my={1}
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
              {lotteryGameHistoryResult().pagination}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
