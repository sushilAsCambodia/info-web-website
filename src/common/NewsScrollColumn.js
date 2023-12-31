import React, { useCallback } from "react";
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
import moment from "moment/min/moment-with-locales";
import utils from "@/common/utils";
export default function NewsScrollColumn(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { newsCategory = [], lang_id = "",i18n } = props;
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState("");

  const [infiniteLoad, setInfiniteLoad] = useState(false);
  const [loading, setLoading] = useState(false); 
  const handleScroll = (event) => {
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
  
  const fetchNewsByCategory = useCallback((categoryId,currentPage) => {
    dispatch(
      getNewsByCategory({
        params: {
          lang_id: lang_id,
          rowsPerPage: 10,
          shortTitle: "",
          category_id: categoryId,
          page: currentPage,
        },
        callback: (res) => {
            if(currentPage>1) {
              setInfiniteLoad(true);
              setTimeout(() => {
                setNewsList((curr => {
                  let news = curr.concat(res?.data?.data||[]);
                  if(news.length) {
                    news.sort(function(a, b) {
                      return  parseInt(b.sorting) - parseInt(a.sorting);
                    });
                  }
                  return news;
                }));
                setLoading(false);
                setInfiniteLoad(false);
              },3000)
            }else {
              setLoading(false);
              let news = res?.data?.data || []
              if(news.length) {
                news.sort(function(a, b) {
                  return  parseInt(b.sorting) - parseInt(a.sorting);
                });
              }
              setNewsList(news);
              setPageLimit(res?.data?.last_page);
            }
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[lang_id]);
  useEffect(() => {
    setLoading(true);
    fetchNewsByCategory(newsCategory.id,currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsCategory.id,currentPage]);

  // const fetchNewsByCategoryNextPage = useCallback((currentPage) => {
  //   dispatch(
  //     getNewsByCategory({
  //       params: {
  //         lang_id: lang_id,
  //         rowsPerPage: 10,
  //         shortTitle: "",
  //         category_id: newsCategory.id,
  //         page: currentPage,
  //         next:'true'
  //       },
  //       callback: (res) => {
  //         setInfiniteLoad(true);
  //         setTimeout(() => { 
  //           setNewsList(newsList && newsList.concat(res?.data?.data||[]) );
  //           setInfiniteLoad(false);
  //         }, 2000);
  //       },
  //     })
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[dispatch,lang_id,newsCategory.id]);
  // useEffect(() => {
  //   // NEXT PAGE 
  //   // fetchNewsByCategoryNextPage(currentPage)
  // }, [currentPage]);
  
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
          className={newsList && newsList.length <= 0 ? "d-none" : ""}
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
                  disabled={newsList && newsList.length == 0}
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
                  paddingbottom: "10px",
                  overflow: "auto",
                  "--bgImg": `url("../assets/News/${
                    bg[Math.floor(Math.random() * bg.length)]
                  }")`,
                }}
                className="newsColumn"
              >
                {
                  newsList && newsList.length > 0 ? (
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
                          paddingbottom: "10px",
                          marginBottom: "10px",
                          margin: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <Typography textAlign="left">  {utils.subString(item.title,50)}</Typography>
                        <Typography textAlign="left" fontSize="12px">
                          {moment(item.release_date).locale(utils.localChange(i18n)).format(utils.formatDate)}
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
                    paddingbottom="5px"
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
