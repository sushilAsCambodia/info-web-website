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

export default function LotteryPage() {
  const router = useRouter()
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
        <Grid xs={"auto"} container border="1px solid grey" borderRadius="10px">
          <MenuItem
            sx={{ borderRadius: "10px 0px 0px 10px" }}
            className={`${select === 0 ? "filterTabSelected" : ""}`}
            onClick={() => {
              setSelect(0);
            }}
          >
            All
          </MenuItem>
          <MenuItem
            sx={{ borderRadius: "0px 10px 10px 0px" }}
            className={`${select === 1 ? "filterTabSelected" : ""}`}
            onClick={() => {
              setSelect(1);
            }}
          >
            Favourite
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
                <StyledHeaderCell width="300px">Lottery</StyledHeaderCell>
                <StyledHeaderCell width="100px" align="left">
                  Issue
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="left">
                  Draw Time
                </StyledHeaderCell>
                <StyledHeaderCell width="500px" align="center">
                  Results
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Past Results
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Chart
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Favorite
                </StyledHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <>
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row" colSpan={7}>
                        <Grid display="flex" alignItems="center">
                          {" "}
                          <img
                            style={{
                              marginRight: "10px",
                              width: "30px",
                              height: "30px",
                              borderRadius: "20px",
                            }}
                            src={row.logo}
                          />
                          {row.lottoTitle}
                        </Grid>
                      </StyledTableCell>
                    </StyledTableRow>
                    {row.items.map((item, index) => {
                      return (
                        <StyledTableRow key={item.name}>
                          <StyledTableCell component="th" scope="row">
                            <Grid
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                width="30px"
                                src={item.img}
                                style={{ marginRight: "10px" }}
                              />{" "}
                              <Typography>{item.name}</Typography>
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.calories}
                          </StyledTableCell>
                          <StyledTableCell align="right">
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
                          <StyledTableCell align="right">
                            <IconButton
                              sx={{
                                background: "#F3F3F3",
                                border: "1px solid #DDDDDD",
                              }}
                              onClick={() => router.push('/lotteryPastResults')}
                            >
                              <Icon icon="solar:clipboard-list-broken" />
                            </IconButton>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <IconButton
                              sx={{
                                background: "#F3F3F3",
                                border: "1px solid #DDDDDD",
                              }}
                              onClick={() => handleChartOpen(row.id)}
                            >
                              <Icon icon="material-symbols:add-chart-rounded" />
                            </IconButton>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <IconButton
                              sx={{
                                background: "#F3F3F3",
                                border: "1px solid #DDDDDD",
                              }}
                            >
                              {item.calories % 2 == 0 ? (
                                <Icon
                                  color="#C9C9C9"
                                  icon="clarity:favorite-solid"
                                />
                              ) : (
                                <Icon
                                  color="#FF6F31"
                                  icon="clarity:favorite-solid"
                                />
                              )}
                            </IconButton>
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
