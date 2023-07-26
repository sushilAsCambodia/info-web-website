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
  tableCellClasses,
  Paper,

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
  let score=details && details.match && details.match.finalScore
  const myScore = score  && score.split(":");

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
    width:100
  }));
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
      padding: "2px",
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  
  }));

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
            src={details && details.match && details.match.home_team && details.match.home_team.country_image_big}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "fill",
              borderRadius: "50px",
            }}
            alt="encrypted"
          />
          <Typography color="black" mx={1}>
          {myScore && myScore[0]}
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
          {myScore && myScore[1]}
          </Typography>
          <Image
            src={details && details.match && details.match.away_team && details.match.away_team.country_image_big}
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
      {/* <Grid item xs={12} p={2}>
        <LinearProgressWithLabel team1={40} team2={60} />
      </Grid> */}
      <Grid item xs={12}>


  


        
          <TableContainer sx={{border:"2px solid #ddd"}} >
          <Table id="tablehover"  aria-label="simple table">
              <TableHead size="small">
                <TableRow>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > Goals </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > Assists </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" >  Fat </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" >  YelCards </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > Red Cards </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" >  Shots </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" >  Shots OT </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" >  Shots Off Tag </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > Shots Blocked </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" >  Off Sides </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > Pass Success </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > Possession </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > Big Chance Created </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > Corners </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > Total Saves </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > Dangerous Attacks </div>
                  </StyledHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {details && details.stats  && details && details.stats.length>0 ? details && details.stats.map((row,index) => (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center">{row.goals}</StyledTableCell>
                    <StyledTableCell align="center">{row.assists}</StyledTableCell>
                    <StyledTableCell align="center">{row.fat}</StyledTableCell>
                    <StyledTableCell align="center">{row.yelCards}</StyledTableCell>
                    <StyledTableCell align="center">{row.redCards}</StyledTableCell>
                    <StyledTableCell align="center">{row.shots}</StyledTableCell>
                    <StyledTableCell align="center">{row.shotsOT}</StyledTableCell>
                    <StyledTableCell align="center">{row.shotsOffTag}</StyledTableCell>
                    <StyledTableCell align="center">{row.shotsBlocked}</StyledTableCell>
                    <StyledTableCell align="center">{row.offsides}</StyledTableCell>
                    <StyledTableCell align="center">{`${row.passSucc}%`}</StyledTableCell>
                    <StyledTableCell align="center">{`${row.possession}%`}</StyledTableCell>
                    <StyledTableCell align="center">{row.bigChanceCreated}</StyledTableCell>
                    <StyledTableCell align="center">{row.corners}</StyledTableCell>
                    <StyledTableCell align="center">{row.totalSaves}</StyledTableCell>
                    <StyledTableCell align="center">{row.dangerousAttacks}</StyledTableCell>

                   
                  </StyledTableRow>
                )):<>No Data</>}
              </TableBody>
            </Table>
          </TableContainer>
       
      </Grid>
    </Grid>
  );
}
