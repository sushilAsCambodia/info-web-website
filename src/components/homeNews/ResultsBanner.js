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
import useMediaQuery from "@mui/material/useMediaQuery";
import AnnouncementItem from "@/common/AnnouncementItem";
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

const announcement =[{title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',date:"03 Apr 2023"}]
export default function ResultsBanner(props) {
  const {lang_id=[]} = props; 
const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const matches = useMediaQuery("(max-width:1199px)");

  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  
  return (
    <>
      <Grid
        item
        container
        md={12}
        className="middle-grid"
        justifyContent="center"
        marginTop="10px"
      >
        <Grid item xs={12} lg={3} xl={2.5} border="1px solid #ddd" borderRadius="2px">
          <Typography px={1.5} mb={1}> {langKey && langKey.latest_results}</Typography>
          {/* <NewsSlider news={rows} /> */}
          {/* <Grid overflow="auto" height="430px"> */}
          <Grid overflow="auto" className={matches ? 'verticleLotto': 'horizontalLotto'} px={1}>
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
        <Grid item xs={12} lg={7} xl={7.5} py={{xs:1,lg:0}} px={{xs:0,lg:1}} >
          <Grid
            item
            xs={12}
            border="1px solid #ddd"
            borderRadius="2px"
            height="100%"
          >
            <MiddleShow />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={2} border="1px solid #ddd" borderRadius="2px">
          <Grid px={1.5} mb={1} container justifyContent="space-between" width="100%">
            <Typography> {langKey && langKey.announcement}</Typography>
            <Grid
              component={Link} href="/announcement"
              style={{ color: "#037DED", textDecoration: "none" }}
            ><Typography> {langKey && langKey.view_all}</Typography>
            </Grid>
          </Grid>
          <Grid overflow="auto" className={matches ? 'verticleLotto': 'horizontalLotto'} px={1}>
            <AnnouncementItem announcement={announcement}/>          
            <AnnouncementItem announcement={announcement}/>
            <AnnouncementItem announcement={announcement}/>
            <AnnouncementItem announcement={announcement}/>
            <AnnouncementItem announcement={announcement}/>
            <AnnouncementItem announcement={announcement}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
