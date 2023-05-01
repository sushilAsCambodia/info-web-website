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
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

import { Icon } from "@iconify/react";
import { lottoTable } from "@/pages/LotteryPage";
export default function Schedule() {
  const [select, setSelect] = useState(0);
  const [filter, setFilter] = useState("China National");

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    background: "#FF6F31",
    borderRight: "1px solid #DDDDDD ",
    borderTop: "1px solid #DDDDDD ",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.grey,
    },
    color: "white",
    // hide last border
    "&:first-child": {
      borderLeft: "1px solid #DDDDDD",
    },
  }));
  function createData(img, name, calories, fat, results, id, analyze) {
    return { img, name, calories, fat, results, id, analyze };
  }

  const rows = [
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
      "Frozen yoghurt",
      159,
      "09-03-2023",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
      1,
      "analysis of Asia and Europe"
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
      "Ice cream sandwich",
      237,
      "21-09-2022",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 5 },
      2,
      "analysis of Asia and Europe"
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Eclair",
      262,
      "05-11-2022",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
      3,
      "analysis of Asia and Europe"
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Cupcake",
      305,
      "23-01-2023",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 5 },
      4,
      "analysis of Asia and Europe"
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Gingerbread",
      356,
      "11-11-2022",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 10 },
      5,
      "analysis of Asia and Europe"
    ),
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            sx={{
              background: "#FAFAFA",
              border: "1px solid #DDDDDD",
              borderRadius: "10px",
            }}
          >
            <Grid container xs={10} alignItems="center">
              <Grid item xs={"auto"} mx={1} container>
                <Typography sx={{ fontWeight: "bold" }} mr={1}>
                  Today
                </Typography>{" "}
                <Divider orientation="vertical" flexItem />
              </Grid>
              <Grid item xs={"auto"} mx={1} container>
                <Typography sx={{ fontWeight: "bold" }} mr={1}>
                  Thu
                </Typography>{" "}
                <Divider orientation="vertical" flexItem />
              </Grid>
              <Grid item xs={"auto"} mx={1} container>
                <Typography sx={{ fontWeight: "bold" }} mr={1}>
                  Fri
                </Typography>{" "}
                <Divider orientation="vertical" flexItem />
              </Grid>
            </Grid>
            <Grid
              xs={2}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <FormControl sx={{ m: 1 }} size="small">
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon icon="material-symbols:calendar-today" width={25}/>
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {/* <FormHelperText>Without label</FormHelperText> */}
              </FormControl>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell width="50px">Issue</StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="left">
                    Draw Time
                  </StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="left">
                    Rounds
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Home Team
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Score
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Visiting team
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Data
                  </StyledHeaderCell>
                  <StyledHeaderCell width="100px" align="center">
                    Analysis
                  </StyledHeaderCell>
                  <StyledHeaderCell width="50px" align="center">
                    Favourite
                  </StyledHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((item, index) => {
                  return (
                    <>
                      <StyledTableRow key={item.name}>
                        <StyledTableCell align="left">
                          {item.calories}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.fat}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.fat}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.fat}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.fat}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.fat}
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
                        <StyledTableCell align="left">
                          {item.id}
                        </StyledTableCell>
                      </StyledTableRow>
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
