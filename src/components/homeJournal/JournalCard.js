import React from 'react'
import { Grid, Typography } from '@mui/material'
import Router from "next/router";
export default function JournalCard() {
    const card1 = "/assets/NewsJourney/Journalcard1.png";
    const card2 = "/assets/NewsJourney/Journalcard2.png";
    const card3 = "/assets/NewsJourney/Journalcard3.png";
    const card4 = "/assets/NewsJourney/Journalcard4.png";
    const card5 = "/assets/NewsJourney/Journalcard5.png";
    const card6 = "/assets/NewsJourney/Journalcard6.png";
    const card7 = "/assets/NewsJourney/Journalcard7.png";
    const card8 = "/assets/NewsJourney/Journalcard8.png";
    const card9 = "/assets/NewsJourney/Journalcard9.png";
    const card10 = "/assets/NewsJourney/Journalcard10.png";

    const cardDetail = () => {
          Router.push("/JournalCardDetails");
      };

  return (
  
    <Grid container item textAlign="left">
        <Grid item xs={12}>
          
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid item display="grid"  sx={{gridTemplateColumns:"auto auto auto", gridGap:"10px"}} >
<Grid item onClick={cardDetail}>
<img src={card1} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>
<Grid item onClick={cardDetail}>
<img src={card2} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>
<Grid item>
<img src={card3} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>
<Grid item>
<img src={card4} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>
<Grid item>
<img src={card5} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>
<Grid item>
<img src={card6} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>
<Grid item>
<img src={card7} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>
<Grid item>
<img src={card8} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>
<Grid item>
<img src={card9} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>
<Grid item>
<img src={card10} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>
<Grid item>
<img src={card8} alt="一般" width="100%" height="auto" />
<Typography fontSize="10px">Jiuxiao 30 yards</Typography>
</Grid>

                </Grid>
                </Grid>
          
        </Grid>
       
    </Grid>

  )
}
