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
import useMediaQuery from "@mui/material/useMediaQuery";

import TablePagination from '@mui/material/TablePagination';

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const BorderLinearProgressLeft = styled(LinearProgress)(({ theme,colorCode,tranformValue }) => ({
  height: 20,
  // borderRadius: 0,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    //   borderRadius: 0,
    backgroundColor: theme.palette.mode === "light" ? colorCode : "#308fe8",
    transform: `translateX(${tranformValue}%) !important`
  },
}));

const BorderLinearProgressRight = styled(LinearProgress)(({ theme,colorCode }) => ({
  height: 20,
  // borderRadius: 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    //   borderRadius: 0,
    backgroundColor: theme.palette.mode === "light" ? colorCode : "#308fe8",
  
  },
}));

function LinearProgressWithLabelLeft(props) {
  return (
    <Grid sx={{ position: "relative" }}>
      <BorderLinearProgressLeft variant="determinate" tranformValue={props.team2} colorCode={props.homeTeamColor} value={props.team1} style={{borderTopLeftRadius:'10px', borderBottomLeftRadius:'10px', height:'15px'}} />
      <Grid
      CL
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
          {/* {`${Math.round(props.team1)}%`} */}
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
          {/* {`${Math.round(props.team2)}%`} */}
        </Typography>
      </Grid>
    </Grid>
  );
}

