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
import { Image } from "mui-image";

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
  const { item } = props;
  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [newsList, setNewsList] = useState([]);

  return (
    <>
      <Grid style={{ cursor: "pointer" }}>
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
          <Typography className="twoLinesEllip" px={1}>
            {item.title}
          </Typography>
          <Typography
            className="twoLinesEllip"
            sx={{ fontSize: "13px" }}
            px={1}
            color="#F24E1E"
          >
            Tambov vs Novosibirsk
          </Typography>
          <Typography sx={{ fontSize: "12px" }} px={1}>
            19:22
          </Typography>
        </Grid>
        {item.card ? (
          <Grid px={1}>
            <Grid
              container
              item
              xs={12}
              p={1}
              justifyContent="center"
              component={Card}
              className="LiveScoreBg liveScrollCard"
              style={{ "--liveBg": `url(${item.card.img})` }}
            >
              <Grid item xs={12} textAlign="center" py={1}>
                <Typography fontWeight="bold">
                  Russian Basketball Super League
                </Typography>
                <Typography variant="body2">2023 Mar 18 00:00</Typography>
              </Grid>

              <Grid item xs={5} textAlign="center" className="score-card-logo" container justifyContent="center">
                <Image
                  alt="Dynamo Vladivostok"
                  src={
                    "https://i.pinimg.com/originals/9a/70/de/9a70de3e4c7e4d046209036746b4a943.png"
                  }
                />
                <Typography fontWeight="bold" fontSize="13px">Dynamo Vladivostok</Typography>
                <Typography fontWeight="bold" variant="body2" >GUEST</Typography>
              </Grid>
              <Grid
                item
                xs={2}
                container
                alignItems="center"
                justifyContent="center"
              >
                  <Grid
                    width={35}
                    height={35}
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{ background: "#F24E1E", borderRadius: "50px" }}
                  >
                    <Typography sx={{ color: "white", fontWeight: "bold" }}>
                      VS
                    </Typography>
                </Grid>
              </Grid>

              <Grid item xs={5} textAlign="center" className="score-card-logo" container justifyContent="center">
                <Image
                  alt="Dynamo Vladivostok"
                  src={
                    "https://i.pinimg.com/originals/9a/70/de/9a70de3e4c7e4d046209036746b4a943.png"
                  }
                />
                <Typography fontWeight="bold" fontSize="13px">Dynamo Vladivostok</Typography>
                <Typography fontWeight="bold" variant="body2">GUEST</Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}
