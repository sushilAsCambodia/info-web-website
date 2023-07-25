import React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import {
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { Image } from "mui-image";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  // borderRadius: 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    //   borderRadius: 0,
    backgroundColor: theme.palette.mode === "light" ? "red" : "#308fe8",
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Grid sx={{ position: "relative" }}>
      <BorderLinearProgress variant="determinate" value={props.team1} />
      <Grid
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "10px",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: "bold" }}>
          {`${Math.round(props.team1)}%`}
        </Typography>
      </Grid>
      <Grid
        sx={{
          top: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: "10px",
        }}
      >
        <Typography sx={{ color: "black", fontWeight: "bold" }}>
          {`${Math.round(props.team2)}%`}
        </Typography>
      </Grid>
    </Grid>
  );
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export default function MatchStats(props) {
  const {details}=props
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
console.log("details2222",details && details.stats)
  return (
    <Grid
      container
      alignContent="flex-start"
      height="100vh"
      overflow="auto"
      sx={{ width: "100vw" }}
    >
      <Grid item xs={12} container px={2} alignContent="flex-start">
        <Grid
          item
          xs={5}
          container
          className="match-stats-image-wrapper"
          alignItems="center"
        >
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYRoEAG50_OBj1grdDD2eLQOm_YDakvZK7DM_a35OjbuPBKkz4RCLYQQmW31rbLt7CPMM&usqp=CAU"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "fill",
              borderRadius: "50px",
            }}
            alt="encrypted"
          />
          <Typography color="black" mx={1}>
            4
          </Typography>
        </Grid>
        <Grid item xs={2} container alignItems="center" justifyContent="center">
          <Typography color="red" fontWeight="bold">
            vs
          </Typography>
        </Grid>
        <Grid
          item
          xs={5}
          container
          className="match-stats-image-wrapper"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography color="black" mx={1}>
            4
          </Typography>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYRoEAG50_OBj1grdDD2eLQOm_YDakvZK7DM_a35OjbuPBKkz4RCLYQQmW31rbLt7CPMM&usqp=CAU"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "fill",
              borderRadius: "50px",
            }}
            alt="encrypted"
          />
        </Grid>
      </Grid>
      <Grid item xs={12} p={2}>
        <LinearProgressWithLabel team1={40} team2={60} />
      </Grid>
      <Grid item xs={12}>
        <Grid px={2}>
          <TableContainer sx={{border:"2px solid #ddd"}}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Goals </TableCell>
                  <TableCell align="right">Assists</TableCell>
                  <TableCell align="right">Fat</TableCell>
                  <TableCell>YelCards </TableCell>
                  <TableCell align="right">Red Cards</TableCell>
                  <TableCell align="right">Shots</TableCell>
                  <TableCell>Shots OT </TableCell>
                  <TableCell align="right">Shots Off Tag</TableCell>
                  <TableCell align="right">Shots Blocked</TableCell>
                  <TableCell align="right">Off Sides</TableCell>
                  <TableCell align="right">Pass Success</TableCell>
                  <TableCell align="right">Possession</TableCell>
                  <TableCell align="right">Big Chance Created</TableCell>
                  <TableCell align="right">Corners</TableCell>
                  <TableCell align="right">Total Saves</TableCell>
                  <TableCell align="right">Dangerous Attacks</TableCell>

                  
                </TableRow>
              </TableHead>
              <TableBody>
                {details && details.stats  && details && details.stats.length>0 ? details && details.stats.map((row,index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell >{row.goals}</TableCell>
                    <TableCell align="right">{row.assists}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell >{row.yelCards}</TableCell>
                    <TableCell align="right">{row.redCards}</TableCell>
                    <TableCell align="right">{row.shots}</TableCell>
                    <TableCell >{row.shotsOT}</TableCell>
                    <TableCell align="right">{row.shotsOffTag}</TableCell>
                    <TableCell align="right">{row.shotsBlocked}</TableCell>
                    <TableCell align="right">{row.offsides}</TableCell>
                    <TableCell align="right">{`${row.passSucc}%`}</TableCell>
                    <TableCell align="right">{`${row.possession}%`}</TableCell>
                    <TableCell align="right">{row.bigChanceCreated}</TableCell>
                    <TableCell align="right">{row.corners}</TableCell>
                    <TableCell align="right">{row.totalSaves}</TableCell>
                    <TableCell align="right">{row.dangerousAttacks}</TableCell>

                   
                  </TableRow>
                )):<>No Data</>}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}
