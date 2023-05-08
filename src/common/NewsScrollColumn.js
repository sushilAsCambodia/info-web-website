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
import { Icon } from "@iconify/react";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Router from "next/router";
import moment from "moment/moment";
import utils from "@/common/utils";
export default function NewsScrollColumn(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { newsCategory = [], lang_id = "" } = props;
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState("");

  const [infiniteLoad, setInfiniteLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleScroll = (event) => {
    console.log("scroll clientheight:::", event.currentTarget.clientHeight);
    console.log("scroll scrolltop:::", event.currentTarget.scrollTop);
    console.log(
      "scroll test:::",
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
        event.currentTarget.clientHeight
    );

    if (
      pageLimit !== currentPage &&
      pageLimit > currentPage &&
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
        event.currentTarget.clientHeight
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(
      getNewsByCategory({
        params: {
          lang_id: lang_id,
          rowsPerPage: 10,
          shortTitle: "",
          category_id: newsCategory.id,
          page: currentPage,
        },
        callback: (res) => {
          setTimeout(() => {
            setNewsList(res.data.data);
            setPageLimit(res.data.last_page);
            setLoading(false);
          }, 3000);
        },
      })
    );
  }, [newsCategory.id]);

  useEffect(() => {
    // NEXT PAGE
    dispatch(
      getNewsByCategory({
        params: {
          lang_id: lang_id,
          rowsPerPage: 10,
          shortTitle: "",
          category_id: newsCategory.id,
          page: currentPage,
        },
        callback: (res) => {
          console.log("next page Function");
          console.log("next page data :::", res.data.data);
          console.log("next page newsList:::", newsList);

          setInfiniteLoad(true);
          setTimeout(() => {
            setNewsList(newsList.concat(res.data.data));
            setInfiniteLoad(false);
          }, 2000);
        },
      })
    );
  }, [currentPage]);
  const bg = ["Mask.png", "Mask2.png", "Mask3.png"];

  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

  return (
    <>
      {
        <Grid
          item
          xs={6}
          lg={4}
          textAlign="center"
          padding="5px"
          className={newsList.length <= 0 ? "d-none" : ""}
        >
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
                <Typography variant="h5" textTransform="capitalize">
                  {newsCategory.translation
                    ? newsCategory.translation?.category_name
                    : newsCategory.category_name || "N/A"}
                </Typography>
                <Button
                  disabled={newsList.length == 0}
                  component={Link}
                  onClick={() =>
                    Router.push({
                      pathname: "/news",
                      query: { category: newsCategory.id },
                    })
                  }
                  variant="contained"
                  sx={{
                    background: "#FFD233",
                    padding: "2px",
                    fontSize: "14px",
                    "&:hover": {
                      background: "#FF6F31",
                      color: "white",
                    },
                  }}
                >
                  <Typography> {langKey && langKey.more}</Typography>
                </Button>
              </Grid>
              {/* <Typography color="white">
                Scroll top: <b>{scrollTop}</b>
              </Typography> */}

              <Grid
                onScroll={handleScroll}
                sx={{
                  borderRadius: "0px 0px 10px 10px",
                  height: 440,
                  paddingBottom: "10px",
                  overflow: "auto",
                  "--bgImg": `url("../assets/News/${
                    bg[Math.floor(Math.random() * bg.length)]
                  }")`,
                }}
                className="newsColumn"
              >
                {loading ? (
                  <Icon
                    color="white"
                    width={40}
                    paddingBottom="5px"
                    icon="line-md:loading-alt-loop"
                  />
                ) : newsList.length > 0 ? (
                  newsList.map((item, index) => {
                    return (
                      <Grid
                        onClick={() =>
                          Router.push({
                            pathname: "/newsSingle",
                            query: { news_id: item.id },
                          })
                        }
                        key={index}
                        className="newsLinkTransform"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          borderBottom: "2px solid white",
                          paddingBottom: "10px",
                          marginBottom: "10px",
                          margin: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <Typography textAlign="left">{item.title}</Typography>
                        <Typography textAlign="left" fontSize="12px">
                          {moment(item.release_date).format(utils.formatDate)}
                        </Typography>
                      </Grid>
                    );
                  })
                ) : (
                  <Typography variant="h4" color="white">
                    {langKey && langKey.no_news}
                  </Typography>
                )}

                {infiniteLoad ? (
                  <Icon
                    color="white"
                    width={40}
                    paddingBottom="5px"
                    icon="line-md:loading-alt-loop"
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    </>
  );
}
