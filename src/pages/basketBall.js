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
import { useRouter } from "next/router";
const style = {
  position: "absolute",
  top: "300px",
  left: "75%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #DDDDDD",
  p: 2,
};

export default function basketBall() {
  const router = useRouter();
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
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
      "Frozen yoghurt",
      111,
      6.0,
      { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
      1
    ),
  ];
  // past result modal controls
  const [pastResultModalData, setPastResultModalData] = useState("");

  const [pastResult, setPastResult] = useState(false);
  const handleOpen = (data) => {
    setPastResultModalData(data);
    setPastResult(true);
  };
  // chart modal control
  const [chartModalData, setChartModalData] = useState("");

  const [chart, setChart] = useState(false);
  const handleChartOpen = (data) => {
    setChartModalData(data);
    setChart(true);
  };

  const handleClose = () => {
    setChart(false);
    setPastResult(false);
  };
  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Lottery
      </Typography>
      {/* past result modal  */}
      <Modal
        open={pastResult}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={pastResult}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Past Result Modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              has ID of {pastResultModalData}
            </Typography>
          </Box>
        </Fade>
      </Modal>
      {/* chart modal  */}
      <Modal
        open={chart}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={chart}>
          <Grid sx={style}>
            <Divider>
              <Typography id="transition-modal-title" variant="h6">
                Speed ​​color series {chartModalData}
              </Typography>
            </Divider>
            <Grid container>
              <Grid item xs={4} p={1} position="relative">
                <div class="ribbon ribbon-top-right">
                  <span>New</span>
                </div>

                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} p={1}>
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <Typography>Speed Racing</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
      <Grid container mb={2} alignItems="center" justifyContent="space-between">
        <Grid xs={"auto"} container border="1px solid grey" borderRadius="5px">
          <MenuItem
            sx={{ borderRadius: "5px 0px 0px 5px" }}
            className={`${select === 0 ? "filterTabSelected" : ""}`}
            onClick={() => {
              setSelect(0);
            }}
          >
            Follow
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 0px 0px 0px" }}
            className={`${select === 1 ? "filterTabSelected" : ""}`}
            onClick={() => {
              setSelect(1);
            }}
          >
            Score
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 0px 0px 0px" }}
            className={`${select === 2 ? "filterTabSelected" : ""}`}
            onClick={() => {
              setSelect(2);
            }}
          >
            End
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 5px 5px 0px" }}
            className={`${select === 3 ? "filterTabSelected" : ""}`}
            onClick={() => {
              setSelect(3);
            }}
          >
            Schedule
          </MenuItem>
        </Grid>
        <Grid xs={2}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Select Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="category-select"
              value={age}
              label="Select Category"
              onChange={handleChange}
              style={{ paddingY: "0px" }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledHeaderCell width="200px">
                  Taiwan Basket Ball
                </StyledHeaderCell>
                <StyledHeaderCell width="200px" align="left">
                  Chapter 2
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="left">
                  session 1
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="center">
                  Session 2
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Session 3
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Session 4
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Up and Down
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Audience
                </StyledHeaderCell>
                <StyledHeaderCell width="150px" align="right">
                  Points difference
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Total score
                </StyledHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item, index) => {
                return (
                  <>
                    <StyledTableRow key={item.name}>
                      <StyledTableCell component="th" scope="row">
                        <Grid sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            width="30px"
                            src={item.img}
                            style={{ marginRight: "10px" }}
                          />{" "}
                          <Typography>{item.name}</Typography>
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ verticalAlign: "top" }}
                      >
                        <Typography >
                        {item.calories}
                        </Typography>
                        <Typography >
                        {item.calories}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ verticalAlign: "top" }}
                      >
                        <Typography >
                        {item.fat}
                        </Typography>
                        <Typography >
                        {item.fat}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ verticalAlign: "top" }}
                      >
                        <Typography >
                        {item.fat}
                        </Typography>
                        <Typography >
                        {item.fat}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ verticalAlign: "top" }}
                      >
                        <Typography >
                        {item.fat}
                        </Typography>
                        <Typography >
                        {item.id}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ verticalAlign: "top" }}
                      >
                        <Typography >
                        {item.fat}
                        </Typography>
                        <Typography >
                        {item.id}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ verticalAlign: "top" }}
                      >
                        <Typography >
                        {item.fat}
                        </Typography>
                        <Typography >
                        {item.id}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ verticalAlign: "top" }}
                      >
                        <Typography >
                        {item.fat}
                        </Typography>
                        <Typography >
                        {item.id}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ verticalAlign: "top" }}
                      >
                        <Typography >
                        {item.fat}
                        </Typography>
                        <Typography >
                        {item.id}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ verticalAlign: "top" }}
                      >
                        <Typography >
                        Half: {item.fat}
                        </Typography>
                        <Typography >
                        Half: {item.fat}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
