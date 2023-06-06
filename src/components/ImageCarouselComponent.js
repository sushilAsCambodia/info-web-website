import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import DataNotFound from './DataNotFound';
import { Grid } from '@mui/material'
import CardSlice from './desktop/CardSlide';
const ImageCarouselComponent = (props) => {
    const {images = [], isWeb = false,year} = props;
    return <>
        { images.length > 0 ? <Grid item className='carouselcard'>
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
            additionalClass={isWeb?"custom-original-wrapper image-gallery-bottom-left":"image-gallery-bottom-left"} 
            infinite={true} 
            slideWidth="400"
            slideHeight="400"
            originalHeight ="200px"
        />
        <style>
        {
            ` 
            .image-gallery-thumbnails-wrapper .image-gallery-thumbnail{
                width: auto !important;
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
               
                object-fit:cover;
                max-height:initial;
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
    </Grid> : <DataNotFound/> }
    </>
}
export default ImageCarouselComponent;