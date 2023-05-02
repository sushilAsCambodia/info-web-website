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

export default function AnnouncementItem(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { announcement } = props; 
  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [newsList, setNewsList] = useState([]);

  return (
    <>
      <div style={{ paddingRight: "10px",cursor:"pointer" }}>
        <Grid
          sx={{
            borderBottom: "2px solid grey",
            marginY: "10px",
            paddingBottom: "10px",
            minWidth: "200px",
          }}
        >
          <Typography
            title={announcement[0].title}
            className="twoLinesEllip"
            sx={{ fontSize: "14px",  
            "&:hover": {
              textDecoration:"underline"
            },
   }}
            px={1}
          >
            {announcement[0].title}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#8C8C8C" }} px={1}>
            {announcement[0].date}
          </Typography>
        </Grid>
      </div>
    </>
  );
}
