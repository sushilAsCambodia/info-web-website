import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-multi-carousel";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Grid, Tabs, Tab, Link } from "@mui/material";
import { Image } from "mui-image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Route } from "@mui/icons-material";
import router from "next/router";
import ReactPlayer from "react-player";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

// const banners = [
//   {
//     id: 435,
//     title: "Lot5 Web",
//     description: null,
//     ads_link: null,
//     app_display: null,
//     icon: "http://info-web-ads-services-infoweb.kk-exchange.com/media/public/advertisement/Nk2FdqBQ7USEfE9QA8uWRcZw6UolUEcWcFH5VW2B.mp4",
//     last_updated_by: "Admin",
//     platform: "Web",
//     position: "carousel_image",
//     sorting: 4,
//     language_id: "1",
//     valid_from: "2023-06-20 16:07:20",
//     valid_to: "2024-06-20 16:07:20",
//     status: 1,
//     created_at: "2023-06-20T09:09:39.000000Z",
//     updated_at: "2023-06-20T09:09:39.000000Z",
//   },
//   {
//     id: 435,
//     title: "Lot5 Web",
//     description: null,
//     ads_link: null,
//     app_display: null,
//     icon: "http://info-web-ads-services-infoweb.kk-exchange.com/media/public/advertisement/jXcokNhskXHUZHhkEkE0A48l7zWMQABVlVw3yuhy.jpg",
//     last_updated_by: "Admin",
//     platform: "Web",
//     position: "top_carousel",
//     sorting: 4,
//     language_id: "1",
//     valid_from: "2023-06-20 16:07:20",
//     valid_to: "2024-06-20 16:07:20",
//     status: 1,
//     created_at: "2023-06-20T09:09:39.000000Z",
//     updated_at: "2023-06-20T09:09:39.000000Z",
//   },
//   {
//     id: 435,
//     title: "Lot5 Web",
//     description: null,
//     ads_link: null,
//     app_display: null,
//     icon: "https://www.youtube.com/watch?v=VFY_uvUd6Vs",
//     last_updated_by: "Admin",
//     platform: "Web",
//     position: "carousel_image",
//     sorting: 4,
//     language_id: "1",
//     valid_from: "2023-06-20 16:07:20",
//     valid_to: "2024-06-20 16:07:20",
//     status: 1,
//     created_at: "2023-06-20T09:09:39.000000Z",
//     updated_at: "2023-06-20T09:09:39.000000Z",
//   },
//   {
//     id: 435,
//     title: "Lot5 Web",
//     description: null,
//     ads_link: null,
//     app_display: null,
//     icon: "http://info-web-ads-services-infoweb.kk-exchange.com/media/public/advertisement/Nk2FdqBQ7USEfE9QA8uWRcZw6UolUEcWcFH5VW2B.mp4",
//     last_updated_by: "Admin",
//     platform: "Web",
//     position: "top_carousel",
//     sorting: 4,
//     language_id: "1",
//     valid_from: "2023-06-20 16:07:20",
//     valid_to: "2024-06-20 16:07:20",
//     status: 1,
//     created_at: "2023-06-20T09:09:39.000000Z",
//     updated_at: "2023-06-20T09:09:39.000000Z",
//   },
// ];

export default function FullSilder(props) {
  const {
    banners = [],
    isWeb = false,
  } = props;
  const isH5 = useMediaQuery("(max-width:768px)");
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [newBanners, setNewBanners] = React.useState([]);
  const maxSteps = newBanners?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };


  useEffect(() => {
    let position = "top_carousel";
    if (isH5) position = "carousel_image";
    let filterBanners = banners.filter((b) => b.position == position);
    if (filterBanners.length <= 0) {
      setNewBanners([
        {
          icon: "/assets/no-image.png",
          title: "no_image",
        },
      ]);
    } else {
      setNewBanners(banners.filter((b) => b.position == position));
    }
  }, [banners, isH5]);


  useEffect(() => {
console.log('autoplay:::',autoPlay)
  },[autoPlay])

  return (
    <Grid>
      {newBanners && newBanners.length > 0 && (
        <Grid
          item
          sx={{ position: "relative", marginTop: "0px" }}
          className="mainautoplayswipeable"
        >
          <Grid item xs={12} id="AddCarouselBtn" sx={{ maxHeight: "310px" }}>
            <Carousel
              responsive={responsive}
              additionalTransfrom={0}
              swipeable={newBanners.length > 1 ? true : false}
              draggable={newBanners.length > 1 ? true : false}
              arrows={newBanners.length > 1 ? true : false}
              autoPlaySpeed={5500}
              autoPlay={newBanners.length !== 1 && autoPlay}
              centerMode={false}
              containerClass="container-with-dots"
              dotListClass=""
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              // rtl={true}
            >
              {newBanners.map((ad, index) => (
                <Grid
                  onClick={() =>
                    (ad?.ads_link ? window.open(ad.ads_link, "_ blank") : "",setAutoPlay(false))
                  }
                  key={index}
                >
                  <Grid
                    style={{
                      color: "white",
                      textAlign: "left",
                      //  height: isH5 ? "160px" : "300px",
                      // border: "1px solid grey",
                      borderRadius: "5px",
                    }}
                    sx={{
                      height: { xs: "25vh", md: "310px" },
                      // maxHeight:{xs:'250px',md:'300px'}
                    }}
                  >
                    {ad.icon.includes(".mp4") || ad.icon.includes("youtube")  ? (
                      <Grid container justifyContent="center">
                        <ReactPlayer
                          controls={true}
                           width="100%"
                           height={isH5? '25vh': '310px'}
                          // playing={true}
                          // muted={true}
                          url={ad.icon}
                          allowFullScreen
                        />
                      </Grid>
                    ) : (
                      <Image
                        src={ad.icon}
                        alt={ad.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                        }}
                        draggable={false}
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
            </Carousel>
          </Grid>
          <style>
            {` .react-multiple-carousel__arrow {
                min-width: 24px;
                min-height: 24px;
                background: linear-gradient(0deg, #EFEFEF, #EFEFEF),
                linear-gradient(0deg, #FFFFFF, #FFFFFF);
              }
              .home-carousel-wrapper .react-multiple-carousel__arrow--left {
                left:20px;
              }
              .home-carousel-wrapper .react-multiple-carousel__arrow--right {
                right:20px; 
              }
              .react-multiple-carousel__arrow::before {
                font-size: 10px;
                color: #444444;
              }
            `}
          </style>
        </Grid>
      )}
    </Grid>
  );
}
