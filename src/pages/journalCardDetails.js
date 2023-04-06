import React from 'react'
import { Grid, Typography } from '@mui/material'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
const images = [
  {
    original: '/assets/NewsJourney/bigcarddetail.png',
    thumbnail: '/assets/NewsJourney/Journalcard5.png',
  },
  {
    original: '/assets/NewsJourney/bigcarddetail.png',
    thumbnail: '/assets/NewsJourney/Journalcard5.png',
  },
  {
    original: '/assets/NewsJourney/bigcarddetail.png',
    thumbnail: '/assets/NewsJourney/Journalcard5.png',
  },
  {
    original: '/assets/NewsJourney/bigcarddetail.png',
    thumbnail: '/assets/NewsJourney/Journalcard5.png',
  },
];


export default function JournalCardDetails() {


  return (
    <Grid container item textAlign="left" p={1} >
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Grid item className='carouselcard'>
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
        </Grid>
        
      </Grid>
    </Grid>

  )
}
