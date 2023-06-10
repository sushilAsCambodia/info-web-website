import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getJournalDetial } from '@/store/actions/journalActions'
import DataLoading from '@/components/DataLoading';
import ImageCarouselComponent from '@/components/ImageCarouselComponent';

export default function JournalCardDetails() {
  const { loadingJournalDetail, journalDetail = [], years = [],loading } = useSelector(state => state.journal);
  const [images, setImages] = useState([]);
  const router = useRouter();
  // const { query } = router;
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (query.album_id) {
  //     dispatch(getJournalDetial(
  //       {
  //         id: query.album_id,
  //         params: { lang_id: query.lang_id },
  //         callback: (res) => { }
  //       }
  //     ));
  //   }
  // }, [query])
  useEffect(() => {
    if (Array.isArray(journalDetail) && journalDetail.length > 0) {
      const images = []; 
      const item = journalDetail[0];
      for (let j = 0; j < item.album_slavs.length; j++) {
        for (let i = 0; i < item.album_slavs[j].album_slav_images.length; i++) {
          const itm = item.album_slavs[j].album_slav_images[i];
          images.push({
            original: itm.images,
            thumbnail: itm.images,
          })
        }
      }
      setImages(images);
    } 
  }, [journalDetail]);
  return (
    <Grid container item textAlign="left" p={0} sx={{ height: '100%', alignItems: images.length ? 'auto' : 'center' }}>
      <Grid item xs={12}>
        {loadingJournalDetail ? <DataLoading /> : <ImageCarouselComponent images={images} loading={loading}/>}
      </Grid>
    </Grid>
  )
}
