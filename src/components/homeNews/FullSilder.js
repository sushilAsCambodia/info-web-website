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
  const { banners = [],cards = [] } = props;
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
      <Grid item sx={{ position: "relative", marginTop:'5px' }} className="mainautoplayswipeable">
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {banners.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Grid
                  item
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.image}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
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
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </Grid>
      {cards && cards.length > 0 && <Grid item xs={12} sx={{marginTop:'5px',marginBottom:'5px'}}>
        <Tabs
          value={tabValue}
          onChange={(e) => setTabValue(e.target.value)}
          variant="scrollable"
          aria-label="scrollable auto tabs example"
          className="MuiTabs-custom-tab"
          TabIndicatorProps={{
            style: {display:'none' }
          }}>
          {
            cards.map((card,index) => {
              return <Tab key={index} onClick={()=> setTabValue(0)} sx={{ padding: '5px'}} label={<Grid position="relative" textAlign="center" sx={{borderRadius:'4px',overflow:'hidden'}}>
                  <Grid sx={{background:`url(${card.image})`}} alt="机率" width="80px" height="80px" className="card-custom">
                    <span></span>
                  </Grid>
                  <Typography
                    position="absolute"
                    fontSize="10px"
                    bottom="25%"
                    left="0"
                    right="0"
                    sx={{color:'white'}}
                  >
                    {card.translate||'N/A'}
                  </Typography>
                  <Typography
                    position="absolute"
                    fontSize="10px"
                    bottom="10%"
                    left="0"
                    right="0"
                    sx={{color:'white'}}
                  >
                    {card.label||'N/A'}
                  </Typography>
                </Grid>}>
              </Tab> 
            })
          }
          
        </Tabs> 
        <style>
          {
            `
              .card-custom > span{
                position: absolute;
                height: 100%;
                left: 0;
                right: 0;
                background:linear-gradient(360deg, #FF0000 0%, rgba(255, 110, 49, 0.37) 100%)
              }
            `
          }
        </style>
      </Grid>} 
    </>
  );
}
