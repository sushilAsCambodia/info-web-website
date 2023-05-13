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

export default function LinkBanner(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

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
  }, [i18n.language]);

  return (
    <>
      <Grid my={1}>
          
            <Grid
              style={{
                color: "white",
                height: "150px",
                borderRadius: "5px",
                backgroundImage: 'url("./assets/News/linkBanner.png")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              container
              alignItems="center"
              justifyContent="space-around"
              columns={15}
              px={1}
            >
            <Grid xs={3}>
            <Typography fontWeight="bold" variant="h4">实时比分</Typography>
            <Typography fontWeight="bold" variant="h4">  {langKey && langKey.faster_than_tv}</Typography>
            </Grid>
            <Grid xs={3} textAlign="center"><img height="100px" src="./assets/News/football_2.png" /></Grid>
            <Grid xs={3} p={1} border="2px solid white" borderRadius="20px">
                <Grid display="flex" alignItems="center" justifyContent="center" sx={{height:"60px",background:"white",borderRadius:"20px"}}>
                    <Typography color="black">More than  2000 matches</Typography>
                </Grid>
            </Grid>
            <Grid xs={3} textAlign="center"><img height="100px" src="./assets/News/football_1.png" /></Grid>
            <Grid xs={3} textAlign="right">
                <Button variant="container" sx={{background:"#FF8024",color:"white",borderRadius:"20px"}}> {langKey && langKey.download_app}</Button>
            </Grid>
            </Grid>
      </Grid>
    </>
  );
}
