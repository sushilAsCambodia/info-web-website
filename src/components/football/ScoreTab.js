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
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import utils from "@/common/utils";
import moment from "moment/moment";

import { Icon } from "@iconify/react";
import { lottoTable } from "@/pages/LotteryPage";
import ActionModal from "./ActionModal";
import { Image } from "mui-image";
export default function ScoreTab() {
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
  function createData(img, name, calories, fat, data, id, analyze, favourite) {
    return { img, name, calories, fat, data, id, analyze, favourite };
  }
  const rows = [
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
      "Frozen yoghurt",
      159,
      "2023 Mar 23",
      32,
      1,
      "analysis of Asia and Europe",
      true
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
      "Ice cream sandwich",
      237,
      "2023 Mar 23",
      5,
      2,
      "analysis of Asia and Europe",
      false
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Eclair",
      262,
      "2023 Mar 23",
      32,
      3,
      "analysis of Asia and Europe",
      false
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Cupcake",
      305,
      "2023 Mar 23",
      5,
      4,
      "analysis of Asia and Europe",
      true
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Gingerbread",
      356,
      "2023 Mar 23",
      10,
      5,
      "analysis of Asia and Europe",
      true
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
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell width="60px">Competition</StyledHeaderCell>

                  <StyledHeaderCell width="50px" align="left">
                    Rounds
                  </StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="left">
                    Draw Time
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Home Team
                  </StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="center">
                    Score
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Visiting team
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Data
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Stream
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
                        <StyledTableCell align="left">
                          <Image width={30} src={item.img} alt="football_endtab"/>
                          <Typography>{item.name}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.fat}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.fat}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.fat}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.data}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.fat}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.fat}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton onClick={() => setOpenModal(true)}>
                            <Icon icon="ic:baseline-live-tv" color="#03C12D" />
                          </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.favourite ? (
                            <IconButton>
                              {" "}
                              <Icon
                                width={35}
                                color="orange"
                                icon="ic:round-star"
                              />
                            </IconButton>
                          ) : (
                            <IconButton>
                              {" "}
                              <Icon width={35} icon="ic:round-star" />
                            </IconButton>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
