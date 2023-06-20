import * as React from "react";
import { Icon } from "@iconify/react";
import { Chip, Divider, Grid, Link, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import MiddleShow from "./MiddleShow";
import FullSilder from "./FullSilder";
import LottoList from "@/common/LottoList";
import useMediaQuery from "@mui/material/useMediaQuery";
import AnnouncementItem from "@/common/AnnouncementItem";
import { getLatestLottery } from "@/store/actions/lotteryActions";
import {
  getLotteryCategory,
  getLotteryResultByCategory,
} from "@/store/actions/lotteryActions";
import utils from "@/common/utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getAnnouncement } from "@/store/actions/announcementAction";
import NoDataMessage from "@/common/NoDataMessage";
import Slider from "react-slick";

const responsive = {
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
    breakpoint: { max: 1024, min: 565 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 564, min: 375 },
    items: 2,
  },
  smallMobile: {
    breakpoint: { max: 389, min: 0 },
    items: 1,
  },
};

export default function ResultsBanner(props) {
  const { lang_id = [], banners = {} } = props;
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [announceMent, setAnnounceMent] = useState([]);
  const [value, setValue] = React.useState(0);
  const matches = useMediaQuery("(max-width:1199px)");
  const matches2 = useMediaQuery("(max-width:768px)");
  const { lotteryCategories = [], lotteryResults = [] } = useSelector(
    (state) => state.lottery
  );

  const dispatch = useDispatch();

  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );
  const { latest } = useSelector((state) => state.lottery);
  const { announcement } = useSelector((state) => state?.announcement);

  const lotteryresult = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: true,
    arrows: false,
    lazyLoad: false,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "295px",
  };
  const announcementresult = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: true,
    arrows: false,
    lazyLoad: false,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "295px",
  };

  const announcements = useSelector(
    (state) => state?.announcement?.announcements
  );

  useEffect(() => {
    dispatch(getLatestLottery("hey"));
    dispatch(
      getAnnouncement({
        params: { lang_id: utils.convertLangCodeToID(i18n.language), take: 10 },
        callback: (res) => {
          setAnnounceMent(res && res.data)
          console.log("sssssss",res && res.data)
        },
      })
    );
  }, [i18n.language]);

  const handleGetCategory = React.useCallback(() => {
    dispatch(
      getLotteryCategory({
        params: {
          lang_id: utils.convertLangCodeToID(i18n.language),
        },
      })
    );
  }, [dispatch, i18n.language]);
  const handleGetLotteryResult = React.useCallback(
    (categoryId = undefined) => {
      dispatch(
        getLotteryResultByCategory({
          params: {
            lang_id: utils.convertLangCodeToID(i18n.language),
            category_id: categoryId,
          },
        })
      );
    },
    [dispatch, i18n.language]
  );

  useEffect(() => {
    handleGetCategory();
  }, [handleGetCategory]);

  useEffect(() => {}, [lotteryCategories]);

  useEffect(() => {
    if (value >= 0) {
      let hash = "";
      const lotteryCategory = lotteryCategories[value - 1] || {};
      if (Object.keys(lotteryCategory).length) {
        hash = "#" + lotteryCategory?.translation?.translation;
      }
      // router.replace(`${router.route}${hash}`)
      handleGetLotteryResult(lotteryCategory?.id);
    }
  }, [value, i18n.language]);

  return (
    <>
      <Grid
        item
        container
        md={12}
        className="middle-grid"
        justifyContent="center"
        marginTop="10px"
        // px={{xs:1,md:0}}
      >
        <Grid
          item
          xs={12}
          lg={3}
          xl={2.5}
          border={{ xs: "0px solid #ddd", md: "1px solid #ddd" }}
          borderRadius="2px"
          height={`${matches2 ? "120px" : ""}`}
        >
          <Typography px={1.5} mb={1}>
            {langKey && langKey.latest_results}
          </Typography>
          <Grid
            overflow="auto"
            className={matches ? "verticleLotto" : "horizontalLotto"}
            px={1}
            marginBottom={1}
          >
            <Slider {...lotteryresult}>
              {lotteryResults &&
                lotteryResults.length > 0 &&
                lotteryResults.map((lr, key) => {
                  return (
                    <div key={key}>
                      <LottoList lottery={lr} />
                    </div>
                  );
                })}
            </Slider>

            {/* {latest?.MOLHC?.map((item, index) => {
              return (
                <>
                  <LottoList item={item}/>
                </>
              );
            })} */}
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          lg={7}
          xl={7.5}
          py={{ xs: 1, lg: 0 }}
          px={{ xs: 0, lg: 1 }}
        >
          <Grid
            item
            xs={12}
            border={{ xs: "0px solid #ddd", md: "1px solid #ddd" }}
            borderRadius="2px"
            height="100%"
            container
            alignItems="space-between"
          >
            <MiddleShow />
          </Grid>
        </Grid>
        {!matches2 ? (
          <Grid
            item
            xs={12}
            lg={2}
            border={{ xs: "0px solid #ddd", md: "1px solid #ddd" }}
            borderRadius="2px"
          >
            <Grid
              px={1.5}
              mb={1}
              container
              justifyContent="space-between"
              width="100%"
            >
              <Typography> {langKey && langKey.announcement}</Typography>
              <Grid
                component={Link}
                href="/announcement"
                style={{ color: "#037DED", textDecoration: "none" }}
              >
                <Typography> {langKey && langKey.view_all}</Typography>
              </Grid>
            </Grid>
            <Grid
              overflow="auto"
              className={matches ? "verticleLotto" : "horizontalLotto"}
              px={1}
              marginBottom={1}
            >
            <Slider {...announcementresult}>
            
              {announceMent?.length > 0 && announceMent.map((item, index) => {
                return (
                  <div key={index}>
                    <AnnouncementItem announcement={item} />
                  </div>
                );
              })}
            </Slider>
               {announceMent?.length == 0 && announceMent.map((item, index) => {
                return (
                  <NoDataMessage />
                );
              })}
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}
