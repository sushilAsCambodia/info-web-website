import * as React from "react";
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
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { getLatestLottery } from "@/store/actions/lotteryActions";
import { getLotteryCategory,getLotteryResultByCategory } from "@/store/actions/lotteryActions";
import { useTranslation } from "react-i18next";

import { DataGrid } from "@mui/x-data-grid";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";
import { Image } from "mui-image";
import utils from "@/common/utils";
const style = {
  position: "absolute",
  top: "300px",
  left: "75%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #DDDDDD",
  p: 2,
};

export default function LotteryPage() {
  const router = useRouter()  
  const dispatch = useDispatch();
  const [select, setSelect] = useState(0);
  const [age, setAge] = useState("");
  const { i18n } = useTranslation();
  const [value, setValue] = React.useState(0);
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
  const {lotteryCategories = [], lotteryResults = []} = useSelector(state => state.lottery)

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
      padding: '0px'
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
  function createData(img, name, calories, fat, results, id) {
    return { img, name, calories, fat, results, id };
  }

  const rows = [
    {
      id: 1,
      lottoTitle: "Red Lotto",
      logo: "https://media.istockphoto.com/id/457815375/photo/flame-icon.jpg?s=170667a&w=0&k=20&c=ApbZCTyyXaBjp7qVTPqXrb3Si_p6ehJERIztA_vfIPw=",
      items: [
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
          "Frozen yoghurt",
          111,
          6.0,
          { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
          1
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
          "Ice cream sandwich",
          237,
          9.0,
          { numbers: [12, 32, 4, 5, 12, 34], winner: 5 },
          2
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Eclair",
          222,
          16.0,
          { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
          3
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Cupcake",
          5000,
          3.7,
          { numbers: [12, 32, 4, 5, 12, 34], winner: 5 },
          4
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Gingerbread",
          272,
          16.0,
          { numbers: [12, 32, 4, 5, 12, 34], winner: 10 },
          5
        ),
      ],
    },
    {
      id: 2,
      lottoTitle: "Blue Lotto",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP83gncuWce8kisGWt8JwftWJUK_dx_4WNjw&usqp=CAU",
      items: [
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
          "Frozen yoghurt",
          159,
          6.0,
          { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
          1
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
          "Ice cream sandwich",
          237,
          9.0,
          { numbers: [12, 32, 4, 5, 12, 34], winner: 5 },
          2
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Eclair",
          262,
          16.0,
          { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
          3
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Cupcake",
          305,
          3.7,
          { numbers: [12, 32, 4, 5, 12, 34], winner: 5 },
          4
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Gingerbread",
          356,
          16.0,
          { numbers: [12, 32, 4, 5, 12, 34], winner: 10 },
          5
        ),
      ],
    },
  ];
  // past result modal controls
  const [pastResultModalData, setPastResultModalData] = useState("");

  const [pastResult, setPastResult] = useState(false);
  const handleOpen = (data) => {
    setPastResultModalData(data);
    setPastResult(true);
  };
  // chart modal control
  const [chartModalData, setChartModalData] = useState("");

  const [chart, setChart] = useState(false);
  const handleChartOpen = (data) => {
    setChartModalData(data);
    setChart(true);
  };

  const handleClose = () => {
    setChart(false);
    setPastResult(false);
  };

  useEffect(() => {
    dispatch(getLatestLottery("hey"));    
  }, []);

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

console.log("lotteryResults",lotteryResults)
  return ( 
    <>
      {/* <Typography variant="h5" fontWeight="bold">
              {langKey && langKey.lottery}
      </Typography> */}
        <TitleBreadCrumbs title= {langKey && langKey.lottery} />
      {/* past result modal  */}
      <Modal
        open={pastResult}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={pastResult}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Past Result Modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              has ID of {pastResultModalData}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      {/* chart modal  */}
      <Modal
        open={chart}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={chart}>
          <Grid sx={style}>
            <Divider>
              <Typography id="transition-modal-title" variant="h6">
                Speed ​​color series {chartModalData}
              </Typography>
            </Divider>
            <Grid container>
              <Grid item xs={4} p={1} position="relative">
                <div className="ribbon ribbon-top-right">
                  <span>New</span>
                </div>

                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
      <Grid container mb={2} alignItems="center" justifyContent="space-between" >
        <Grid item xs={"auto"} container border="1px solid grey" borderRadius="10px">
          <MenuItem
            sx={{ borderRadius: "10px 0px 0px 10px" }}
            className={`${select === 0 ? "filterTabSelected" : ""}`}
            onClick={() => {
              setSelect(0);
            }}
          >
             {langKey && langKey.all}
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 10px 10px 0px" }}
            className={`${select === 1 ? "filterTabSelected" : ""}`}
            onClick={() => {
              setSelect(1);
            }}
          >
             {langKey && langKey.favorites}
          </MenuItem>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Select Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="category-select"
              value={age}
              label="Select Category"
              onChange={handleChange}
              style={{ paddingY: "0px" }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledHeaderCell  align="left">
                  Lottery
                </StyledHeaderCell>
                <StyledHeaderCell  align="left">
                  Issue
                </StyledHeaderCell>
                <StyledHeaderCell  align="left">
                  Draw Time
                </StyledHeaderCell>
                <StyledHeaderCell  align="center">
                  Results
                </StyledHeaderCell>
                <StyledHeaderCell  align="center">
                  Past Results
                </StyledHeaderCell>
                <StyledHeaderCell  align="center">
                  Chart
                </StyledHeaderCell>
                <StyledHeaderCell  align="center">
                  Favorite
                </StyledHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <>
                  <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row" colSpan={7}>
                        <Grid display="flex" alignItems="center" >
                          {" "}
                          <Image
                            alt={row.lottoTitle}
                            width={30}
                            style={{
                              marginRight: "10px",
                              width: "30px",
                              height: "30px",
                              borderRadius: "20px",
                            }}
                            src={row.logo}
                          />
                           <Typography paddingLeft={1}>{row.lottoTitle}</Typography>
                        </Grid>
                      </StyledTableCell>
                    </StyledTableRow>
                    {row.items.map((item, index) => {
                      return (
                        <StyledTableRow key={item.name}>
                          <StyledTableCell component="th" scope="row">
                            <Grid
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Image
                                alt={item.name}
                                width="30px"
                                src={item.img}
                                style={{}}
                              />{" "}
                              <Typography paddingLeft={1}>{item.name}</Typography>
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {item.calories}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {item.fat}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Grid
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {lottoTable(item.results)}
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              sx={{
                                background: "#F3F3F3",
                                border: "1px solid #DDDDDD",
                              }}
                              onClick={() => router.push('/lotteryPastResults')}
                            >
                              <Icon icon="solar:clipboard-list-broken" />
                            </IconButton>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              sx={{
                                background: "#F3F3F3",
                                border: "1px solid #DDDDDD",
                              }}
                              onClick={() => handleChartOpen(row.id)}
                            >
                              <Icon icon="material-symbols:add-chart-rounded" />
                            </IconButton>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              sx={{
                                background: "#F3F3F3",
                                border: "1px solid #DDDDDD",
                              }}
                            >
                              {item.calories % 2 == 0 ? (
                                <Icon
                                  color="#C9C9C9"
                                  icon="clarity:favorite-solid"
                                />
                              ) : (
                                <Icon
                                  color="#FF6F31"
                                  icon="clarity:favorite-solid"
                                />
                              )}
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>



        {rows?.length > 0 && (
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
        border="1px solid grey"
        // borderRadius="10px"
        background="red"
      >
        {lottos.numbers.map((lotto, index) => {
          return (
            <Grid
              key={index}
              px={1}
              className={`${
                lotto === lottos.winner ? "lotteryPageHit" : "lotteryPageMiss"
              }`}
            >
              {lotto}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
