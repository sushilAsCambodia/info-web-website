import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Button } from "@mui/material";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: true,
    arrows: false,
    lazyLoad: false,
    centerMode: false,
  };

export default function NewsSlider(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { news } = props; 

  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  

  return (
    <>
      <Grid overflow="auto" height="450px">
                <Grid
                  sx={{
                    borderRadius: "0px 0px 10px 10px",
                    height: 440,
                    overflow: "auto",
                  }}
                  className="newsColumn"
                >
                  {" "}
                  <Slider {...settings}>
                    {news.map((item) => {
                      return (
                        <Grid>
                          <Grid
                            key={item.id}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              borderBottom: "2px solid grey",
                              paddingBottom: "10px",
                              marginBottom: "10px",
                              // color: "white",
                              margin: "10px",
                            }}
                          >
                            <Grid textAlign="left">{item.news}</Grid>
                            <Grid textAlign="left">{item.date}</Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Slider>
                </Grid>
              </Grid>
    </>
  );
}
