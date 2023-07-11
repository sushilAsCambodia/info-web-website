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
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import utils from "@/common/utils";
import moment from "moment/moment";

import { Icon } from "@iconify/react";
import { lottoTable } from "@/pages/LotteryPage";
import ActionModal from "./ActionModal";
import { Image } from "mui-image";
import ScheculeDateFilterBar from "@/common/scheculeDateFilterBar";
import DataLoading from "@/components/DataLoading";
import { useSelector } from "react-redux";

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

  const [openModal, setOpenModal] = useState(false);

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
        <Grid item xs={12} style={{height:"10px!important"}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} className="tablehover" aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell width="60px" align="left">
                    {langKey && langKey.competition}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="center">
                    {langKey && langKey.rounds}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="center">
                    {langKey && langKey.competing_time}
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
                  <StyledHeaderCell width="100px" align="center">
                    {langKey && langKey.location}
                  </StyledHeaderCell>
                  <StyledHeaderCell width="30px" align="center">
                    {langKey && langKey.favourite}
                  </StyledHeaderCell>
                </TableRow>
              </TableHead>
              {loadings ? (
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={7}>
                      <Grid textAlign={"center"} item xs={12} paddingTop={5}>
                        <DataLoading />
                      </Grid>
                    </TableCell>
                  </TableRow>)
                :
              (<TableBody>
                
                {footballScheduleList &&
                  footballScheduleList.length > 0 ?
                  footballScheduleList.map((item, index) => {
                    let stage=item.stage
                    return (
                      <StyledTableRow key={item.id} className="xxx">
                        <StyledTableCell align="left">
                          <Grid
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Image
                              width={25}
                              src={item && item.competition && item.competition.image}
                              alt="football_endtab"
                            />
                            <Typography mx={1}>
                              {lang_id==1?item?.competition?.nameEn:lang_id==2?item?.competition?.name:item?.competition?.nameEn}
                            </Typography>
                          </Grid>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {lang_id==1?stage.match(regex):lang_id==3?stage.match(regex):stage}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.startTime}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {/* {item.homeTeamName} */}
                          {/* {item.home_team==null && lang_id==1?'':item.home_team && lang_id==1?:item.homeTeamName} */}
                          {item.home_team && lang_id==1?item.home_team && item.home_team.nameEn:item.home_team && lang_id==2?item.home_team && item.home_team.name:item.home_team && lang_id==3?item.home_team && item.home_team.nameEn:''}
                        </StyledTableCell>
                        <StyledTableCell align="center">--</StyledTableCell>
                        <StyledTableCell align="center">
                          {/* {item.awayTeamName} */}
                          {item.away_team && lang_id==1?item.away_team && item.away_team.nameEn:item.away_team && lang_id==2?item.away_team && item.away_team.name:item.away_team && lang_id==3?item.away_team && item.away_team.nameEn:''}
                        </StyledTableCell>
                        <StyledTableCell align="center">--</StyledTableCell>
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
                 : <>
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
                  </>
                  }

               
              </TableBody>
              )}
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
