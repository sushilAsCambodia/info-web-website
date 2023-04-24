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
import { getNewsByCategory, getNewsAll } from "@/store/actions/newsActions";
import { getCategory } from "@/store/actions/categoryActions";

const News = () => {
  const matches = useMediaQuery("(max-width:768px)");
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const lang_id = utils.convertLangCodeToID(i18n.language);

  const { newsAll } = useSelector((state) => state.news);
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");

  const [loading, setLoading] = useState(true);

  const { query } = router;
  const category_id = query?.category || undefined;

  const [categoryName, setCategoryName] = useState("");

  const handleCategoryChange = (event) => {
    // setCategoryName(event.target.value);
    console.log("category newsAll:::", event.target.value);
    router.push({
      pathname: "/news",
      query: { category: event.target.value },
    });
  };

  const { categories = [] } = useSelector((state) => state.category);

  console.log("news cate ID:::", category_id);
  console.log("newsAll:::", newsAll);

  const breadcrumbs = [
    <Link
      underline="hover"
      component={Link}
      key="1"
      color="inherit"
      sx={{ cursor: "pointer" }}
      onClick={() => router.push("/")}
    >
      {t("home")}
    </Link>,
    <Typography key="2" color="#F24E1E">
      {t("news")}
    </Typography>,
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="demo-select-small-label">
        {t("select_category")}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="category-select"
        value={category_id}
        label={t("select_category")}
        onChange={handleCategoryChange}
        defaultValue={category_id}
      >
        <MenuItem value={"All"}>All</MenuItem>
        {categories.map((item, index) => {
          return (
            <MenuItem key={index} value={item.id}>
              {item.category_name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>,
  ];

  useEffect(() => {
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
      getNewsAll({
        params: {
          lang_id: lang_id,
          rowsPerPage: 10,
          shortTitle: "",
          category_id: category_id == 'All' ? '': category_id,
          page: currentPage,
        },
        callback: (res) => {
          // console.log("News Page:::", res.data.data);
          // setAllNews(res.data.data);
          setTotalPage(res.data.last_page);
          setLoading(false);
        },
      })
    );
  }, [lang_id, currentPage, category_id, categoryName]);
  return (
    <>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="center"
        padding="20px 16px"
      >
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
                {!loading && newsAll.data.length != 0
                  ? category_id == "All" ? 'Every' : newsAll.data[0].category_name
                  : "No"}{" "}
                {t("news")}
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
          {!loading ? (
            <Grid container padding="0px">
              {newsAll.data.map((item, index) => {
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
                        cursor:"pointer"
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
          ) : (
            "loading"
          )}
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
