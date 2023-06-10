import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Router from "next/router";
import DataLoading from '../DataLoading';
import { useSelector,useDispatch } from 'react-redux';
import utils from '@/common/utils';
import Empty from '../Empty';
import { getJournal } from '@/store/actions/journalActions';
import { Image } from 'mui-image';
export default function JournalCard(props) {
  const { lang_id } = props;
  const { journals = [], loading } = useSelector((state) => state.journal);
  const cardDetail = (album_id,title='') => {
    Router.push({ pathname: '/journalCardDetails', query: { album_id, lang_id,title: title} });
  };
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(
        getJournal({
          params: { lang_id: lang_id, take: 60 },
          callback: (res) => {},
        })
      );
    
  }, [dispatch,lang_id]);
  return (
    loading ? <DataLoading /> : 
    <Grid container item spacing={1} sx={{padding:'5px 5px 0px 5px'}}>
      {journals && journals.length > 0 ?
        journals.map((journal, index) => {
          return <>
          <Grid key={index} item xs={4} paddingLeft="12px !important" paddingTop="14px !important" sm={4} md={4} lg={4} xl={4} className='zxzxzxz'  onClick={() => cardDetail(journal.id,journal.album_name)}>
            <img
            
              src={journal.cover_img ? journal.cover_img : null}
              alt={journal.album_name || ''}
             
              objectFit="fill !important"

              style={{height: "14vh", width:"100%", borderRadius: '4px',objectFit:"fill !important" }}
            />
            <Typography sx={{color:'black !important'}} className='singleLinesEllips' fontSize="12px"> {utils.subString(journal.album_name || 'N/A',18)}</Typography>
          </Grid></>
        })
        : <Grid mx="auto"> <Typography component="div" sx={{padding:'5px'}}><Empty /></Typography> </Grid>}
    </Grid>
  )
}


// display: grid;
// grid-template-columns: auto auto auto;
// grid-column-gap: 4px;
// grid-row-gap: 4px;