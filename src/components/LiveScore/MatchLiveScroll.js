import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Button, Link } from "@mui/material";
import { Grid, Card, CardHeader } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getNewsByCategory } from "@/store/actions/newsActions";
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

export default function MatchLiveScroll(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { announcement } = props;
  console.log("announcement:::", announcement);
  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [newsList, setNewsList] = useState([]);

  return (
    <>
      <Grid style={{  cursor: "pointer" }}>
        <Grid
          sx={{
            borderBottom: "1px solid grey",
            marginY: "10px",
            paddingBottom: "10px",
            minWidth: "200px",
          
              fontSize: "16px",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
        >
          <Typography
            className="twoLinesEllip"
            
            px={1}
          >
            Russian Basketball Super League
          </Typography>
          <Typography
            className="twoLinesEllip"
            sx={{ fontSize: "13px" }}
            px={1}
            color="#F24E1E"
          >
            Tambov vs Novosibirsk
          </Typography>
          <Typography sx={{ fontSize: "12px"  }} px={1}>
            19:22
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
