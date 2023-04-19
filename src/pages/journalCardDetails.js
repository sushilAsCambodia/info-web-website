import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {getJournalDetial} from '@/store/actions/journalActions'
import DataNotFound from '@/components/DataNotFound'; 
import DataLoading from '@/components/DataLoading';

export default function JournalCardDetails() { 
  const {loading, journalDetail = {}} = useSelector(state => state.journal);
  const [images,setImages] = useState([]);
  const router = useRouter();
  const {query} = router;
  const dispatch = useDispatch();
  useEffect(() => {
    if(query.album_id) {
      dispatch(getJournalDetial(
        {
          id:query.album_id,
          params: {lang_id: query.lang_id},
          callback:(res) => {}
        }
      ));
    }
  },[query])
  useEffect(() => {
    if(Object.keys(journalDetail).length) {
      if(Array.isArray(journalDetail) && journalDetail.length > 0) {
        const item = journalDetail[0];
        const images = [];
        // cover of detail
        // if(item.hasOwnProperty('cover_img')) {
        //   images.push({
        //     original:item.cover_img,
        //     thumbnail:item.cover_img,
        //   });
        // }
        for (let i = 0; i < item.album_slavs.length; i++) {
          images.push({
            original:item.album_slavs[i].images,
            thumbnail:item.album_slavs[i].images,
          })
        }
        setImages(images);
      }
    }
  },[journalDetail]);
  return  (
    <Grid container item textAlign="left" p={1} sx={{height:'100%',alignItems: journalDetail && Object.keys(journalDetail).length ?'auto':'center'}}>
      <Grid item xs={12}>
        {loading ? <DataLoading/> : journalDetail && Object.keys(journalDetail).length > 0 ? <Grid item className='carouselcard'>
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={true}
            showBullets={false}
            showThumbnails={true}
            showIndex={false}
            autoPlay={false}
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
            slideWidth="400"
            slideHeight="400"
            originalHeight ="200px"
          />
          <style>
            {
              ` 
                @media (max-width: 320px) {
                  .image-gallery-thumbnail {
                    border: 3px solid transparent;
                    width:59px;
                  }
                }
                .image-gallery-slide{
                  height:100%;
                }
                .image-gallery-thumbnail-image {
                  height:55px;
                  width:55px;
                  object-fit:contain;
                  border-radius:3px;
                  overflow:hidden
                }
                .image-gallery-slides{
                  border-radius:6px;
                  overflow:hidden;
                  height: 398px;
                }
                .image-gallery-thumbnails-wrapper{
                  margin-top:11px;
                }
                .image-gallery-content .image-gallery-slide .image-gallery-image {
                  height:100%;
                  object-fit:cover;
                }
              `
            }
          </style>
        </Grid> : <DataNotFound/> }
        
      </Grid>
    </Grid>
  )
}
