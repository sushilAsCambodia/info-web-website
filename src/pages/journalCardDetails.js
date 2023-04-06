import React from 'react'
import { Grid, Typography } from '@mui/material'
export default function JournalCardDetails() {
  const bigcard = "/assets/NewsJourney/bigcarddetail.png";
  const card1 = "/assets/NewsJourney/Journalcard1.png";
  const card2 = "/assets/NewsJourney/Journalcard2.png";
  const card3 = "/assets/NewsJourney/Journalcard3.png";
  const card4 = "/assets/NewsJourney/Journalcard4.png";
  const card5 = "/assets/NewsJourney/Journalcard5.png";




  return (

    <Grid container item textAlign="left" p={1}>
      <Grid item xs={12}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid item >
            <Grid item>
              <img src={bigcard} alt="一般" width="100%" height="auto" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid item display="grid" sx={{ gridTemplateColumns: "auto auto auto auto auto", gridGap: "10px" }} >
            <Grid item>
              <img src={card1} alt="一般" width="100%" height="auto" />
          
            </Grid>
            <Grid item>
              <img src={card2} alt="一般" width="100%" height="auto" />
       
            </Grid>
            <Grid item>
              <img src={card3} alt="一般" width="100%" height="auto" />
             
            </Grid>
            <Grid item>
              <img src={card4} alt="一般" width="100%" height="auto" />
            
            </Grid>
            <Grid item>
              <img src={card5} alt="一般" width="100%" height="auto" />
           
            </Grid>
            

          </Grid>
        </Grid>

      </Grid>

    </Grid>

  )
}
