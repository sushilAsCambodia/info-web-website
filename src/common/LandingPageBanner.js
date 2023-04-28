import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import utils from "@/common/utils";
import {getBanner} from '@/store/actions/bannerActions'
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import Carousel from "react-multi-carousel";

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
    items: 1,
  },
  smallMobile: {
    breakpoint: { max: 320, min: 0 },
    items: 1,
  },
};

export default function LandingPageBanner(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    dispatch(getBanner(
      {
          params: { fake:true },
          callback:(res) => {
              console.log(res,'callback')
          }
      }
  ));
  }, []);
  return (
    <>
      <Grid mt={2}>
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
          {banners.map((banner, index) => (
            <Grid
              key={index}
              style={{
                color: "white",
                textAlign: "left",
                height: "200px",
                // border: "1px solid grey",
                borderRadius: "5px",
              }}
              container
              alignItems="center"
              justifyContent="space-around"
            >
              <img
                src={banner.image}
                alt={banner.label}
                style={{
                  width: "100%",
                  height:'100%',
                  objectFit:"cover", 
                }}
              />
            </Grid>
          ))}
        </Carousel>
      </Grid>
    </>
  );
}
