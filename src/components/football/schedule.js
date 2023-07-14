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
  Stack,
  Box,
  Divider,
  Collapse,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

import CircularProgress from '@mui/material/CircularProgress';
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import utils from "@/common/utils";
import moment from "moment/moment";
import { makeStyles } from '@mui/styles';

import { Icon } from "@iconify/react";
import { lottoTable } from "@/pages/LotteryPage";
import ActionModal from "./ActionModal";
import { Image } from "mui-image";
import ScheculeDateFilterBar from "@/common/scheculeDateFilterBar";
import DataLoading from "@/components/DataLoading";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      border: '1px solid #DDDDDD'
    }
  }

});

export default function Schedule({
  footballList,
  loadings,
  footballScheduleList,
  last_page,
  currentpage,
  pageChange,
  lang_id,handleAddRemove,matchId,dateoptions,datefilter
}) {
  const [select, setSelect] = useState(0);
  const [filter, setFilter] = useState("China National");
  //const [nodata, setNodata] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  console.log("footballScheduleList",footballScheduleList)
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );
  // const [currentPage, setCurrentPage] = useState(currentpage);

  const handleCloseModal = (event) => {
    setOpenModal(false);
  };
  const style = {
    position: "absolute",
    top: "300px",
    left: "70%",
    transform: "translate(-50%, -50%)",
    width: 750,
    bgcolor: "background.paper",
    border: "1px solid #DDDDDD",
  };
  





  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.grey,      
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
   
  }));




  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#DDDDDD",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: "10px",
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  
  }));



  const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    background: "#FF6F31",
    borderRight: "1px solid #DDDDDD ",
    borderTop: "1px solid #DDDDDD ",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.grey,
    },
    color: "white",
    // hide last border
    "&:first-of-type": {
      borderLeft: "1px solid #DDDDDD",
    },
  }));











  function createData(
    icon,
    comp,
    location,
    time,
    round,
    home,
    favourite,
    away
  ) {
    return { icon, comp, location, time, round, home, favourite, away };
  }

  const [dateFilter, setDateFilter] = useState("");
  const [days, setDays] = useState("Ten");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handlePageChange = (event, value) => {
    pageChange(value);
  };
  const [open, setOpen] = useState(false);
  const footballLists = footballList?.filter((obj) => {
    return moment(obj.startTime).format(utils.dateFormate) == dateFilter;
  });

  const footballUpdatedList = dateFilter != "" ? footballLists : footballList;
  const pageCount = Math.ceil(footballUpdatedList?.length / 20);
  /*** handle fav */
  const handleFav=(id)=>{
    handleAddRemove(id);
  }
  var regex = /\d+/g;
//var string = "you can enter maximum 500 choices";
//var matches = string.match(regex);

