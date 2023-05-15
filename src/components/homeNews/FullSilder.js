import React from "react";
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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default function FullSilder(props) {
  const { banners = [], isWeb = false } = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [tabValue, setTabValue] = React.useState(0);
  const maxSteps = banners.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStepChange = (step) => {
    setActiveStep(step);
  }; 
  return (
    <> 
    { (banners && banners.length > 0) && <Grid item sx={{ position: "relative", marginTop:'0px' }} className="mainautoplayswipeable">
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {
            banners.map((banner, index) => (
              <div key={index} >
                {Math.abs(activeStep - index) <= 2 ? (
                  <Grid item component="div" sx={{
                    height: {xs:160,md:300}
                  }}>
                    <img
                      style={{
                        height: '100%',
                        width: "100%",
                        objectFit:'cover'
                      }}
                      src={banner.file || '/assets/no-image.png'}
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
          nextButton={
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
