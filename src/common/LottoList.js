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
import useMediaQuery from "@mui/material/useMediaQuery";

export function lottoGrid(lottos) {
  return (
    <>
      <Grid
        container
        width="max-content"
        border="1px solid #ddd"
        borderRadius="10px"
        className="lottoGrid"
        marginBottom="10px"
        
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

  const lottos = { numbers: [12, 32, 5,14, 12, 34], winner: 34 };
  const matches = useMediaQuery("(max-width:1200px)");
  const matches2 = useMediaQuery("(max-width:768px)");

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
            width: `${!matches2 ? "max-content":"600px" }`
            // overflow: "auto",
            // width: ,
          }}
        >
          <Grid
            sx={{ fontSize: "15px", borderBottom: "1px solid #ddd" }}
            px={1}
          >
            29 Mar 2023, Monday
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
            subheader={!matches ?lottoGrid(lottos):'' }
          />
          {matches ? lottoGrid(lottos): '' }
        </Card>
      </div>
    </>
  );
}
