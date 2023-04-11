import {
  Grid,
  List,
  ListItem,
  Card,
  Typography,
  Container,
  Button
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import NewsColumns from "@/components/homeNews/NewsColumns";
import JournalsColumns from "@/components/homeNews/JournalsColumns";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import utils from "@/common/utils";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { getBannerSync } from "@/store/reducers/bannerSlice";
import { useTheme } from "@mui/material/styles";
import { Icon } from '@iconify/react';

export default function Home() {
  const matches = useMediaQuery("(max-width:768px)");
  const { banners } = useSelector((state) => state.banner);
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const theme = useTheme();
  const maxSteps = banners.length;
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    dispatch(
      getBannerSync({
        params: { fake: true },
        callback: (res) => {
          console.log(res, "callback");
        },
      })
    );
  }, [i18n.language]);
  
  const handleStepChange = (step) => {
    setActiveStep(step);
  }; 
  return !matches ? (
    <Container
      sx={{
        position: "relative",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <Grid item>
        <NewsColumns />
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
        
      </Grid>
        <NewsColumns />
        {/* <JournalsColumns/> */}
        
      </Grid>
    </Container>
  ) : (
    <Container
      sx={{
        backgroundImage: 'url("./assets/Home/landingpagebg.jpg")',
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <Grid container xs={12} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Grid
            item
            textAlign="center"
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "150px",
            }}
          >
            <Typography fontWeight={700} fontSize="20px">
              DOWNLOAD APP
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "90px",
            }}
          >
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Grid item xs={6}>
                <Typography textAlign="center">
                  <img src="./assets/Home/iosbtn.png" />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography textAlign="center">
                  <img src="./assets/Home/androidbtn.png" />
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            textAlign="center"
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "20px",
            }}
          >
            <Grid item color="#1639e5" fontFamily="sans-serif">
              <Link href="/home">Continue to home page</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
