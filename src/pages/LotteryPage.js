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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
export default function LotteryPage() {
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
      logo: "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
      items: [
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
          "Frozen yoghurt",
          159,
          6.0,
          {numbers:[12,32,4,5,12,34],winner:32},
          1
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
          "Ice cream sandwich",
          237,
          9.0,
          {numbers:[12,32,4,5,12,34],winner:5},
          2
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Eclair",
          262,
          16.0,
          {numbers:[12,32,4,5,12,34],winner:32},
          3
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Cupcake",
          305,
          3.7,
          {numbers:[12,32,4,5,12,34],winner:5},
          4
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Gingerbread",
          356,
          16.0,
          {numbers:[12,32,4,5,12,34],winner:10},
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
          {numbers:[12,32,4,5,12,34],winner:32},
          1
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back04.jpg",
          "Ice cream sandwich",
          237,
          9.0,
          {numbers:[12,32,4,5,12,34],winner:5},
          2
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Eclair",
          262,
          16.0,
          {numbers:[12,32,4,5,12,34],winner:32},
          3
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Cupcake",
          305,
          3.7,
          {numbers:[12,32,4,5,12,34],winner:5},
          4
        ),
        createData(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/back02.jpg",
          "Gingerbread",
          356,
          16.0,
          {numbers:[12,32,4,5,12,34],winner:10},
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
                <StyledHeaderCell width="300px">
                  Dessert (100g serving)
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="left">
                  Calories
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="left">
                  Fat&nbsp;(g)
                </StyledHeaderCell>
                <StyledHeaderCell width="500px" align="center">
                  Results
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Protein&nbsp;(g)
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Protein&nbsp;(g)
                </StyledHeaderCell>
                <StyledHeaderCell width="100px" align="right">
                  Protein&nbsp;(g)
                </StyledHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <>
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        colSpan={7}
                      >
                        <Grid display="flex" alignItems="center"> <img style={{marginRight:"10px",width:"30px", height:"30px",borderRadius:"20px"}} src={row.logo}  />
                        {row.lottoTitle}</Grid>
                       
                      </StyledTableCell>
                    </StyledTableRow>
                    {row.items.map((item, index) => {
                      return (
                        <StyledTableRow key={item.name}>
                          <StyledTableCell
                            sx={{ display: "flex", alignItems: "center" }}
                            component="th"
                            scope="row"
                          >
                            <img
                              width="30px"
                              src={item.img}
                              style={{ marginRight: "10px" }}
                            />{" "}
                            <Typography>{item.name}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.calories}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.fat}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <div style={{display:'flex',alignItems:"center",justifyContent:"center"}}>{lottoTable(item.results)}</div>
                            
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.fat}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.fat}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.calories}
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
              className={`${lotto === lottos.winner ? "lotteryPageHit" : "lotteryPageMiss"}`}
            >
              {lotto}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
