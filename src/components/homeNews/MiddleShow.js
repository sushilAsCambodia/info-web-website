import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import MatchItem from "@/common/MatchItem";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 1321 },
    items: 1,
  },
  desktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1320, min: 1025 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 685 },
    items: 1,
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
const responsive2 = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 1321 },
    items: 3,
  },
  desktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1320, min: 1025 },
    items: 3,
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
export default function MiddleShow(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash == "journal") {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [router.asPath]);


  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  return (
    <Grid container justifyContent="center">
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
          <Grid textAlign="center" mt={0.5}>
            <img src="./assets/News/banner-web.png" width="98%" />
          </Grid>
        </Carousel>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12} mx={1} container justifyContent="space-between" height="40px">
          <Typography> {langKey && langKey.match_reccomendation}</Typography>
        </Grid>
        <Grid item xs={12} id="customCarouselBtn">
          <Carousel
            responsive={responsive2}
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
            <MatchItem />
            <MatchItem />
            <MatchItem />
          </Carousel>
        </Grid>
      </Grid>
    </Grid>
  );
}
