import React from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// import Slider from "react-slick";
import NewsSlider from "@/common/NewsSlider";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Dispatch } from "react";
import { getNewsById } from "@/store/actions/newsActions";
import router from "next/router";
import moment from "moment/moment";
import utils from "@/common/utils";
import { useTranslation } from "react-i18next";
import { getCategory } from "@/store/actions/categoryActions";
import {
  getNewsRecent,
  getNextNewsRecent,
  getNewsPopular,
  getNextNewsPopular,
} from "@/store/actions/newsActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import NewsCardDetails from "./newsCardDetails";
import NewsList from "@/common/NewsList";
import TitleBreadCrumbs from "@/common/TitleBreadCrumbs";
export default function NewsSingle() {
  const { t, i18n } = useTranslation();
  const [noRecentNewsData, setNoRecentNewsData] = useState(false);
  const [noPopularNewsData, setNoPopularNewsData] = useState(false);
  const [isFetching, setIsFetching] = useState(0);
  const lang_id = utils.convertLangCodeToID(i18n.language);
  const { categories = [] } = useSelector((state) => state.category);
  const [newsCat, setNewsCat] = useState(0);

  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const matches = useMediaQuery("(max-width:768px)");
  const {
    newsDetail = {},
    recentNews = [],
    mostPopularNews = [],
    newsRecentLoading,
    newsPopularLoading,
  } = useSelector((state) => state.news);
  const { query } = router;
  const id = query?.news_id || undefined;
  const handleChange = (event) => {
    console.log("setNewsCat :::",event.target.value)
    setNewsCat(event.target.value);
  };
  const scrollDown = (type) => {
    setTimeout(() => {
      const aLength = document.querySelectorAll(
        `#news-scroll-wrapper-${type} > .MuiGrid-root > a`
      );
      let elm = document.querySelector(
        `#news-scroll-wrapper-${type} > .MuiGrid-root > a:nth-of-type(${
          aLength.length - 1
        })`
      );
      if (type === "popular") {
        elm = document
          .querySelector(`#list-news-by-category-wrapper`)
          .scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
      }
      if (elm) {
        elm.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }, 1);
  };
  useEffect(() => {
    if (isFetching > 0 && (!newsRecentLoading || !newsPopularLoading)) {
      if (type == "recent") {
        if (recentNews.last_page != parseInt(page)) {
          dispatch(
            getNextNewsRecent({
              params: { type: "recent", page: page },
              callback: (res) => {
                scrollDown("recent");
              },
            })
          );
        } else {
          setNoRecentNewsData(true);
        }
      }
      if (type == "popular") {
        if (mostPopularNews.last_page != parseInt(page)) {
          dispatch(
            getNextNewsPopular({
              params: { type: "popular", page: page },
              callback: (res) => {
                scrollDown("popular");
              },
            })
          );
        } else {
          setNoPopularNewsData(true);
        }
      }
    }
  }, [isFetching]);
  useEffect(() => {
    dispatch(
      getNewsRecent({
        params: { type: "recent" },
      })
    );
    dispatch(
      getNewsPopular({
        params: { type: "popular" },
      })
    );
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(
        getNewsById({
          id,
          params: {},
          callback: (res) => {},
        })
      );
    }
  }, [id]);

  useEffect(() => {
    dispatch(
      getCategory({
        params: { lang_id: lang_id },
        callback: (res) => {},
      })
    );
  }, [lang_id]);
  return !matches ? (
    <Grid justifyContent="center">
      <TitleBreadCrumbs title={langKey && langKey.newscarddetails}/>
      <Grid my={1}>
        <Grid container>
          <Grid item xs={8} md={9} py={1}>
            <Grid border="1px solid grey" borderRadius="10px" p={2}>
              <Typography fontWeight="bold" variant="h4">
                {newsDetail.title || ""}
              </Typography>
              <Typography color="#8C8C8C" pt={1} fontSize="12px">
                {moment(newsDetail.created_at).format(utils.formatDate)}
              </Typography>
              <Grid>
                <img
                  src={newsDetail.image?.path}
                  onError={(e) => (e.target.src = "/assets/no-image.png")}
                  alt={newsDetail.title || ""}
                  width="100%"
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                    maxHeight: "600px",
                  }}
                />
                {/* <img width="100%" src="./assets/NewsCards/card_detail.png" /> */}
                <Typography
                  my={2}
                  dangerouslySetInnerHTML={{
                    __html: newsDetail.description || "",
                  }}
                ></Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} md={3} p={1}>
            <Grid container border="1px solid grey" borderRadius="10px" p={2}>
              <Grid item xs={12}>
                <Typography fontWeight="bold">Recent News</Typography>
                <NewsList
                  list={recentNews}
                  type="recent"
                  setIsFetching={setIsFetching}
                  setPage={setPage}
                  setType={setType}
                  loading={newsRecentLoading}
                />
                {noRecentNewsData && (
                  <Typography style={{ fontSize: 12, textAlign: "center" }}>
                    No more data
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography fontWeight="bold">Most Popular</Typography>
                <NewsList
                  list={mostPopularNews}
                  type="popular"
                  setIsFetching={setIsFetching}
                  setPage={setPage}
                  setType={setType}
                  loading={newsPopularLoading}
                />
                {noPopularNewsData && (
                  <Typography style={{ fontSize: 12, textAlign: "center" }}>
                    No more data
                  </Typography>
                )}
              </Grid>
              {categories.length > 0 ? (
                <Grid item xs={12} id="list-news-by-category-wrapper">
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="category-select"
                      value={newsCat}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      onChange={handleChange}
                    >
                      {categories.map((item, index) => {
                        return (
                          <MenuItem key={index} value={index}>
                            {item.category_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <NewsSlider
                    lang_id={lang_id}
                    catId={categories[newsCat].id}
                  />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <NewsCardDetails />
  );
}
