import {
    Typography,
    Grid,
    ListItemText,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  
  import { Icon } from "@iconify/react";
  import { useRouter } from "next/router";
 
  
  export default function matchTitleBanner(props) {
    const router = useRouter();
    const [select, setSelect] = useState(0);
    const [age, setAge] = useState("");
  
  
    const {matchData} = props
   
  
    return (
      <>
      <Grid
          container
          textAlign="center"
          justifyContent="center"
          alignContent="flex-start"
          className="LiveScoreBg"
          pt={2}
          sx={{
            color: "white",
            borderRadius: "5px",
            height: "400px",
          }}
          style={{ "--liveBg": `url(${"./assets/LiveScore/basketBall.png"})` }}
          position="relative"
          mb={10}
        >
          <Grid color="white" container justifyContent="center">
            <Grid>
              <Typography>Russian Basketball Super League</Typography>
              <Typography variant="body2">15 Mar 2023, 17:30</Typography>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={3}>
                <img
                  width={60}
                  src={
                    "https://i.pinimg.com/originals/9a/70/de/9a70de3e4c7e4d046209036746b4a943.png"
                  }
                />
                <Typography fontWeight="bold">Dynamo Vladivostok</Typography>
                <Typography>GUEST</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                container
                alignItems="center"
                justifyContent="center"
              >
                <Typography mx={1} variant="h4">
                  0
                </Typography>
                <Grid item xs={8}>
                  <Divider
                    sx={{
                      "&::before, &::after": {
                        borderColor: "white",
                        borderTop: "2px solid white",
                      },
                    }}
                  >
                    <Grid
                      width={50}
                      height={50}
                      container
                      alignItems="center"
                      justifyContent="center"
                      sx={{ background: "#F24E1E", borderRadius: "50px" }}
                    >
                      <Typography>VS</Typography>
                    </Grid>
                  </Divider>
                </Grid>
                <Typography mx={1} variant="h4">
                  0
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <img
                  width={60}
                  src={
                    "https://i.pinimg.com/originals/9a/70/de/9a70de3e4c7e4d046209036746b4a943.png"
                  }
                />
                <Typography fontWeight="bold">Dynamo Vladivostok</Typography>
                <Typography>GUEST</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Venue</Typography>
                <Typography variant="body2">
                  Universitet Yugra Surgut
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container px={5} position="absolute" top="250px">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Against</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>Audience</TableCell>
                    <TableCell>HandiCap</TableCell>
                    <TableCell>Win or Lose</TableCell>
                    <TableCell>Total Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {matchData.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.team}
                      </TableCell>
                      <TableCell>{row.r1}</TableCell>
                      <TableCell>{row.r2}</TableCell>
                      <TableCell>{row.r3}</TableCell>
                      <TableCell>{row.r4}</TableCell>
                      <TableCell>{row.audience}</TableCell>
                      <TableCell>{row.handicap}</TableCell>
                      <TableCell>{row.wl}</TableCell>
                      <TableCell>{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </>
    );
  }
  