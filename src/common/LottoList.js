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
export function lottoBalls(lottos) {
  return (
    <>
      <Grid
        container
        width="max-content"
        borderRadius="10px"
        p={1}
      >
        {lottos?.map((item, index) => {
          return (
            <Grid
            container
            justifyContent="center"
            alignItems="center"
              key={index}
              mx={0.2}
              sx={{background:item.color,width:'30px',height:'30px',borderRadius:'20px'}}
            >
              <Grid
              container
              justifyContent="center"
              alignItems="center" sx={{width:'20px',height:'20px',background:'white',borderRadius:'20px'}}>
             <Typography fontSize='12px'>{item.num}</Typography> </Grid>
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
  const { item } = props;

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
          {/* {item?.opendate} */}
          2023-06-01 21:30:00 Monday
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
                {/* {item?.lotterycode} */}
                MOLHC
              </Typography>
            }
            subheader={lottoGrid(lottos)}
          />
                  {/* {lottoBalls(item.attrs)} */}

        </Card>
      </div>
    </>
  );
}
