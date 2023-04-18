import {
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  styled,
  TableCell,TableRow, tableCellClasses,TableContainer,Paper,Table,TableHead,TableBody 
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
      backgroundColor: '#DDDDDD',
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.grey,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    background:"#F3F3F3",
    borderRight:"1px solid #DDDDDD ",
    borderTop:"1px solid #DDDDDD ",
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.grey,
    },
    // hide last border
    '&:first-child': {
      borderLeft: "1px solid #DDDDDD",
    },
  }));
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
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
            <StyledHeaderCell width="250px">Dessert (100g serving)</StyledHeaderCell>
            <StyledHeaderCell width="100px" align="left">Calories</StyledHeaderCell>
            <StyledHeaderCell width="100px" align="left">Fat&nbsp;(g)</StyledHeaderCell>
            <StyledHeaderCell width="500px" align="center">Carbs&nbsp;(g)</StyledHeaderCell>
            <StyledHeaderCell width="100px" align="right">Protein&nbsp;(g)</StyledHeaderCell>
            <StyledHeaderCell width="100px" align="right">Protein&nbsp;(g)</StyledHeaderCell>
            <StyledHeaderCell width="100px" align="right">Protein&nbsp;(g)</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell  component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Grid>
    </>
  );
}
