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
import { Grid } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default function FullSilder(props) {
  const {banners = []} = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
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
  const card1 = "/assets/NewsJourney/newscard1.png";
  const card2 = "/assets/NewsJourney/newscard2.png";
  const card3 = "/assets/NewsJourney/newscard3.png";
  const card4 = "/assets/NewsJourney/newscard4.png";
  return (
    <>
      <Box item sx={{ position: "relative" }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {banners.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box 
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
      </Box>
      <Grid item xs={12}>
        <Grid
          item
          display="flex"
          sx={{ marginTop: "10px" }}
          color="#fff"
          justifyContent="space-between"
        >
          <Grid position="relative" textAlign="center">
            <img src={card1} alt="一般" width="80px" height="80px" />
            <Typography
              position="absolute"
              fontSize="10px"
              bottom="25%"
              left="0"
              right="0"
            >
              一般
            </Typography>
            <Typography
              position="absolute"
              fontSize="10px"
              bottom="10%"
              left="0"
              right="0"
            >
              General
            </Typography>
          </Grid>
          <Grid position="relative" textAlign="center">
            <img src={card2} alt="一般" width="80px" height="80px" />
            <Typography
              position="absolute"
              fontSize="10px"
              bottom="25%"
              left="0"
              right="0"
            >
              机率
            </Typography>
            <Typography
              position="absolute"
              fontSize="10px"
              bottom="10%"
              left="0"
              right="0"
            >
              Casino
            </Typography>
          </Grid>
          <Grid position="relative" textAlign="center">
            <img src={card3} alt="一般" width="80px" height="80px" />
            <Typography
              position="absolute"
              fontSize="10px"
              bottom="25%"
              left="0"
              right="0"
            >
              捕鱼
            </Typography>
            <Typography
              position="absolute"
              fontSize="10px"
              bottom="10%"
              left="0"
              right="0"
            >
              Fishing
            </Typography>
          </Grid>
          <Grid position="relative" textAlign="center">
            <img src={card4} alt="一般" width="80px" height="80px" />
            <Typography
              position="absolute"
              fontSize="10px"
              bottom="25%"
              left="0"
              right="0"
            >
              视讯
            </Typography>
            <Typography
              position="absolute"
              fontSize="10px"
              bottom="10%"
              left="0"
              right="0"
            >
              Live Casino
            </Typography>
          </Grid> 
        </Grid>
      </Grid>
    </>
  );
}
