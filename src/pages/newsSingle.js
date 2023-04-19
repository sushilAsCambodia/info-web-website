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
import { getNewsByCategory } from "@/store/actions/newsActions";
const rows = [
  {
    id: 1,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 2,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 3,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 4,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 4,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 4,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 4,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
  {
    id: 4,
    news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "10/22/2023",
  },
];

export default function NewsSingle() {
  const [age, setAge] = useState("");
  const { i18n } = useTranslation();
  const lang_id = utils.convertLangCodeToID(i18n.language)
  const { categories=[] } = useSelector((state) => state.category);

  console.log("category:::",categories)
  const { loading, newsDetail = {} } = useSelector((state) => state.news);
  const { query } = router;
  const id = query?.news_id || undefined;

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getNewsById({
        id,
        params: {},
        callback: (res) => {
          console.log("NewsSingle:::", res);
        },
      })
    );
  }, [id]);

  useEffect(() => {
    dispatch(
      getCategory({
        params: { lang_id: lang_id },
        callback: (res) => {
          console.log("getCategorys:::", res);
        },
      })
    );
  }, [lang_id]);

  const getCatId=(id)=>{
   let index = categories.findIndex(i => i.id ===id);
return categories[index].id
  }

  // const latestNews = newsListByCat(37)
  console.log("newsDetail:::", newsDetail);
  return (
    <Grid container justifyContent="center">
      <Grid my={1}>
        <Typography fontWeight="bold" variant="h5">
          News Details
        </Typography>
        <Grid container>
          <Grid xs={9} p={1}>
            <Grid border="1px solid grey" borderRadius="10px" p={2}>
              <Typography fontWeight="bold" variant="h5">
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
                    borderRadius: "6px",
                    maxHeight: "600px",
                  }}
                />
                {/* <img width="100%" src="./assets/NewsCards/card_detail.png" /> */}
                <Typography>{newsDetail.description || ""}</Typography>{" "}
              </Grid>

              {/* <Grid>
                <img width="100%" src="./assets/NewsCards/card_detail_2.png" />
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt.
                </Typography>
              </Grid> */}
            </Grid>
          </Grid>
          <Grid xs={3} p={1}>
            <Grid container border="1px solid grey" borderRadius="10px" p={2}>
              <Typography fontWeight="bold">Latest News</Typography>
              <NewsSlider catId={37} news={rows} />
              <Typography fontWeight="bold">Most Popular</Typography>
              <NewsSlider catId={36} news={rows} />
              <FormControl fullWidth>
                <InputLabel id="category-select-label">
                  Select Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="category-select"
                  value={age}
                  label="Select Category"
                  onChange={handleChange}
                  style={{ paddingY: "0px" }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <NewsSlider news={rows} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
