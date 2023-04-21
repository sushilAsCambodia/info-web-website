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
import useMediaQuery from "@mui/material/useMediaQuery";
import NewsCardDetails from "./newsCardDetails";


export default function NewsSingle() {
  const { i18n } = useTranslation();
  const lang_id = utils.convertLangCodeToID(i18n.language);
  const { categories = [] } = useSelector((state) => state.category);
  const [newsCat, setNewsCat] = useState(0);
  const matches = useMediaQuery("(max-width:768px)");

  const { loading, newsDetail = {} } = useSelector((state) => state.news);
  const { query } = router;
  const id = query?.news_id || undefined;

  const handleChange = (event) => {
    setNewsCat(event.target.value);
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

  const getCatId = (id) => {
    let index = categories.findIndex((i) => i.id === id);
    return categories[index].id;
  };

  return !matches ? (
    <Grid justifyContent="center">
      <Grid my={1}>
        <Typography fontWeight="bold" variant="h5">
          News Details
        </Typography>
        <Grid container>
          <Grid xs={8} md={9} py={1}>
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
          {categories.length > 0 ?
          <Grid xs={4} md={3} p={1}>
            <Grid container border="1px solid grey" borderRadius="10px" p={2}>
              <Grid xs={12}>
                <Typography fontWeight="bold">{categories[0].category_name }</Typography>
                <NewsSlider lang_id={lang_id} catId={categories[0].id}  />
              </Grid>
              <Grid xs={12}>
                <Typography fontWeight="bold">{categories[1].category_name}</Typography>
                <NewsSlider lang_id={lang_id} catId={categories[1].id}  />
              </Grid>
              <Grid xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category-select-label">
                    Select Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="category-select"
                    value={newsCat}
                    label="Select Category"
                    onChange={handleChange}
                    defaultValue={categories[newsCat].id}
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
            </Grid>
          </Grid>:'loading'}
        </Grid>
      </Grid>
    </Grid>
  ):( <NewsCardDetails/>)
}
