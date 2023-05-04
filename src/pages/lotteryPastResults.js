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

import { Icon } from "@iconify/react";
import { lottoTable } from "./LotteryPage";
export default function LotteryPastReults() {
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
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
      "Frozen yoghurt",
      159,
      "09-03-2023",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
      1
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
      "Ice cream sandwich",
      237,
      "21-09-2022",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 5 },
      2
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Eclair",
      262,
      "05-11-2022",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
      3
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Cupcake",
      305,
      "23-01-2023",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 5 },
      4
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
      "Gingerbread",
      356,
      "11-11-2022",
      { numbers: [12, 32, 4, 5, 12, 34], winner: 10 },
      5
    ),
  ];

  return (
    <>
      <TitleBreadCrumbs title={"Past Result"} />
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

            <Grid container>
              <Grid class="container" item xs={10}>
                {/* <!-- completed --> */}
                <div
                  className={`step ${
                    filter == "China National" ? "completed" : ""
                  }`}
                >
                  <div class="v-stepper">
                    <div
                    onClick={() => {
                      setFilter("China National");
                    }}
                      class="circle"
                      style={{
                        "--iconImg": `url("https://thumbs.dreamstime.com/b/modern-creative-color-triangle-arrow-shape-logo-design-creative-color-triangle-arrow-shape-logo-design-142723014.jpg")`,
                      }}
                    ></div>
                    <div class="line"></div>
                  </div>

                  <div
                    class="content"
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
                    <div class="v-stepper">
                      <div
                      onClick={() => {
                        setFilter("Double color");
                      }}
                        class="circle"
                        style={{
                          "--iconImg": `url("https://c8.alamy.com/comp/2A8GB3A/red-star-in-circle-icon-on-white-background-flat-style-red-star-in-circle-icon-for-your-web-site-design-logo-app-ui-set-of-star-circle-symbol-r-2A8GB3A.jpg")`,
                        }}
                      ></div>
                      <div class="line"></div>
                    </div>
                    <div
                      class="content"
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
                    <div class="v-stepper">
                      <div
                      onClick={() => {
                        setFilter("Welfare 3D");
                      }}
                        class="circle"
                        style={{
                          "--iconImg": `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqy_oXQU85RpvKBMoJwuj22hHTActWhqArVA&usqp=CAU")`,
                        }}
                      ></div>
                      <div class="line"></div>
                    </div>

                    <div
                      class="content"
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
                    <div class="v-stepper">
                      <div
                      onClick={() => {
                        setFilter("Colorful lottery");
                      }}
                        class="circle"
                        style={{
                          "--iconImg": `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLYFhTpGv_NCmwQ48A7jvD3hQrQvd_6JLGTQ&usqp=CAU")`,
                        }}
                      ></div>
                      <div class="line"></div>
                    </div>

                    <div
                      class="content"
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
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
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
            <Grid container xs={6} alignItems="center">
              <img
                width="40px"
                height="40px"
                style={{ borderRadius: "30px" }}
                src="https://t.pimg.jp/040/863/617/1/40863617.jpg"
              />
              <Typography ml={1}>Welfare lottery lottery</Typography>{" "}
            </Grid>
            <Grid
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
                    <em>None</em>
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
                }}
              >
                Search
              </Button>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledHeaderCell width="50px">Issue</StyledHeaderCell>
                    <StyledHeaderCell width="50px" align="left">
                      Draw Time
                    </StyledHeaderCell>
                    <StyledHeaderCell width="100px" align="center">
                      Result
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
                      </>
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
