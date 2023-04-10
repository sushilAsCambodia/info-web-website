import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Router from "next/router";
import DataLoading from '../DataLoading';
export default function JournalCard(props) {
  const {journals = [],lang_id} = props;
  const cardDetail = (journal_id) => {
    Router.push({pathname:'/journalCardDetails',query:{journal_id,lang_id}});
  }; 
  return (
    <Grid container item textAlign="left" sx={{marginTop:'5px'}}>
      <Grid item xs={12}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {journals && journals.length > 0 ? (<Grid item display="grid" sx={{ gridTemplateColumns: "auto auto auto", gridGap: "10px" }}>
            {
              journals.map((journal,index) => {
                return  <Grid key={index} item onClick={() => cardDetail(journal.id)}>
                  <img 
                    src={journal.images && journal.images.length ? journal.images[0]:null} 
                    alt={journal.title||''}
                    width="100%" 
                    style={{objectFit:'cover',height:"88.25px"}}
                  />
                  <Typography fontSize="10px">{journal.title}</Typography>
                </Grid>
              })
            }
          </Grid>) :<DataLoading/> }
        </Grid>
      </Grid>
    </Grid>

  )
}
