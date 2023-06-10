import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import DataNotFound from './DataNotFound';
import DataLoading from './DataLoading';
import { Grid } from '@mui/material'
import CardSlice from './desktop/CardSlide';
import { useState } from 'react';
const ImageCarouselComponent = (props) => {
    const {images = [], isWeb = false,year,loading} = props;
    return <>
        { !loading ? 
      <> {images.length > 0 ? 
      <Grid item className='carouselcard'>
        <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
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
            thumbnailClass={isWeb?"custom-thumnail-wrapper":""}
            renderThumbInner = {isWeb ? (e) => {
                return <CardSlice image={e} year={year}/>
            } : null}
            thumbnailPosition="bottom"
            additionalClass={isWeb?"custom-original-wrapper image-gallery-bottom-left":"image-gallery-bottom-left custom-original-mobile-wrapper"} 
            infinite={true} 
            slideWidth="400"
            slideHeight="400"
            originalHeight ="200px"
        />
        <style>
        {
            ` 
            .custom-original-mobile-wrapper  {
                padding: 10px 15px 0 15px 
            }
            .custom-original-mobile-wrapper .image-gallery-thumbnails-wrapper .image-gallery-thumbnail{
                height:55px;
                width:19% !important;
            }
            
            .custom-original-mobile-wrapper .image-gallery-thumbnail.active {
                border:3px solid #fb261beb !important;
                border-radius: 3px;
            }
            .custom-original-mobile-wrapper .image-gallery-thumbnail.active img {
                border-radius: 0px;
            }
            @media (max-width: 320px) {
                .image-gallery-thumbnail {
                    border: 3px solid transparent;
                    width:59px;
                }
            }
            .image-gallery-slide{
                height:100%;
            }
            .image-gallery-thumbnail+.image-gallery-thumbnail{
                margin-left: 4px;
            }
            .image-gallery-thumbnail .image-gallery-thumbnail-inner {
                height:100% !important;
                width:100% !important;
            }
            .image-gallery-thumbnail-inner > img {
                height:100% !important;
                width:100% !important;
                object-fit:cover;
                border-radius:3px;
                overflow:hidden
            }
            .image-gallery-slides{
                border-radius:6px;
                overflow:hidden;
                height: 465px;
            }
            .image-gallery-thumbnails-wrapper{
                margin-top:11px;
            }
            .image-gallery-content .image-gallery-slide .image-gallery-image {
                object-fit:cover;
                height:100%;
            }
            .image-gallery-thumbnail{
                border:none;
            }
            .image-gallery-thumbnail.active, .image-gallery-thumbnail:focus {
                border:none
            }
            .image-gallery-thumbnail:hover{
                border:none !important;
            }
            .custom-original-wrapper .image-gallery-slide-wrapper .image-gallery-slides  {
                min-height: 550px
            }
            `
        }
        </style>
    </Grid>: <DataNotFound/>}</> : <DataLoading />  }
    </>
}
export default ImageCarouselComponent;