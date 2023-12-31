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
import moment from "moment/min/moment-with-locales";

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
  getLotteryHistoryAll,
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
  const rowsPerPage = 10;
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [titleIcon, setTitleIcon] = useState();
  const [historyTitle, setHistoryTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState("");
  const [toSearch, setToSearch] = useState(false);
  const [lotteryHistories, setLotteryHistories] = useState({});
  const [loading_history, setLoading_history] = useState(false);
  const {
    lotteryResultByID = [],
    lotteryHistoriesAll,
  } = useSelector((state) => state.lottery);
  const { total } = useSelector((state) => state.lottery.lotteryHistories);
  const handleExpandClick = (index) => {
    if (index === expanded) setExpanded("");
    else setExpanded(index);
  };


  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

  const handleGetLotteryHistory = () => {
    setLoading_history(true)
    dispatch(
      getLotteryHistory({
        params: {
          rowsPerPage: rowsPerPage,
          page: currentPage,
          lottery_id: filter ? filter : id,
          lang_id: utils.convertLangCodeToID(i18n.language),
        },
        callback: (res) => {
          console.log(':::getLotteryHistory',res.data)
          setLotteryHistories(res.data)
          setTitleIcon(res.data.lottery.icon)
          setHistoryTitle(res.data.lottery.translation.translation)
          setLoading_history(false)
        },
      })
    );
  };

  const handleGetLotteryHistoryAll = () => {
    dispatch(
      getLotteryHistoryAll({
        params: {
          rowsPerPage: lotteryHistories
            ? lotteryHistories?.paginate?.total
            : 50,
          page: 1,
          lottery_id: filter ? filter : id,
          lang_id: utils.convertLangCodeToID(i18n.language),
        },
        callback: (res) => {
        },
      })
    );
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
    allReset();
  }, [filter]);

  useEffect(() => {
    handleGetLotteryHistoryAll();
  }, [search, i18n.language, lotteryHistories?.paginate?.total]);

  useEffect(() => {
    if (categoryId !== undefined) {
      setExpanded(categoryId);
    }
  }, [router.isReady]);
  useEffect(() => {
    dispatch(
      getLotteryResultByCategoryId({
        params: {
          // rowsPerPage: rowsPerPage,
          // page: 1,
          lang_id: utils.convertLangCodeToID(i18n.language),
          pick: "",
          category_id: "",
        },
        callback: (res) => {},
      })
    );
  }, [i18n.language]);

  

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
    const item = lotteryHistoriesAll?.paginate?.data?.filter((obj) => {
      return obj?.issue.includes(search);
    });

    const pageCount = Math.ceil(item?.length / 10);
    const pagination =
      pageCount <= 1 ? (
        ""
      ) : (
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      );
    return { item, pagination };
  };

  const allReset = () => {
    setSearch(""), setCurrentPage(1);
  };
  return (
    <>
      <TitleBreadCrumbs title={langKey?.past_results} />
      <Grid container mt={7}>
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
                            : "title not available"}
                        </div>
                      </div>
                      <Collapse
                        style={{ paddingLeft: "20px" }}
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
                                        setTitleIcon(lottery.icon),
                                        setHistoryTitle(
                                          lottery.translation.translation
                                        );
                                    }}
                                    className="circle"
                                    style={{
                                      "--iconImg": `url("${lottery?.icon}")`,
                                    }}
                                  ></div>
                                  <div className="line"></div>
                                </div>
                                <div
                                style={{color:filter == lottery?.lottery_id ? '#ff0000':'' }}
                                  className="contents"
                                  onClick={() => {
                                    setFilter(lottery?.lottery_id),
                                      setTitleIcon(lottery.icon),
                                      setHistoryTitle(
                                        lottery.translation.translation
                                      );
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
          <Grid
            border="1px solid #DDDDDD"
            container
            p={1}
            justifyContent="space-between"
          >
            <Grid container item xs={"auto"} alignItems="center">
              <Image
                alt="Welfare lottery lottery"
                width="30px"
                height="30px"
                style={{ borderRadius: "30px" }}
                src={titleIcon}
              />
              <Typography ml={1}>
                {historyTitle ? historyTitle : title}
              </Typography>
              {loading_history &&(
                    
                    <Grid textAlign={"center"} item xs={'auto'} >
                      <DataLoading />
                    </Grid>
                  
              )}
            </Grid>
            <Grid
              item
              xs={"auto"}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <TextField
                  onKeyDownCapture={(ev) => {
                    if (ev.key === "Enter") {
                      setToSearch(true);
                      setCurrentPage(1);
                      // ev.preventDefault();
                    }
                  }}
                  className="issue-textfield"
                  id="search-filter"
                  name="search-filter"
                  label={langKey?.issue}
                  value={search}
                  onChange={() => {
                    setSearch(event.target.value), setCurrentPage(1);
                  }}
                  variant="outlined"
                />
              </FormControl>
              <Button
                disabled={search == "" ? true : false}
                variant="contained"
                sx={{
                  background: "#FF6F31",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  color: "white",
                  textTransform: "capitalize",
                }}
                onClick={() => (setToSearch(true), setCurrentPage(1))}
              >
                {langKey?.search}
              </Button>

              <Button
                variant="outlined"
                sx={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  color: "#FF6F31",
                  textTransform: "capitalize",
                  marginLeft: "5px",
                  border: "1px solid #FF6F31",
                  width: "max-content",
                }}
                onClick={() => (setToSearch(false), allReset())}
              >
                {langKey?.reset}
              </Button>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledHeaderCell width="50px" align="center">
                      {" "}
                      {langKey && langKey.issue}{" "}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="50px" align="center">
                      {langKey && langKey.draw_time}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                      {langKey && langKey.result}
                    </StyledHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {toSearch &&
                    lotteryGameHistoryResult()
                      .item?.slice(
                        (currentPage - 1) * rowsPerPage,
                        rowsPerPage * currentPage
                      )
                      .map((item, index) => {
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell align="left">
                              {item.issue}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {/* {moment(item.opendate).locale(localChange(i18n.language)).format(utils.lotteryFormat)} */}
                              {item.opendate}
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
                  {toSearch && lotteryGameHistoryResult().item?.length == 0 && (
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
                  )}

                  {
                    !toSearch &&
                    lotteryHistories?.paginate?.data?.length > 0 &&
                    lotteryHistories?.paginate?.data?.map((item, index) => {
                      return (
                        <StyledTableRow key={item.name}>
                          <StyledTableCell align="center">
                            {item.issue}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {/* {moment(item.opendate).locale(localChange(i18n.language)).format(utils.lotteryFormat)} */}
                            {item.opendate}
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
                </TableBody>
              </Table>
            </TableContainer>
            {!toSearch ? (
              lotteryHistories?.paginate?.last_page > 1 &&
              lotteryHistories?.paginate?.data?.length > 0 && (
                <Grid
                  mt={7}
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Pagination
                    count={lotteryHistories?.paginate?.last_page}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                  />
                </Grid>
              )
            ) : (
              <Grid
                mt={7}
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