function LinearProgressWithLabelRight(props) {
  return (
    <Grid sx={{ position: "relative" }}>
      <BorderLinearProgressRight variant="determinate" value={props.team1} colorCode={props.awayTeamColor} style={{borderTopRightRadius:'10px', borderBottomRightRadius:'10px', height:'15px'}} />
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
          {/* {`${Math.round(props.team1)}%`} */}
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
          {/* {`${Math.round(props.team2)}%`} */}
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
  const matches = useMediaQuery("(max-width:768px)");

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





  
  const manageHomeTeam=(eventType,homeTeam)=>{
    switch(eventType) {
      case "Goals":
        return  homeTeam && homeTeam.goals
        case "Assists":
        return  homeTeam && homeTeam.assists       
        case "YellowCards":
        return  homeTeam && homeTeam.yelCards 
        case "RedCards":
          return  homeTeam && homeTeam.redCards     
        case "Shots":
        return  homeTeam && homeTeam.shots
        case "ShotsOnTarget":
        return  homeTeam && homeTeam.shotsOT
        case "ShotsOffTarget":
        return  homeTeam && homeTeam.shotsOffTag
        case "ShotsBlocked":
        return  homeTeam && homeTeam.shotsBlocked
        case "OffSides":
        return  homeTeam && homeTeam.offsides
        case "PassSuccess":
        return  homeTeam && homeTeam.passSucc
        case "Possession":
        return  homeTeam && homeTeam.possession
        case "BigChanceCreated":
        return  homeTeam && homeTeam.bigChanceCreated
        case "Corners":
        return  homeTeam && homeTeam.corners
        case "TotalSaves":
        return  homeTeam && homeTeam.totalSaves
        case "DangerousAttacks":
        return  homeTeam && homeTeam.dangerousAttacks     
     
    }
  }

  const manageTeamAway=(eventType,awayTeam)=>{
    switch(eventType) {
      case "Goals":
        return  awayTeam && awayTeam.goals
        case "Assists":
        return  awayTeam && awayTeam.assists       
        case "YellowCards":
        return  awayTeam && awayTeam.yelCards
        case "RedCards":
          return  awayTeam && awayTeam.redCards  
        case "Shots":
        return  awayTeam && awayTeam.shots
        case "ShotsOnTarget":
        return  awayTeam && awayTeam.shotsOT
        case "ShotsOffTarget":
        return  awayTeam && awayTeam.shotsOffTag
        case "ShotsBlocked":
        return  awayTeam && awayTeam.shotsBlocked
        case "OffSides":
        return  awayTeam && awayTeam.offsides
        case "PassSuccess":
        return  awayTeam && awayTeam.passSucc
        case "Possession":
        return  awayTeam && awayTeam.possession
        case "BigChanceCreated":
        return  awayTeam && awayTeam.bigChanceCreated
        case "Corners":
        return  awayTeam && awayTeam.corners
        case "TotalSaves":
        return  awayTeam && awayTeam.totalSaves
        case "DangerousAttacks":
        return  awayTeam && awayTeam.dangerousAttacks     
     
    }
  }


//const awayTeam=details && details.stats && details.stats.length>0

const awayTeam=details && details.stats && details.stats.length>0 && details.stats.find(item => item.homeAway === "away");
const homeTeam=details && details.stats && details.stats.length>0 && details.stats.find(item => item.homeAway === "home");
const barArray=["Goals","Assists","YellowCards","RedCards","Shots","ShotsOnTarget","ShotsOffTarget","ShotsBlocked","OffSides","PassSuccess","Possession","BigChanceCreated","Corners","TotalSaves","DangerousAttacks"]
  return !matches ? (
    <>
      {/* web screen */}
    <Grid
    container
    alignContent="flex-start"
    height="100vh"
    overflow="auto"
    sx={{ width: "100%" }}
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
          src={details && details.match && details.match.home_team && details.match.home_team.image}
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
          src={details && details.match && details.match.away_team && details.match.away_team.image}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "fill",
            
          }}
          alt="encrypted"
        />
      </Grid>
    </Grid>
    <Grid item xs={12} p={2} >
      {barArray && barArray.length>0 && barArray.map((items,index)=>
     { 
      const totalProgressBar=parseInt(manageHomeTeam(items,homeTeam))+parseInt(manageTeamAway(items,awayTeam))

     const homeTeamPercentage=parseInt(manageHomeTeam(items,homeTeam))*100/parseInt(totalProgressBar)
     const awayTeamPercentage=parseInt(manageHomeTeam(items,awayTeam))*100/parseInt(totalProgressBar)

      const homeTeamNum=100-parseInt(homeTeamPercentage)
      const awayTeamNum=100-parseInt(awayTeamPercentage)
      const homeTeamColor= homeTeamNum<awayTeamNum?"#FF6F31":"#595959"
      const awayTeamColor= homeTeamNum>awayTeamNum?"#FF6F31":"#595959"       
    
     return(<div key={index}>
    <Grid pb={.5} pt={3} sx={{display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:'"Roboto","Helvetica","Arial",sans-serif'}}>
    <Grid>{manageHomeTeam(items,homeTeam)}{items=="PassSuccess" || items=="Possession"?"%":""}</Grid>
    <Grid>{langKey && langKey[items]}</Grid>
    <Grid >{manageTeamAway(items,awayTeam)}{items=="PassSuccess" || items=="Possession"?"%":""} </Grid>
      </Grid>
    <Grid item xs={12} sx={{display:'flex'}}>
    <Grid item xs={6} pr={.5}>
      <LinearProgressWithLabelLeft homeTeamColor={manageHomeTeam(items,homeTeam)==0?"#eeeeee":manageHomeTeam(items,homeTeam)==manageHomeTeam(items,awayTeam)?"#595959":homeTeamColor}  team1={manageHomeTeam(items,homeTeam)==0?0:homeTeamPercentage} team2={manageHomeTeam(items,homeTeam)==0?100:homeTeamNum} />
      </Grid>
      <Grid item xs={6} pl={.5}>
      <LinearProgressWithLabelRight awayTeamColor={manageHomeTeam(items,awayTeam)==0?"#eeeeee":manageHomeTeam(items,homeTeam)==manageHomeTeam(items,awayTeam)?"#595959":awayTeamColor} team1={manageTeamAway(items,awayTeam)==0?0:awayTeamPercentage} team2={manageTeamAway(items,awayTeam)==0?100:awayTeamNum} />
      </Grid>
    </Grid>
    </div>)
})}
      
    

    </Grid>

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

    {/* <Grid item xs={12}>
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

      </Grid> */}

  </Grid>
</>
) : (
  <>
    {/* mobile screen */}
  <Grid
  container
  alignContent="flex-start"
  // height="100vh"
  overflow="auto"
  paddingBottom={'30px'}

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
        src={details && details.match && details.match.home_team && details.match.home_team.image}
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
        src={details && details.match && details.match.away_team && details.match.away_team.image}
        style={{
          width: "50px",
          height: "50px",
          objectFit: "fill",
          
        }}
        alt="encrypted"
      />
    </Grid>
  </Grid>
  <Grid item xs={12} p={2} >
    {barArray && barArray.length>0 && barArray.map((items,index)=>
   { 
    const totalProgressBar=parseInt(manageHomeTeam(items,homeTeam))+parseInt(manageTeamAway(items,awayTeam))

   const homeTeamPercentage=parseInt(manageHomeTeam(items,homeTeam))*100/parseInt(totalProgressBar)
   const awayTeamPercentage=parseInt(manageHomeTeam(items,awayTeam))*100/parseInt(totalProgressBar)

    const homeTeamNum=100-parseInt(homeTeamPercentage)
    const awayTeamNum=100-parseInt(awayTeamPercentage)
    const homeTeamColor= homeTeamNum<awayTeamNum?"#FF6F31":"#595959"
    const awayTeamColor= homeTeamNum>awayTeamNum?"#FF6F31":"#595959"       
  
   return(<div key={index}>
  <Grid pb={.5} pt={3} sx={{display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:'"Roboto","Helvetica","Arial",sans-serif'}}>
  <Grid>{manageHomeTeam(items,homeTeam)}{items=="PassSuccess" || items=="Possession"?"%":""}</Grid>
  <Grid>{langKey && langKey[items]}</Grid>
  <Grid sx={{color:'#c7c0c0'}}>{manageTeamAway(items,awayTeam)}{items=="PassSuccess" || items=="Possession"?"%":""} </Grid>
    </Grid>
  <Grid item xs={12} sx={{display:'flex'}}>
  <Grid item xs={6} pr={.5}>
    <LinearProgressWithLabelLeft homeTeamColor={manageHomeTeam(items,homeTeam)==0?"#eeeeee":manageHomeTeam(items,homeTeam)==manageHomeTeam(items,awayTeam)?"#595959":homeTeamColor}  team1={manageHomeTeam(items,homeTeam)==0?0:homeTeamPercentage} team2={manageHomeTeam(items,homeTeam)==0?100:homeTeamNum} />
    </Grid>
    <Grid item xs={6} pl={.5}>
    <LinearProgressWithLabelRight awayTeamColor={manageHomeTeam(items,awayTeam)==0?"#eeeeee":manageHomeTeam(items,homeTeam)==manageHomeTeam(items,awayTeam)?"#595959":awayTeamColor} team1={manageTeamAway(items,awayTeam)==0?0:awayTeamPercentage} team2={manageTeamAway(items,awayTeam)==0?100:awayTeamNum} />
    </Grid>
  </Grid>
  </div>)
})}
    
  

  </Grid>

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

  {/* <Grid item xs={12}>
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

    </Grid> */}

</Grid>
</>
  );
}