const classes = useStyles();


  return (
    <>
      {/* chart modal  */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Grid sx={style}>
            <ActionModal />
          </Grid>
        </Fade>
      </Modal>
      <Grid container px={{ xs: 2, md: 0 }}>
        <Grid
          container
          pt={1}
          px={1}
          sx={{
            background: "#FAFAFA",
            border: "1px solid #DDDDDD",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <ScheculeDateFilterBar
            fiterByDate={(value) => datefilter(value)}
            day={(value)=>dateoptions(value)}
          />
        </Grid>
        <Grid item xs={12} >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} className={classes.table} id="tablehover"  aria-label="customized table">
              <TableHead size="small">
                <TableRow>
                  <StyledHeaderCell width="60px" align="left">
                    {langKey && langKey.competition}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="center">
                    {langKey && langKey.rounds}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    {langKey && langKey.time}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    {langKey && langKey.home_team}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    {langKey && langKey.score}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    {langKey && langKey.visiting_team}
                  </StyledHeaderCell>
                  {/* <StyledHeaderCell width="100px" align="center">
                    {langKey && langKey.location}
                  </StyledHeaderCell> */}
                  <StyledHeaderCell width="30px" align="center">
                    {langKey && langKey.favourite}
                  </StyledHeaderCell>
                </TableRow>
              </TableHead>
              
               {loadings && (                 
                  <div>
      <Backdrop
        sx={{ color: '#ccc', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadings}       
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
                  
                  )
                
              }
              {/* {loadings ? (
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={7}>
                      <Grid textAlign={"center"} item xs={12} paddingTop={5}>
                        <DataLoading />
                      </Grid>
                    </TableCell>
                  </TableRow>)
                :
              ( */}
             
              <TableBody>
                
                {footballScheduleList &&
                  footballScheduleList.length > 0 ?
                  footballScheduleList.map((item, index) => {
                    let stage=item.stage
                    let font_color
                    let background_color                  
                    if(item && item.competition && item.competition.background_colour===null){
                      background_color="#e60039"
                    } else {
                      background_color=item.competition.background_colour
                    }
                    if(item && item.competition && item.competition.font_colour===null){
                      font_color="#ffffff"
                    } else {
                     font_color=item.competition.font_colour                      
                    }
                    let color
                    if(index%2==0){
                      color="#33cc75"
                    } else {
                      color="#e60039"
                    }
                    let given_time=moment(item.startTime).format('HH:mm')
                
                    return (
                      <StyledTableRow key={item.id} >
                        <StyledTableCell align="left"  style={{color:font_color, background:background_color }}>
                          <Grid
                            style={{ display: "flex", alignItems: "center", background:background_color }}
                          >
                            <Image
                              width={25}
                              src={item && item.competition && item.competition.image}
                              alt="football_endtab"
                            />
                            <Typography mx={1}>                           
                              {lang_id==1?item?.competition?.nameEn:lang_id==2?item?.competition?.nameFull:item?.competition?.nameEnFull}
                            </Typography>
                          </Grid>
                        </StyledTableCell >
                        <StyledTableCell align="center">
                          {lang_id==1?stage.match(regex):lang_id==3?stage.match(regex):stage}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(item.startTime).format('HH:mm')}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {/* {item.homeTeamName} */}
                          {/* {item.home_team==null && lang_id==1?'':item.home_team && lang_id==1?:item.homeTeamName} */}
                          {item.home_team && lang_id==1?item.home_team && item.home_team.nameEn:item.home_team && lang_id==2?item.home_team && item.home_team.nameFull:item.home_team && lang_id==3?item.home_team && item.home_team.nameEnFull:''}
                        </StyledTableCell>
                        <StyledTableCell align="center">--</StyledTableCell>
                        <StyledTableCell align="center">
                          {/* {item.awayTeamName} */}
                          {item.away_team && lang_id==1?item.away_team && item.away_team.nameEn:item.away_team && lang_id==2?item.away_team && item.away_team.nameFull:item.away_team && lang_id==3?item.away_team && item.away_team.nameEnFull:''}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">--</StyledTableCell> */}
                        <StyledTableCell align="center">
                          {item.is_favorite ? (
                            <IconButton onClick={()=>handleFav(item.id)}>
                              {" "}
                              <Icon
                                width={30}
                                color="orange"
                                icon="ic:round-star"
                              />
                            </IconButton>
                          ) : (
                            <IconButton onClick={()=>handleFav(item.id)}>
                              {" "}
                              <Icon width={25}  icon="ic:round-star" />
                            </IconButton>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                 :!loadings? <>
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={7}>
                      <Grid textAlign={"center"} item xs={12} paddingTop={5}>
                        <img
                          alt="not_found_2"
                          style={{ height: "50vh" }}
                          src="./assets/Home/not-found.gif"
                        />
                        <Typography textAlign="center">
                          {langKey && langKey.no_data_found}
                        </Typography>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  </>:''
                  }

               
              </TableBody>
              {/* )} */}
            </Table>
          </TableContainer>

          {footballScheduleList && footballScheduleList.length > 0 && (
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
                {/* <Pagination count={5} variant="outlined" shape="rounded" className="announce-pagination" /> */}
                <Pagination
                  count={last_page}
                  page={currentpage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  className="announce-pagination"
                />
              </Stack>
            </Grid>
          )}

          {/* <Grid
              item
              xs={12}
             
              display="flex"
              justifyContent="center"
              alignContent="center"
              marginTop={10}
              
            >
                <Pagination count={last_page} page={currentpage}  variant="outlined" shape="rounded" className="announce-pagination" />
            </Grid>
           */}
        </Grid>
      </Grid>
    </>
  );
}
