import React,{useEffect} from "react";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-multi-carousel";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Grid, Tabs, Tab,Link } from "@mui/material";
import { Image } from "mui-image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Route } from "@mui/icons-material";
import router from "next/router";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  }
};
export default function FullSilder(props) {
  const { banners = [], isWeb = false } = props;
  const isH5 = useMediaQuery("(max-width:768px)");
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [tabValue, setTabValue] = React.useState(0);
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
    // let type = 'web';
    // if(isH5) type = 'h5';
    
    let position = 'top_carousel';
    if(isH5) position = 'carousel_image';
    setNewBanners(banners.filter(b =>b.position == position));
    // setNewBanners(banners.filter(b => b.platform.toLowerCase() == type && b.position == 'top_carousel'));
  },[banners,isH5])
  console.log("banners:::",banners)
  console.log("NewBanners:::",newBanners)

  const matches = useMediaQuery("(max-width:768px)");

  return (
    <> 
    { (newBanners && newBanners.length > 0) && <Grid item sx={{ position: "relative", marginTop:'0px' }} className="mainautoplayswipeable">
        <Grid item xs={12} id="AddCarouselBtn">
         <Carousel
            responsive={responsive}
            additionalTransfrom={0}
            swipeable={newBanners.length>1?true:false}
            draggable={newBanners.length>1?true:false}
            arrows={newBanners.length>1?true:false}
            autoPlaySpeed={3000}
            autoPlay={newBanners.length !== 1}
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
              <Link href={ad.ads_link} target='_blank' key={index} >
                <Grid 
                  style={{
                    color: "white",
                    textAlign: "left",
                  
                    // border: "1px solid grey",
                    borderRadius: "5px",
                  }} 
                  sx={{height:{xs:'160px',md:'350px'}}}
                >
                  <Image  
                    src={ad.icon}
                    alt={ad.title}
                    style={{
                      width: "100%",
                      height:'100%',
                      objectFit:"fill", 
                    }}
                  />
                </Grid>
              </Link>
            ))}
          </Carousel>
          </Grid>
          <style>
          {
            ` .react-multiple-carousel__arrow {
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
            `
          }
        </style>
      </Grid>} 
    </>
  );
}
