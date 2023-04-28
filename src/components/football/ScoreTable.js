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
import { useState } from "react";

import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

export default function ScoreTable() {
  const router = useRouter();

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
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
      "Frozen ice cream",
      111,
      6.0,
      { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
      2
    ),
    createData(
      "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_7_2.png",
      "cake",
      111,
      6.0,
      { numbers: [12, 32, 4, 5, 12, 34], winner: 32 },
      3
    ),
  ];

  const getRandomColor = () => {
    var letters = "BCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };
  return (
    <>
      {rows.map((item, index) => {
        let bgColor = getRandomColor();
        return (
          <>
            <TableContainer component={Paper} style={{ marginBottom: "15px" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledHeaderCell
                      width="200px"
                      sx={{ background: `${bgColor}` }}
                    >
                      <Grid container alignItems="center">
                        {" "}
                        <img
                          width="30px"
                          src={item.img}
                          style={{ marginRight: "10px" }}
                        />{" "}
                        Taiwan Basket Ball
                      </Grid>
                    </StyledHeaderCell>
                    <StyledHeaderCell
                      width="200px"
                      align="left"
                      sx={{ background: `${bgColor}` }}
                    >
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
                  <StyledTableRow key={item.name}>
                    <StyledTableCell component="th" scope="row">
                      <Grid sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>{item.name}</Typography>
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography>{item.calories}</Typography>
                      <Typography>{item.calories}</Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography>{item.fat}</Typography>
                      <Typography>{item.fat}</Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography>{item.fat}</Typography>
                      <Typography>{item.fat}</Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography>{item.fat}</Typography>
                      <Typography>{item.id}</Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography>{item.fat}</Typography>
                      <Typography>{item.id}</Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography>{item.fat}</Typography>
                      <Typography>{item.id}</Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography>{item.fat}</Typography>
                      <Typography>{item.id}</Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography>{item.fat}</Typography>
                      <Typography>{item.id}</Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography>Half: {item.fat}</Typography>
                      <Typography>Half: {item.fat}</Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        );
      })}
    </>
  );
}
