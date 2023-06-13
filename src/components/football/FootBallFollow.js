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
  Collapse,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import utils from "@/common/utils";
import moment from "moment/moment";
import Pagination from "@mui/material/Pagination";
import { Icon } from "@iconify/react";
import { lottoTable } from "@/pages/LotteryPage";
import ActionModal from "./ActionModal";
import { Image } from "mui-image";
export default function FootBallFollow() {
  const [select, setSelect] = useState(0);
  const [filter, setFilter] = useState("China National");

  const [openModal, setOpenModal] = useState(false);

  const [age, setAge] = useState("");

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
  function createData(img, name, calories, fat, data, id, favourite,awayTeam) {
    return { img, name, calories, fat, data, id, favourite,awayTeam };
  }
  const rows = [
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
      "Frozen yoghurt",
      159,
      '03-12 16:00',
      1,
      "[18] Gunma Hot Spring",
      true,
      'Yamagata Mountain God'
    ),
   
  
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Cupcake",
      305,
      '03-12 16:00',
      4,
      "[18] Gunma Hot Spring",
      true,
      'Yamagata Mountain God'
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Gingerbread",
      356,
      '03-12 16:00',
      5,
      "[18] Gunma Hot Spring",
      true,
      'Yamagata Mountain God'
    ),
  ];

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
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell width="60px">League</StyledHeaderCell>

                  <StyledHeaderCell width="50px" align="center">
                    Rounds
                  </StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="center">
                    Match Time
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    State
                  </StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="center">
                    Home Team
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Score
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Visiting team
                  </StyledHeaderCell>
                  <StyledHeaderCell width="30px" align="center">
                    Favourite
                  </StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((item, index) => {
                  return (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell align="left" >
                          <Grid style={{display:'flex'}}>
                          <Image width={25} src={item.img} alt="football_endtab"/>
                          <Typography mx={1}>{item.name}</Typography></Grid>
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          {item.calories} 
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.fat}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.data}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.id} 
                        </StyledTableCell>
                        
                        <StyledTableCell align="center">
                          {item.fat} <IconButton onClick={() => setOpenModal(true)}>
                            <Icon icon="ic:baseline-live-tv" color="#03C12D" />
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.awayTeam}
                         
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.favourite ? (
                            <IconButton>
                              {" "}
                              <Icon
                                width={25}
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
      </Grid>
    </>
  );
}
