import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Router from "next/router";
import DataLoading from '../DataLoading';
import { useSelector } from 'react-redux';
import Empty from '../Empty';
export default function JournalCard(props) {
  const { lang_id } = props;
  const { journals = [], loading } = useSelector((state) => state.journal);
  const cardDetail = (album_id,title='') => {
    Router.push({ pathname: '/journalCardDetails', query: { album_id, lang_id,title: title} });
  };
  return (
    loading ? <DataLoading /> : <Grid container item spacing={1} sx={{paddingLeft:'10px',paddingRight:'10px'}}>
      {journals && journals.length > 0 ?
        journals.map((journal, index) => {
          return <Grid key={index} item xs={4} sm={4} md={4} lg={4} xl={4} onClick={() => cardDetail(journal.id,journal.album_name)}>
            <img
              src={journal.cover_img ? journal.cover_img : null}
              alt={journal.album_name || ''}
              width="100%"
              style={{ objectFit: 'cover', height: "88.25px", borderRadius: '4px' }}
            />
            <Typography fontSize="10px">{journal.album_name || 'N/A'}</Typography>
          </Grid>
        })
        : <Grid mx="auto"> <Empty /></Grid>}
    </Grid>
  )
}
