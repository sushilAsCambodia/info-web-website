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
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { getLatestLottery } from "@/store/actions/lotteryActions";
import { getLotteryCategory,getLotteryResultByCategory } from "@/store/actions/lotteryActions";
import { useTranslation } from "react-i18next";
import { getLotteryResultByCategoryId } from "@/store/actions/lotteryActions";

import { DataGrid } from "@mui/x-data-grid";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import DataLoading from "@/components/DataLoading";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";
import { addRemoveFavourite } from "@/store/actions/favouriteActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const {lotteryCategories = [], lotteryResults = [],lotteryResultByID=[]} = useSelector(state => state.lottery)
  const { customer = {} } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const handleChange = (event) => {
    console.log("event.target.value",event.target.value)
    dispatch(
      getLotteryResultByCategoryId({
        params: {
          rowsPerPage: 10,
          page: 1,          
          lang_id: utils.convertLangCodeToID(i18n.language),
          category_id:event.target.value
        },
        callback: (res) => {
          // page == 1
          //   ? (setLotteryHistories(res.data.data),
          //     setPageLimit(res.data.last_page),
          //     handleClose())
          //   : setLotteryHistories((data) => data.concat(res.data.data));
          handleClose();
          // console.log("old:::",lotteryHistories)
          // console.log("added new:::",res.data.data)
        },
      })
    )
    setAge(event.target.value);
  };



  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#DDDDDD",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: '10px'
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
    setLoading(true);
    dispatch(
      getLotteryResultByCategoryId({
        params: {
          rowsPerPage: 10,
          page: 1,          
          lang_id: utils.convertLangCodeToID(i18n.language),
          member_id: customer.member_ID
        },
        callback: (res) => {
          // page == 1
          //   ? (setLotteryHistories(res.data.data),
          //     setPageLimit(res.data.last_page),
          //     handleClose())
          //   : setLotteryHistories((data) => data.concat(res.data.data));
          handleClose();
       
        },
      })
    )
    dispatch(getLatestLottery("hey"));    
    setLoading(false);
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

  },[lotteryCategories])
  React.useEffect(() => {

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


  const handleAddRemove = (lottery_id) => {
    setLoading(true);
    customer?.member_ID
      ? dispatch(
          addRemoveFavourite({
            body: {
              lottery_id: lottery_id,
              member_ID: customer?.member_ID,
            },
            callback: (res) => {
              toast.success(langKey[res?.message], toastOption);
              dispatch( getLotteryResultByCategoryId({
                  params: {
                    rowsPerPage: 10,
                    page: 1,          
                    lang_id: utils.convertLangCodeToID(i18n.language),
                    member_id: customer.member_ID
                  },
                  callback: (res) => {
                    // handleClose();
                   
                    console.log("added new:::",res)
                  },
                }))
                setLoading(false);
            },
          })
        )
      : router.push("/login");
  };

  
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
            <InputLabel id="category-select-label"> {langKey && langKey.select_category}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="category-select"
              value={age}
              label="Select Category"
              onChange={handleChange}
              style={{ paddingY: "0px" }}
            >{lotteryCategories && lotteryCategories.map((catData, index) => {
             if(catData.lottery_bind!==null)
              return(<MenuItem value={catData.id}>{catData && catData.translation && catData.translation.translation}</MenuItem>)
             

})}
             
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledHeaderCell  align="left">
                    {langKey && langKey.lottery}
                </StyledHeaderCell>
                <StyledHeaderCell  align="left">
                     {langKey && langKey.issue}
                </StyledHeaderCell>
                <StyledHeaderCell  align="left">
                   {langKey && langKey.draw_time}
                </StyledHeaderCell>
                <StyledHeaderCell  align="center">
                  {langKey && langKey.result}
                </StyledHeaderCell>
                <StyledHeaderCell  align="center">
                  {langKey && langKey.past_results}
                </StyledHeaderCell>
                <StyledHeaderCell  align="center">
                 {langKey && langKey.chart}
                </StyledHeaderCell>
                <StyledHeaderCell  align="center">
                   {langKey && langKey.favorites}
                </StyledHeaderCell>
              </TableRow>
            </TableHead>
           
            <TableBody>
              {
              loading ? (
                <TableRow>
                <TableCell component="th" scope="row" colSpan={7} >
                <Grid textAlign={'center'} item xs={12} paddingTop={5}>
                <DataLoading />
                </Grid>
              </TableCell>
             </TableRow>
              ) :
              lotteryResultByID && lotteryResultByID.data && lotteryResultByID.data.length > 0 ? 
             ( lotteryResultByID.data.map((rowData, index) => {
    
                if(rowData && rowData.lottery_bind!=null)
                return (
                  <>
                  <TableRow key={index}>
                      <TableCell component="th" scope="row"  colSpan={7} style={{
                          backgroundColor:"#dbd6d6"
                        }}>
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
                           <Typography fontWeight={600}  paddingLeft={1}>{rowData && rowData.translation && rowData.translation.translation} </Typography>
                        </Grid>
                      </TableCell>
                    </TableRow>
                    
                    {rowData && rowData.lottery  && rowData.lottery.map((item, index) => {
    
                      return (
                        <TableRow key={item?.latest_result?.id}>
                          <TableCell component="th" scope="row">
                            <Grid
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Image
                                alt={item?.latest_result?.id}
                                width="30px"
                                src={item.icon}
                                style={{}}
                              />{" "}
                              <Typography paddingLeft={1}>{item?.translation?.translation}</Typography>
                            </Grid>
                          </TableCell>
                          <TableCell align="left">
                            {item?.latest_result?.issue}
                          </TableCell>
                          <TableCell align="left">
                          {/* {item?.latest_result?.created_at} */}
                          {moment(item?.latest_result?.created_at).format('YYYY-MM-DD')}
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
                              onClick={() => router.push('/lotteryPastResults')}
                            >
                              <Icon width="20px" icon="solar:clipboard-list-broken" />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              sx={{
                                background: "#F3F3F3",
                                border: "1px solid #DDDDDD",
                              }}
                              onClick={() => handleChartOpen(row.id)}
                            >
                              <Icon width="25px" icon="material-symbols:add-chart-rounded" />
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
                                  color="#ddd"
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
              }))
              : 
             (
              <TableRow>
              <TableCell component="th" scope="row" colSpan={7} >
              <Grid textAlign={'center'} item xs={12} paddingTop={5}>
                      <img
                        alt="not_found_2"
                        style={{height:'50vh'}}
                        src="./assets/Home/not-found.gif"
                      />
                      <Typography textAlign="center">{langKey.no_lottery_data}</Typography>
              </Grid>
              </TableCell>
             </TableRow>
             )
              
              }
            </TableBody>
          </Table>
        </TableContainer>



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
        {lottos && lottos.result_data && lottos.result_data.length >0 && lottos.result_data.map((lotto, index) => {
   
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
              key={index}
              mx={0.2}
              sx={{background:lotto.color,width:'25px',height:'25px',borderRadius:'20px'}}
            >
              <Grid
              container
              justifyContent="center"
              alignItems="center" >
             <Typography color={'white'} fontSize='12px'>{lotto.num}</Typography> </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
