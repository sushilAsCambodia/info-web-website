import { Icon } from "@iconify/react";
import { Chip, Divider, Grid, Link, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import MiddleShow from "./MiddleShow";
import NewsSlider from "@/common/NewsSlider";
import Slider from "react-slick";
import LottoList from "@/common/LottoList";
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

export default function ResultsBanner(props) {
  const {lang_id=[]} = props; 

  const [loading, setLoading] = useState(false);
   
  return (
    <>
      <Grid
        item
        container
        className="middle-grid"
        justifyContent="center"
        spacing={1}
        marginTop="10px"
      >
        <Grid item xs={3} border="1px solid grey" borderRadius="10px">
          <Typography px={1.5} mb={1}>Latest Results</Typography>
          {/* <NewsSlider news={rows} /> */}
          <Grid overflow="auto" height="430px">
            {/* <Slider {...settings}> */}
            <LottoList />
            <LottoList />
            <LottoList />
            <LottoList />
            <LottoList />
            <LottoList />
            {/* </Slider> */}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid
            item
            xs={12}
            mx={1}
            border="1px solid grey"
            borderRadius="10px"
            height="100%"
          >
            <MiddleShow />
          </Grid>
        </Grid>
        <Grid item xs={3} border="1px solid grey" borderRadius="10px">
          <Grid px={1.5} mb={1} container justifyContent="space-between" width="100%">
            <Typography>Announcements</Typography>
            <Grid
              component={Link} href="/announcement"
              style={{ color: "#037DED", textDecoration: "none" }}
            ><Typography>View all</Typography>
            </Grid>
          </Grid>
          <Grid overflow="auto" height="450px">
            <NewsSlider lang_id={lang_id} catId={1}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
