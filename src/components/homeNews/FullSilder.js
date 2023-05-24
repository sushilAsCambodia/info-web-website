import React,{useEffect} from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Grid, Tabs, Tab } from "@mui/material";
import { Image } from "mui-image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Route } from "@mui/icons-material";
import router from "next/router";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
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
    let type = 'web';
    if(isH5) type = 'h5';
    setNewBanners(banners.filter(b => b.platform.toLowerCase() == type && b.position == 'carousel_image'));
  },[banners,isH5])
  console.log("NewBanners:::",newBanners)
  return (
    <> 
    { (newBanners && newBanners.length > 0) && <Grid item sx={{ position: "relative", marginTop:'0px' }} className="mainautoplayswipeable">
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {
            newBanners.map((banner, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Grid item component="div" sx={{
                    height: {xs:160,md:300},
                    cursor:'pointer',
                  }}
                  onClick={()=>router.push(banner.ads_link)} 
                  >
                    <Image
                      style={{
                        height: '100%',
                        width: "100%",
                        objectFit:'cover'
                      }}
                      alt="banner"
                      src={banner.icon || '/assets/no-image.png'}
                      onError={(e) => e.target.src = '/assets/no-image.png'}
                    />
                  </Grid>
                ) : null}
              </div>
            ))
          }
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          activeStep={activeStep}
          sx={[
            {
              position:'absolute',
              background:'transparent',
              transform: 'translate(-50%, -50%)',
              left:'50%',
              top:'50%',
              width: '100%'  
            },
            {
              '& .MuiMobileStepper-dots': { display: 'none' },
            },
          ]}
          nextButton={ newBanners.length > 1 &&
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              className="arrow-control-custom"
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            newBanners.length > 1 && 
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              className="arrow-control-custom"
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </Grid>} 
    </>
  );
}
