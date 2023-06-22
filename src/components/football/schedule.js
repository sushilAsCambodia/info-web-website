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

export default function Schedule({footballList,loadings}) {
  const [select, setSelect] = useState(0);  
  const [filter, setFilter] = useState("China National");
  
  const [openModal, setOpenModal] = useState(false);
  
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  
  
  const footballLists = footballList?.filter((obj) => {
    return moment(obj.startTime).format(utils.dateFormate) == dateFilter;
  });


 const footballUpdatedList=dateFilter!=""?footballLists:footballList
 const pageCount = Math.ceil(footballUpdatedList?.length / 20);
 console.log("footballUpdatedListfootballUpdatedList",footballUpdatedList)
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
      <Grid container px={{xs:2,md:0}}>
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
                <ScheculeDateFilterBar fiterByDate={(value)=>setDateFilter(value)} />

        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell width="60px" align="left">{langKey && langKey.competition}</StyledHeaderCell>
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
            
              <TableBody>
             
                
                     {loadings &&  <TableRow><TableCell component="th" scope="row" colSpan={7}>
                        <Grid textAlign={"center"} item xs={12} paddingTop={5}>
                          <DataLoading />
                        </Grid>
                      </TableCell>
                    </TableRow>}
                { footballUpdatedList && footballUpdatedList.length>0 && footballUpdatedList.slice(
                        (currentPage - 1) * 20,
                        20 * currentPage
                      ).map((item, index) => {
                  return (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell align="left">
                        <Grid style={{ display: "flex", alignItems: "center" }}>
                          <Image
                            width={25}
                            src={item.icon}
                            alt="football_endtab"
                          />
                          <Typography mx={1}>{item.competitionName}</Typography>
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.stage}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.startTime}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.homeTeamName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.awayTeamName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                       
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.favourite ? (
                          <IconButton>
                            {" "}
                            <Icon
                              width={30}
                              color="orange"
                              icon="ic:round-star"
                            />
                          </IconButton>
                        ) : (
                          <IconButton>
                            {" "}
                            <Icon width={25} icon="ic:round-star" />
                          </IconButton>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
          
                     {footballUpdatedList && footballUpdatedList.length <= 0 && (  
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
                              {langKey && langKey.no_data_found } 
                            </Typography>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    )}





              </TableBody>
            </Table>
          </TableContainer>

          
          
          
          
          
          {footballUpdatedList?.length > 0 && (
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
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
              </Stack>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
