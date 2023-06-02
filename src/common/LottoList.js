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
export function lottoGrid(lottos) {
  const bgColor = (index, length, lotto) => {
    if (lotto == 11) return "red";
  };

  return (
    <>
      <Grid
        container
        width="max-content"
        border="1px solid #ddd"
        borderRadius="10px"
        className="lottoGrid"
      >
        {lottos.numbers.map((lotto, index) => {
          return (
            <Grid
              key={index}
              px={1}
              className={`${lotto === lottos.winner ? "hitLotto" : ""}`}
            >
              {lotto}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
export default function LottoList(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { catId = [], lang_id = [], news = [] } = props;

  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [newsList, setNewsList] = useState([]);

  const lottos = { numbers: [12, 32, 4, 5, 12, 34], winner: 34 };

  return (
    <>
      <div
        style={{
          paddingRight: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            border: "1px solid #ddd",
            marginY: "5px",
            width: "max-content",
            overflow: "auto",
          }}
        >
          <Grid
            sx={{ fontSize: "15px", borderBottom: "1px solid #ddd" }}
            px={1}
          >
          2023 Mar 29, Monday
          </Grid>
          <CardHeader
            sx={{ padding: "10px" }}
            avatar={
              <Grid
                sx={{
                  background: "#FFE0E0",
                  borderRadius: "50%",
                  width: "38px",
                  height: "38px",
                }}
                textAlign="center"
              >
                <picture>
                  <img
                    width="100%"
                    height="100%"
                    alt="supper-logo"
                    src="/assets/Logo/superlotto-logo.png"
                  />
                </picture>
              </Grid>
            }
            title={
              <Typography fontSize="13px" fontWeight="bold">
                Super Lotto
              </Typography>
            }
            subheader={lottoGrid(lottos)}
          />
        </Card>
      </div>
    </>
  );
}
