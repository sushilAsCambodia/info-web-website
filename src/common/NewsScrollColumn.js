import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button, Link } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getNewsByCategory } from "@/store/actions/newsActions";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Router from "next/router";
import moment from "moment/moment";
import utils from "@/common/utils";
export default function NewsScrollColumn(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { newsCategory = [], lang_id = '' } = props;
  const [newsList, setNewsList] = useState([]);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getNewsByCategory({
        params: { lang_id: lang_id, category_id: newsCategory.id, take: 10 },
        callback: (res) => {
          setNewsList(res.data);
          console.log(newsCategory.id,"newsscrollcol:::",newsList)
        },
      })
    );
  }, [newsCategory.id]);
  const bg = ["Mask.png", "Mask2.png", "Mask3.png"];
  return (
    <>
      {
        <Grid item xs={6} lg={4} textAlign="center" padding="5px">
          <Grid
            sx={{
              // border: "2px dashed red",
              padding: "15px",
              borderRadius: "10px",
              border: "2px dashed red",
            }}
            className="half-border"
            position="relative"
          >
            <Grid
              sx={{
                position: "absolute",
                // background: "linear-gradient(to left, #FF6F31 50%, white 0%)",
                background: "#FF6F31",
                height: 555,
                width: 250,
                right: "-1%",
                top: -3,
                borderRadius: "0px 10px 10px 0px",
              }}
            ></Grid>
            <Grid
              sx={{
                backgroundColor: "black",
                borderRadius: "10px",
                position: "relative",
                zIndex: 3,
              }}
            >
              <Grid
                style={{
                  background: "black",
                  color: "white",
                  textAlign: "left",
                  // height: "50px",
                  padding: "10px",
                  borderRadius: "10px 10px 0px 0px",
                }}
              >
                <Typography variant="h5">
                  {newsCategory.translation
                    ? newsCategory.translation?.category_name
                    : newsCategory.category_name || "N/A"}
                </Typography>
                <Button
                  component={Link}
                  href="/news"
                  variant="contained"
                  sx={{
                    background: "#FFD233",
                    padding: "2px",
                    fontSize: "13px",
                  }}
                >
                  More
                </Button>
              </Grid>

              <Grid
                sx={{
                  borderRadius: "0px 0px 10px 10px",
                  height: 440,
                  overflow: "auto",
                  "--bgImg": `url("../assets/News/${
                    bg[Math.floor(Math.random() * bg.length)]
                  }")`,
                }}
                className="newsColumn"
              >
                {newsList.length>0 ? 
                newsList.map((item, index) => {
                  return (
                    <Grid
                      component={Link}
                      onClick={() =>
                        Router.push({
                          pathname: "/newsSingle",
                          query: { news_id: item.id },
                        })
                      }
                      color="black"
                      key={index}
                      sx={{
                        textDecoration: "none",
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "2px solid white",
                        paddingBottom: "10px",
                        marginBottom: "10px",
                        color: "white",
                        margin: "10px",
                        webkitTransform : "scale(0.9)",
                        transitionDuration: "0.7s",
                        "&:hover": {
                          borderBottom: "2px solid orange",
                          color: "orange",
                          webkitTransform: "scale(1)",
                          transitionDuration: "0.7s",
                        },
                        cursor:"pointer"
                      }}
                    >
                      <Typography textAlign="left">{item.title}</Typography>
                      <Typography textAlign="left">
                        {moment(item.created_at).format(utils.formatDate)}
                      </Typography>
                    </Grid>
                  );
                }):
                <Typography variant="h4" color="white">No News</Typography>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
     }
    </>
  );
}
