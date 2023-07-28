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
import { useDispatch, useSelector } from "react-redux";
import { Image } from "mui-image";

import TablePagination from '@mui/material/TablePagination';

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
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
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



  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  
  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];
  





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
              
            }}
            alt="encrypted"
          />
        </Grid>
      </Grid>
      {/* <Grid item xs={12} p={2}>
        <LinearProgressWithLabel team1={40} team2={60} />
      </Grid> */}
      {/* <Grid item xs={12}>
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
      </Grid> */}

      <Grid item xs={12}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <TableRow>
                  <StyledHeaderCell align="center">
                  <div style={{width:"50px"}} > {langKey && langKey.Goals} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div style={{width:"50px"}} > {langKey && langKey.Assists} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div style={{width:"50px"}} >  {langKey && langKey.Fat} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div style={{width:"70px"}} >  {langKey && langKey.YellowCards} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div style={{width:"70px"}} > {langKey && langKey.RedCards} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div style={{width:"70px"}} >  {langKey && langKey.Shots} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div style={{width:"100px"}} >  {langKey && langKey.ShotsOnTarget} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" >  {langKey && langKey.ShotsOffTarget} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" >  {langKey && langKey.ShotsBlocked} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div style={{width:"60px"}} >  {langKey && langKey.OffSides} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > {langKey && langKey.PassSuccess} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > {langKey && langKey.Possession} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div className="tablecell-width" > {langKey && langKey.BigChanceCreated} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div style={{width:"70px"}} > {langKey && langKey.Corners} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div style={{width:"70px"}} > {langKey && langKey.TotalSaves} </div>
                  </StyledHeaderCell>
                  <StyledHeaderCell align="center">
                  <div style={{width:"120px"}} >  {langKey && langKey.DangerousAttacks} </div>
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
