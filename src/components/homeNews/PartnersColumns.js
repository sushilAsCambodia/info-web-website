import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Icon } from "@iconify/react";
const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 1321 },
    items: 5,
  },
  desktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1320, min: 1025 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 685 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 686, min: 321 },
    items: 2,
  },
  smallMobile: {
    breakpoint: { max: 320, min: 0 },
    items: 1,
  },
};

export default function PartnersColumns(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash == "journal") {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [router.asPath]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4} marginY="15px">
        <Divider
          sx={{
            "&::before, &::after": {
              borderColor: "red",
            },
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "system-ui",
          }}
        >
          <Typography variant="h5" paddingX="10px" fontWeight="bold">
          {langKey && langKey.partners}
          </Typography>
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <Carousel
          responsive={responsive}
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
        >
          <Grid
            sx={{
              margin: "5px",
              borderRadius: "10px",
              //   paddingX:"5px"
            }}
          >
            <Grid
              style={{
                height: "120px",
                paddingX: "5px",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Grid item padding="5px">
                <img
                  src="./assets/Logo/clts-logo.png"
                  style={{
                    minWidth: "100px",
                    maxHeight: "80px",
                    maxWidth:"150px"
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{
              margin: "5px",
              borderRadius: "10px",
              //   paddingX:"5px"
            }}
          >
            <Grid
              style={{
                height: "120px",
                paddingX: "5px",
                border: "1px solid grey",
                borderRadius: "5px",
              }}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Grid item padding="5px">
                <img
                  src="./assets/Logo/kk_exchange.png"
                  style={{
                    minWidth: "100px",
                    maxHeight: "80px",
                    maxWidth:"200px"
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Carousel>
      </Grid>
    </Grid>
  );
}
