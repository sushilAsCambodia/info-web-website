import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Pagination from "@mui/material/Pagination";
import {
  Typography,
  Stack,
  Grid,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Router, useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import utils from "@/common/utils";
import moment from "moment/moment";
import { getNewsByCategory } from "@/store/actions/newsActions";
import { getCategory } from "@/store/actions/categoryActions";
import LoadingDialog from "@/components/Loading";
const News = () => {
  const matches = useMediaQuery("(max-width:768px)");
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const lang_id = utils.convertLangCodeToID(i18n.language);
  const { news } = useSelector((state) => state.news);
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [loading, setLoading] = useState(true);

  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);


  const { query } = router;
  const category_id = query?.category || undefined;
  const handleCategoryChange = (event) => {
    router.push({
      pathname: "/news",
      query: { category: event.target.value },
    });
  };
  const { categories = [] } = useSelector((state) => state.category);
  const breadcrumbs = [
    <Link
      key="home-page"
      underline="hover"
      component={Link}
      color="inherit"
      sx={{ cursor: "pointer" }}
      onClick={() => router.push("/")}
    >
      {langKey && langKey.home}

    </Link>,
    <Typography key="news-page" color="#F24E1E">
      {langKey && langKey.news}
    </Typography>,
    category_id ? (
      <FormControl key="category-news-dropdown" sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="demo-select-small-label">
          {langKey && langKey.select_category}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="category-select"
          value={category_id}
          label=  {langKey && langKey.select_category}
          onChange={handleCategoryChange}
        >
          <MenuItem value="All">{t("all")}</MenuItem>
          {categories.map((item, index) => {
            return <MenuItem key={item.id} value={item.id}>
                {item.category_name}
              </MenuItem>
          })}
        </Select>
      </FormControl>
    ) : (
      "Loading"
    ),
  ];
  useEffect(() => {
    console.log("useefect on langID useeffect:::", category_id);

    dispatch(
      getCategory({
        params: { lang_id: lang_id },
        callback: (res) => {
          console.log("news page getCategorys:::", res);
        },
      })
    );
  }, [lang_id]);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    setLoading(true);
    dispatch(
      getNewsByCategory({
        params: {
          lang_id: lang_id,
          rowsPerPage: 10,
          shortTitle: "",
          category_id: category_id == "All" ? "" : category_id,
          page: currentPage,
        },
        callback: (res) => {
          setTotalPage(res.data.last_page);
          setLoading(false);
        },
      })
    );
  }, [lang_id, currentPage, category_id]);
  return (
    <>
      <LoadingDialog loading={loading} />
      <Grid
        container
        alignItems="flex-start"
        justifyContent="center"
        padding="20px 16px">
        <Grid
          item
          xs={12}
          container
          alignContent="flex-start"
          alignItems="center"
          overflow="auto"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            xl={12}
            padding="0px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingBottom={2}
          >
            <Grid>
              <Typography
                variant="h5"
                fontWeight={600}
                textTransform="capitalize"
              >
                {!loading && news.length != 0
                  ? category_id == "All"
                    ? "Every"
                    : news[0].category_name
                  : "No"}{" "}
         {langKey && langKey.news}
              </Typography>
            </Grid>
            <Grid>
              <Stack spacing={2}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {breadcrumbs}
                </Breadcrumbs>
              </Stack>
            </Grid>
          </Grid>
          <Grid container padding="0px">
            {news.map((item, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={index}
                  p={1}
                  onClick={() =>
                    router.push({
                      pathname: "/newsSingle",
                      query: { news_id: item.id },
                    })
                  }
                >
                  <Grid
                    item
                    p={2}
                    sx={{
                      backgroundColor: "#FFF5F0",
                      borderRadius: "11px",
                      border: "1px solid #FF6F31",
                      minHeight: "145px",
                      cursor: "pointer",
                    }}
                  >
                    <Typography title={item.title} className="twoLinesEllip">
                      {item.title}
                    </Typography>

                    <Typography
                      paddingTop={1}
                      textAlign="left"
                      fontSize="12px !important"
                      color="#8C8C8C"
                    >
                      {moment(item.release_date).format(utils.letterFormat)}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          {totalPage == 1 ? (
            ""
          ) : (
            <Grid
              item
              xs={12}
              textAlign="center"
              display="flex"
              justifyContent="center"
              paddingTop={3}
            >
              <Stack spacing={2} sx={{ textAlign: "center" }}>
                <Pagination
                  count={totalPage ? totalPage : 1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChange}
                />
              </Stack>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default News;
