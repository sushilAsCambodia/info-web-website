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
  
import CircularProgress from '@mui/material/CircularProgress';
  import Pagination from "@mui/material/Pagination";
  import { useState } from "react";
  import utils from "@/common/utils";
  import moment from "moment/moment";
  import { makeStyles } from '@mui/styles';
  
  import { Icon } from "@iconify/react";
  import { lottoTable } from "@/pages/LotteryPage";
import { Image } from "mui-image";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      border: '1px solid #DDDDDD'
    }
  }

});

/********FootBall Completed */
  export default function FootBallEnd({footballEndList,lang_id,loadings,datefilters,last_page,pageChange,currentpage,fiterByDate }) {
    const [select, setSelect] = useState(0);
    const [filter, setFilter] = useState("China National");  
    const [rowPerPage, setRowPerPage] = useState(20);
  
    const [dateFilter, setDateFilter] = useState(moment(d).format('DD'));
  
    const [age, setAge] = useState("");
    const langKey = useSelector(
      (state) => state && state.load_language && state.load_language.language
    );
  
    const handleChange = (event) => {
      setAge(event.target.value);
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
    function createData(img, name, calories, fat, data, id, analyze, score) {
      return { img, name, calories, fat, data, id, analyze, score };
    }
   
    function Last7Days() {
      var result = [];
      for (var i = 8; i >= 0; i--) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push({       
          dateChecks:moment(d).format(utils.dateFormate1), 
          dChecks:moment(d).format("DD"),          
          date:moment(d).format(utils.dateFormate),
          day: moment(d).format(utils.dateLetter),
          DateMonth: moment(d).format(utils.DateMonthFormat3),
          Month: moment(d).format(utils.DateMonthFormat4),
          MonthNum: moment(d).format(utils.DateMonthFormat5),
          ddmmmyyyy:moment(d).format(utils.letterFormat2)
        });
      }
      
      return result;
    }
   
    const handlePageChange = (event, value) => {      
      pageChange(value);
    };
    var regex = /\d+/g;
    const pageCount = Math.ceil(footballEndList?.length / 20);
    const classes = useStyles();
    var d = new Date();
    const datecheck= moment(d).format('DD')
  
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
                  let month=item.Month
                  //console.log("dateFilter",moment(d).format('DD'),item.DateMonth)
        return (
          <Grid
            key={index}
            item
            className={`${item.DateMonth === dateFilter ? "dateSelected" : ""}`}
            onClick={() => {
             datefilters(item.date);
              setDateFilter(item.DateMonth);
            }}
            sx={{ borderRight: "1px solid #ddd",whiteSpace:'nowrap',cursor:'pointer',display:{xs:'',md:'block', textAlign:"center", padding:"0px 25px",}, textTransform:"uppercase" ,alignItems:'center' }}
          >           
            <Typography
              sx={{  fontSize: {xs:"13px",md:"15px"} }}
              px={0.75}
            >
              {item.dChecks!==datecheck && langKey && langKey[item.day]}
            </Typography>
            <Typography px={0.75} sx={{ fontSize: {xs:"13px",md:"15px"} }}>
              {item.dChecks==datecheck?langKey && langKey.todays: ''}
            </Typography>
          {lang_id===1?
            <Typography
              sx={{  fontSize: {xs:"13px",md:"15px"} }}
              px={0.75}
            >
              {item.DateMonth }  {langKey && langKey[month]}
            </Typography>
:
            <Typography
              sx={{  fontSize: {xs:"13px",md:"15px"} }}
              px={0.75}
            >
               {item.MonthNum}{langKey && langKey.Month}{item.DateMonth }{langKey && langKey.Day}
            </Typography>}
            
          </Grid>
        );
                })}
              </Grid>
             
            </Grid>
            <Grid item xs={12} >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} className={classes.table} id="tablehover"  aria-label="customized table">
                <TableHead size="small">
                  <TableRow>
                    <StyledHeaderCell width="170px">  {langKey && langKey.competition}</StyledHeaderCell>  
                    <StyledHeaderCell width="50px" align="center">
                      {langKey && langKey.rounds}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="20px" align="center">
                     {langKey && langKey.time}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="20px" align="center">
                      {/* {langKey && langKey.state} */}
                      {langKey && langKey.status}
                    </StyledHeaderCell>
                    
                    <StyledHeaderCell width="170px" align="center">
                      {langKey && langKey.home_team}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="50px" align="center">
                    {langKey && langKey.score}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="170px" align="center">
                     {langKey && langKey.away_team}
                    </StyledHeaderCell>
                    <StyledHeaderCell width="50px" align="center">
                    {langKey && langKey.half_time}
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
                  
                  )}
                <TableBody>
                { footballEndList && footballEndList.length>0 ? footballEndList.map((item, index) => {
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
                    return (
                        <StyledTableRow key={item.id} className="rowHeight">
                          <StyledTableCell align="left"  style={{height:"45px!important",color:font_color, background:background_color }}>
                          <Grid
                            style={{ display: "flex", alignItems: "center", background:background_color }}
                          >
                            <Image
                              width={25}
                              src={item && item.competition && item.competition.image}
                              alt="football_endtab"
                            />
                            <Typography mx={1} fontSize={'13px'}>                           
                              {lang_id==1?item?.competition?.nameEn:lang_id==2?item?.competition?.name:item?.competition?.nameEn}
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
                          {langKey && langKey.ft}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                          {item.home_team && lang_id==1?item.home_team && item.home_team.nameEn:item.home_team && lang_id==2?item.home_team && item.home_team.nameFull:item.home_team && lang_id==3?item.home_team && item.home_team.nameEnFull:''}
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
                             {item.away_team && lang_id==1?item.away_team && item.away_team.nameEn:item.away_team && lang_id==2?item.away_team && item.away_team.nameFull:item.away_team && lang_id==3?item.away_team && item.away_team.nameEnFull:''}
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell align="center">                          
                          {item.halfTimeScore}
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
              </Table>
            </TableContainer>
</Grid>

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
                {/* <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        /> */}
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

          </Grid>
        </Grid>
      </>
    );
  }
  