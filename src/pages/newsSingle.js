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
import { getNewsRecent,getNextNewsRecent, getNewsPopular } from "@/store/actions/newsActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import NewsCardDetails from "./newsCardDetails";
import NewsList from "@/common/NewsList";
import DataLoading from "@/components/DataLoading";


export default function NewsSingle() {
  const { t, i18n } = useTranslation();
  const [showLoadMore,setShowLoadMore] = useState(false);
  const [isFetching,setIsFetching] = useState(0);
  const lang_id = utils.convertLangCodeToID(i18n.language);
  const { categories = [] } = useSelector((state) => state.category);
  const [newsCat, setNewsCat] = useState(0);
  const [page, setPage] = useState(1);
  const matches = useMediaQuery("(max-width:768px)");
  const { loading, newsDetail = {}, recentNews = [], mostPopularNews = [] , newsRecentLoading } = useSelector((state) => state.news);
  const { query } = router;
  const id = query?.news_id || undefined;
  const handleChange = (event) => {
    setNewsCat(event.target.value);
  };
  useEffect(() => {
    if(isFetching > 0 && !newsRecentLoading) {
      console.log(recentNews)
      dispatch(
        getNextNewsRecent({
          params: { type: 'recent', page: page},
          callback: (res) => { 
            setTimeout(() => {
              const aLength = document.querySelectorAll('#news-scroll-wrapper-recent> .MuiGrid-root > a');
              const li = document.querySelector(`#news-scroll-wrapper-recent> .MuiGrid-root > a:nth-of-type(${aLength.length - 1})`);
              if(li) {
                  li.scrollIntoView({ block: "end" });
              }
            }, 1); 
          },
        })
      );
    }
  },[isFetching])
  useEffect(() => {
    dispatch(
      getNewsRecent({
        params: { type: 'recent'},
        callback: (res) => { },
      })
    );
    dispatch(
      getNewsPopular({
        params: { type: 'popular'},
        callback: (res) => { },
      })
    );
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if(id) {
      dispatch(
        getNewsById({
          id,
          params: {},
          callback: (res) => {  },
        })
      );
    }
  }, [id]);

  useEffect(() => {
    dispatch(
      getCategory({
        params: { lang_id: lang_id },
        callback: (res) => {  },
      })
    );
  }, [lang_id]);

  const getCatId = (id) => {
    let index = categories.findIndex((i) => i.id === id);
    return categories[index].id;
  }; 
  return !matches ? (
    <Grid justifyContent="center">
      <Grid my={1}>
        <Typography fontWeight="bold" variant="h5">
          {t("newscarddetails")}
        </Typography>
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
                <Typography my={2} dangerouslySetInnerHTML={{ __html: newsDetail.description || '' }}></Typography>
              </Grid>
            </Grid>
          </Grid>
         
          <Grid item xs={4} md={3} p={1}>
            <Grid container border="1px solid grey" borderRadius="10px" p={2}>
              <Grid item xs={12} style={{position:'relative'}}>
                <Typography fontWeight="bold">Recent News</Typography>
                {newsRecentLoading && <DataLoading inside={true} size={25}/>}
                <NewsList list={recentNews} type="recent" setIsFetching={setIsFetching} setPage={setPage}/>
              </Grid>
              <Grid item xs={12}>
                <Typography fontWeight="bold">Most Popular</Typography>
                <NewsList list={mostPopularNews} type="popular"/>
              </Grid>
              {categories.length > 0 ?
                <Grid item xs={12}>
                  <FormControl fullWidth> 
                    <Select
                      labelId="demo-simple-select-label"
                      id="category-select"
                      value={newsCat}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
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
                  <NewsSlider lang_id={lang_id} catId={categories[newsCat].id}  />
                </Grid>
              :''}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ):( <NewsCardDetails/>)
}
