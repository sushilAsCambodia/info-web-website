import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Router from "next/router";
import DataLoading from '../DataLoading';
import { useSelector } from 'react-redux';
import Empty from '../Empty';
import { Image } from 'mui-image';
export default function JournalCard(props) {
  const { lang_id } = props;
  const { journals = [], loading } = useSelector((state) => state.journal);
  const cardDetail = (album_id,title='') => {
    Router.push({ pathname: '/journalCardDetails', query: { album_id, lang_id,title: title} });
  };
  return (
    loading ? <DataLoading /> : <Grid container item spacing={1} sx={{paddingLeft:'10px',  paddingTop:"11px", paddingRight:'12px'}}>
      {journals && journals.length > 0 ?
        journals.map((journal, index) => {
          return <Grid key={index} item xs={4} paddingLeft="12px !important" sm={4} md={4} lg={4} xl={4} className='zxzxzxz'  onClick={() => cardDetail(journal.id,journal.album_name)}>
            <img
            
              src={journal.cover_img ? journal.cover_img : null}
              alt={journal.album_name || ''}
              width="100%"
              objectFit="fill !important"

              style={{ height: "88.25px", borderRadius: '4px',objectFit:"fill !important" }}
            />
            <Typography fontSize="12px">{journal.album_name || 'N/A'}</Typography>
          </Grid>
        })
        : <Grid mx="auto"> <Typography component="div" sx={{padding:'5px'}}><Empty /></Typography> </Grid>}
    </Grid>
  )
}


// display: grid;
// grid-template-columns: auto auto auto;
// grid-column-gap: 4px;
// grid-row-gap: 4px;