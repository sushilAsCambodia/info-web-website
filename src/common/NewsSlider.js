import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Button, Link } from "@mui/material";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getNewsByCategory } from "@/store/actions/newsActions";
import Slider from "react-slick";
import moment from "moment/moment";
import utils from "./utils";

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
  const { catId = [], lang_id = [] } = props;

  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    dispatch(
      getNewsByCategory({
        params: { lang_id: lang_id, category_id: catId, take: 10 },
        callback: (res) => {
          console.log(catId, "newsSlider:::", res);
          setNewsList(res.data);
          setLoading(false);
          console.log(catId, "newsSlider:::", newsList);
        },
      })
    );
  }, [catId]);
  return (
    <>
      <Grid overflow="auto" minHeight="300px" maxHeight="450px">
        <Grid
          sx={{
            borderRadius: "0px 0px 10px 10px",
            minHeight: 300,
            maxHeight: 440,
            overflow: "auto",
          }}
          className="newsColumn"
        >
          {" "}
          {/* <Slider {...settings}> */}
          {newsList &&
            newsList.map((item,index) => {
              return (
                <Grid
                  key={index}
                  component={Link}
                  onClick={() =>
                    router.push({
                      pathname: "/newsSingle",
                      query: { news_id: item.id },
                    })
                  }
                  color="black"
                  sx={{ textDecoration: "none" }}
                >
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
                    <Typography textAlign="left">{item.title}</Typography>
                    <Typography
                      textAlign="left"
                      fontSize="11px"
                      color="#8C8C8C"
                    >
                      {moment(item.release_date).format(utils.letterFormat)}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          {/* </Slider> */}
        </Grid>
      </Grid>
    </>
  );
}
