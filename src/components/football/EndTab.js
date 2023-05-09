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
  export default function EndTab() {
    const [select, setSelect] = useState(0);
    const [filter, setFilter] = useState("China National");
  
    const [dateFilter, setDateFilter] = useState("");
  
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
    function createData(img, name, calories, fat, data, id, analyze, score) {
      return { img, name, calories, fat, data, id, analyze, score };
    }
    function Last7Days() {
      var result = [];
      for (var i = 0; i < 7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push({
          day: moment(d).format(utils.dateLetter),
          monthyear: moment(d).format(utils.MonthYearFormat),
        });
      }
      console.log("::: 7 days ", result);
      return result;
    }
    const rows = [
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
        "Frozen yoghurt",
        159,
        "09-03-2023",
        32,
        1,
        "analysis of Asia and Europe",
        {team1:2,team2:0}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
        "Ice cream sandwich",
        237,
        "21-09-2022",
        5,
        2,
        "analysis of Asia and Europe",
        {team1:1,team2:3}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Eclair",
        262,
        "05-11-2022",
        32,
        3,
        "analysis of Asia and Europe",
        {team1:0,team2:0}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Cupcake",
        305,
        "23-01-2023",
        5,
        4,
        "analysis of Asia and Europe",
        {team1:1,team2:1}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Gingerbread",
        356,
        "11-11-2022",
        10,
        5,
        "analysis of Asia and Europe",
        {team1:2,team2:2}
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
                marginBottom:"10px"
              }}
            >
              <Grid container xs={10} alignItems="center">
                {Last7Days().map((item, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      xs={"auto"}
                      mx={1}
                      container
                      className={`${
                        item.day === dateFilter ? "dateSelected" : ""
                      }`}
                      onClick={() => {
                        setDateFilter(item.day);
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }} mr={1}>
                        {item.day}
                      </Typography>
                      <Typography mr={1}>{item.monthyear}</Typography>
                      <Divider orientation="vertical" flexItem />
                    </Grid>
                  );
                })}
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
                        <Icon icon="material-symbols:calendar-today" width={25} />
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
                    <StyledHeaderCell width="60px">Competition</StyledHeaderCell>
  
                    <StyledHeaderCell width="50px" align="left">
                      Rounds
                    </StyledHeaderCell>
                    <StyledHeaderCell width="50px" align="left">
                      Draw Time
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                      Competing Team
                    </StyledHeaderCell>
                    <StyledHeaderCell width="50px" align="center">
                      State
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                      Home team
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                      Score
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                      Visiting Team
                    </StyledHeaderCell>
                    <StyledHeaderCell width="30px" align="center">
                      Half Time
                    </StyledHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((item, index) => {
                    return (
                      <>
                        <StyledTableRow key={item.id}>
                          <StyledTableCell align="center">
                            <img width={30} src={item.img} />
                            <Typography>{item.name}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.fat}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.fat}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.fat}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.data}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.fat}
                          </StyledTableCell>
                          <StyledTableCell align="center">
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
                              {item.analyze}
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                           {item.score.team1} - {item.score.team2}
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
  