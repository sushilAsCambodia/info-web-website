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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

import { Icon } from "@iconify/react";

export default function LotteryPastReults() {
  const [select, setSelect] = useState(0);
  const [age, setAge] = useState("");

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
    "&:first-child": {
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

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Lottery
      </Typography>
      <Grid container>
        <Grid item xs={4} p={1}>
          <Grid py={1} border="1px solid #DDDDDD">
            <Grid container justifyContent="center" borderRadius="10px">
              <MenuItem
                sx={{
                  borderRadius: "10px 0px 0px 10px",
                  padding: "10px",
                  border: "1px solid #DDDDDD",
                  borderRight: "0px",
                  background: "#F3F3F3",
                }}
                className={`${select === 0 ? "filterTabSelected" : ""}`}
                onClick={() => {
                  setSelect(0);
                }}
              >
                View By Category
              </MenuItem>
              <MenuItem
                sx={{
                  borderRadius: "0px 10px 10px 0px",
                  padding: "10px",
                  border: "1px solid #DDDDDD",
                  background: "#F3F3F3",
                }}
                className={`${select === 1 ? "filterTabSelected" : ""}`}
                onClick={() => {
                  setSelect(1);
                }}
              >
                View By Time
              </MenuItem>
            </Grid>
            
            <div class="container">
              {/* <!-- completed --> */}
              <div class="step completed">
                <div class="v-stepper">
                  <div class="circle circleCompleted" style={{"--iconImg": `url("https://www.freevector.com/uploads/vector/preview/13627/FreeVector-Rainbow-Star.jpg")`,}}>
                  </div>
                  <div class="line"></div>
                </div>

                <div class="content">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum is simply dummy
                  text of the printing and typesetting industry.
                </div>
              </div>

              {/* <!-- active --> */}
              <div class="step">
                <div class="v-stepper">
                  <div class="circle"></div>
                  <div class="line"></div>
                </div>

                <div class="content">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div>
              </div>

              {/* <!-- empty --> */}
              <div class="step">
                <div class="v-stepper">
                  <div class="circle"></div>
                  <div class="line"></div>
                </div>

                <div class="content">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum is simply dummy text of the
                  printing and typesetting
                </div>
              </div>

              {/* <!-- regular --> */}
              <div class="step">
                <div class="v-stepper">
                  <div class="circle"></div>
                  <div class="line"></div>
                </div>

                <div class="content">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum is simply dummy
                  text of the printing and typesetting industry.
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={8} p={1}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell width="50px">Lottery</StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="left">
                    Issue
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Draw Time
                  </StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <>
                      {row.items.map((item, index) => {
                        return (
                          <StyledTableRow key={item.name}>
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
                          </StyledTableRow>
                        );
                      })}
                    </>
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
