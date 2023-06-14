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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";
import { useSelector } from "react-redux";

import { Icon } from "@iconify/react";
import { lottoTable } from "./LotteryPage";
import { Image } from "mui-image";
export default function LotteryPastReults() {
  const [select, setSelect] = useState(0);
  const [filter, setFilter] = useState("China National");

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    background: "#F3F3F3",
    borderRight: "1px solid #DDDDDD ",
    borderTop: "1px solid #DDDDDD ",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.grey,
    },
    // hide last border
    "&:first-of-type": {
      borderLeft: "1px solid #DDDDDD",
    },
  }));
  function createData(img, name, calories, fat, results, id) {
    return { img, name, calories, fat, results, id };
  }

  const rows = [
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
      "Frozen yoghurt",
      159,
      "2023 Mar 23",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
      1
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
      "Ice cream sandwich",
      237,
      "2023 Mar 23",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 5 },
      2
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Eclair",
      262,
      "2023 Mar 23",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
      3
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Cupcake",
      305,
      "2023 Mar 23",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 5 },
      4
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Gingerbread",
      356,
      "2023 Mar 23",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 10 },
      5
    ),
  ];

  return (
    <>
      <TitleBreadCrumbs title={"Past Result"} />
      <Grid container height='100vh'>
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
              {langKey && langKey.view_by_category}
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
            {langKey && langKey.view_by_time}
              </MenuItem>
            </Grid>

            <Grid container>
              <Grid className="container" item xs={10}>
                {/* <!-- completed --> */}
                <div
                  className={`step ${
                    filter == "China National" ? "completed" : ""
                  }`}
                >
                  <div className="v-stepper">
                    <div
                    onClick={() => {
                      setFilter("China National");
                    }}
                      className="circle"
                      style={{
                        "--iconImg": `url("https://thumbs.dreamstime.com/b/modern-creative-color-triangle-arrow-shape-logo-design-creative-color-triangle-arrow-shape-logo-design-142723014.jpg")`,
                      }}
                    ></div>
                    <div className="line"></div>
                  </div>

                  <div
                    className="contents"
                    onClick={() => {
                      setFilter("China National");
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    China National Welfare Lottery
                  </div>
                </div>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  {/* <!-- active --> */}
                  <div
                    className={`step ${
                      filter == "Double color" ? "completed" : ""
                    }`}
                  >
                    <div className="v-stepper">
                      <div
                      onClick={() => {
                        setFilter("Double color");
                      }}
                        className="circle"
                        style={{
                          "--iconImg": `url("https://c8.alamy.com/comp/2A8GB3A/red-star-in-circle-icon-on-white-background-flat-style-red-star-in-circle-icon-for-your-web-site-design-logo-app-ui-set-of-star-circle-symbol-r-2A8GB3A.jpg")`,
                        }}
                      ></div>
                      <div className="line"></div>
                    </div>
                    <div
                      className="contents"
                      onClick={() => {
                        setFilter("Double color");
                      }}
                    >
                      Double color ball
                    </div>
                  </div>

                  {/* <!-- empty --> */}
                  <div
                    className={`step ${
                      filter == "Welfare 3D" ? "completed" : ""
                    }`}
                  >
                    <div className="v-stepper">
                      <div
                      onClick={() => {
                        setFilter("Welfare 3D");
                      }}
                        className="circle"
                        style={{
                          "--iconImg": `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqy_oXQU85RpvKBMoJwuj22hHTActWhqArVA&usqp=CAU")`,
                        }}
                      ></div>
                      <div className="line"></div>
                    </div>

                    <div
                      className="contents"
                      onClick={() => {
                        setFilter("Welfare 3D");
                      }}
                    >
                      Welfare 3D
                    </div>
                  </div>

                  {/* <!-- regular --> */}
                  <div
                    className={`step ${
                      filter == "Colorful lottery" ? "completed" : ""
                    }`}
                  >
                    <div className="v-stepper">
                      <div
                      onClick={() => {
                        setFilter("Colorful lottery");
                      }}
                        className="circle"
                        style={{
                          "--iconImg": `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLYFhTpGv_NCmwQ48A7jvD3hQrQvd_6JLGTQ&usqp=CAU")`,
                        }}
                      ></div>
                      <div className="line"></div>
                    </div>

                    <div
                      className="contents"
                      onClick={() => {
                        setFilter("Colorful lottery");
                      }}
                    >
                      Colorful lottery
                    </div>
                  </div>
                </Collapse>
              </Grid>
              <Grid item xs={2} textAlign="right">
                <IconButton
                  onClick={handleExpandClick}
                  className="rotate"
                  sx={{ paddingTop: "15px" }}
                >
                  <Icon
                    width="15px"
                    className={`${expanded ? "rotate90" : "rotate0"}`}
                    icon="material-symbols:arrow-forward-ios-rounded"
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} p={1}>
          <Grid border="1px solid #DDDDDD" container p={1}>
            <Grid container item xs={6} alignItems="center">
              <Image
                alt="Welfare lottery lottery"
                width="30px"
                height="30px"
                style={{ borderRadius: "30px" }}
                src="https://t.pimg.jp/040/863/617/1/40863617.jpg"
              />
              <Typography ml={1}>Welfare lottery lottery</Typography>{" "}
            </Grid>
            <Grid
            item
              xs={6}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>{langKey && langKey.select_issue} </em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {/* <FormHelperText>Without label</FormHelperText> */}
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  background: "#FF6F31",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  color: "white",
                  textTransform:"capitalize"
                }}
              >
              {langKey && langKey.search} 
              </Button>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledHeaderCell width="50px">  {langKey && langKey.issue} </StyledHeaderCell>
                    <StyledHeaderCell width="50px" align="left">
                 {langKey && langKey.draw_time} 
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                        {langKey && langKey.result} 
                    </StyledHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((item, index) => {
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
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
