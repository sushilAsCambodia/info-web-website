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
    Stack,

    Fade,
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
import { Image } from "mui-image";
import { useSelector } from "react-redux";


  export default function FootBallEnd({footballEndList}) {
    const [select, setSelect] = useState(0);
    const [filter, setFilter] = useState("China National");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(20);
  
    const [dateFilter, setDateFilter] = useState("");
  
    const [age, setAge] = useState("");
    const langKey = useSelector(
      (state) => state && state.load_language && state.load_language.language
    );
  
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
      
      return result;
    }
    const rows = [
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
        "Frozen yoghurt",
        159,
        "1 Subject to tie/half 0",
      '[18] Gunma Hot Spring',
        1,
        "Yamagata Mountain God",
        {team1:2,team2:0}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
        "Ice cream sandwich",
        237,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        2,
        "Yamagata Mountain God",
        {team1:1,team2:3}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Eclair",
        262,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        3,
        "Yamagata Mountain God",
        {team1:0,team2:0}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Cupcake",
        305,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        4,
        "Yamagata Mountain God",
        {team1:1,team2:1}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Gingerbread",
        356,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        5,
        "Yamagata Mountain God",
        {team1:2,team2:2}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Gingerbread",
        356,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        5,
        "Yamagata Mountain God",
        {team1:2,team2:2}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Gingerbread",
        356,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        5,
        "Yamagata Mountain God",
        {team1:2,team2:2}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Gingerbread",
        356,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        5,
        "Yamagata Mountain God",
        {team1:2,team2:2}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Gingerbread",
        356,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        5,
        "Yamagata Mountain God",
        {team1:2,team2:2}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Gingerbread",
        356,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        5,
        "Yamagata Mountain God",
        {team1:2,team2:2}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Gingerbread",
        356,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        5,
        "Yamagata Mountain God",
        {team1:2,team2:2}
      ),
      createData(
        "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
        "Gingerbread",
        356,
        "1 Subject to tie/half 0",
        '[18] Gunma Hot Spring',
        5,
        "Yamagata Mountain God",
        {team1:2,team2:2}
      ),
    ];
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
    
    const pageCount = Math.ceil(footballEndList?.length / 20);
    return (
      <>
        <Grid container px={{xs:2,md:0}}>
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
              <Grid container item xs={10} alignItems="center">
                {Last7Days().map((item, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      xs={"auto"}
                      sx={{cursor:'pointer'}}
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
                      <Typography  mr={1}>{item.monthyear}</Typography>
                      <Divider orientation="vertical" flexItem />
                    </Grid>
                  );
                })}
              </Grid>
              <Grid
              item
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
                      <em> {langKey && langKey.date}</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  
                </FormControl>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledHeaderCell width="100px">  {langKey && langKey.competition}</StyledHeaderCell>
  
                    <StyledHeaderCell width="50px" align="center">
                  {langKey && langKey.rounds}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="50px" align="center">
                  {langKey && langKey.competing_time}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                {langKey && langKey.state}
                    </StyledHeaderCell>
                    
                    <StyledHeaderCell width="100px" align="center">
                 {langKey && langKey.home_team}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                 {langKey && langKey.score}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                     {langKey && langKey.away_team}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="30px" align="center">
          {langKey && langKey.half_time}
                    </StyledHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { footballEndList && footballEndList.slice(
                        (currentPage - 1) * 20,
                        20 * currentPage
                      ).map((item, index) => {
                    return (
                        <StyledTableRow key={item.id}>
                          <StyledTableCell align="center">
                           <Grid display='flex' alignItems="center">
                             <Image width={30} src={item.img} alt="football" />
                             <Typography mx={1}> {item.competitionName}</Typography>
                           </Grid>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                          {item.stage}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                          {item.startTime}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                           
                          </StyledTableCell>
                          <StyledTableCell align="center">
                          {item.homeTeamName}
                          </StyledTableCell>
                          
                          <StyledTableCell align="center">
                          {item.finalScore}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Grid
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                             {item.awayTeamName}
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell align="center">                          
                          {item.halfTimeScore}
                          </StyledTableCell>
                        </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>


            {footballEndList?.length > 0 && (
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
  