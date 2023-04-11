import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {getJournal} from '@/store/actions/journalActions'
import DataNotFound from '@/components/DataNotFound'; 
import DataLoading from '@/components/DataLoading';

export default function JournalCardDetails() { 
  const [mounted,setMounted] = useState(false);
  const [jounal,setJournal] = useState({});
  const [images,setImages] = useState([]);
  const router = useRouter();
  const {query} = router;
  const dispatch = useDispatch();
  useEffect(() => {
    setMounted(true);
    dispatch(getJournal(
      {
          params: {lang_id: query.lang_id,id:query.journal_id,fake:true},
          callback:(res) => {
            const {status_code,data = {}} = res;
            if([200,201,202,203].includes(status_code)) {
              if(data && Object.keys(data).length) {
                const images =  [];
                for (let i = 0; i < data.images.length; i++) {
                  images.push({
                    original:data.images[i],
                    thumbnail:data.images[i],
                  })
                }
                setImages(images)
                setJournal(data);
              }
            }
          }
      }
    ));
  },[query])
  return mounted && (
    <Grid container item textAlign="left" p={1} sx={{height:'100%',alignItems: jounal && Object.keys(jounal).length ?'auto':'center'}}>
      <Grid item xs={12}>
        <Grid item xs={12}>
          {jounal && Object.keys(jounal).length ? (
            jounal.length<=0 ? <DataNotFound/> : <Grid item className='carouselcard'>
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              showNav={true}
              showBullets={false}
              showThumbnails={true}
              showIndex={false}
              autoPlay={true}
              slideDuration={1000}
              slideInterval={5000}
              slideOnThumbnailHover={true}
              disableThumbnailScroll={false}
              disableArrowKeys={false}
              disableSwipe={false}
              useBrowserFullscreen={true}
              useTranslate3D={false}
              lazyLoad={true}
              thumbnailPosition="bottom"
              className="image-gallery-bottom-left"
              infinite={true}
              thumbnailHeight={"50"}
              thumbnailWidth={"50"}
              slideWidth="400"
              slideHeight="400"
              originalHeight ="200px"
            />
          </Grid>
          ) :<DataLoading/>}
        </Grid>
      </Grid>
    </Grid>
  )
}
