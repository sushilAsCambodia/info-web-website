import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Pagination from "@mui/material/Pagination";

import {
  Typography,
  Stack,
  Grid,
  Link,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import utils from "@/common/utils";
import moment from "moment/moment";

import { getNewsByCategory } from "@/store/actions/newsActions";
const News = () => {
  const matches = useMediaQuery("(max-width:768px)");
  const { i18n } = useTranslation();
  const lang_id = utils.convertLangCodeToID(i18n.language);

  const { news } = useSelector((state) => state.news);
  const router = useRouter();
  const dispatch = useDispatch();

  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("news:::", news);
  const breadcrumbs = [
    <Link
      underline="hover"
      component={Link}
      key="1"
      color="inherit"
      sx={{ cursor: "pointer" }}
      onClick={() => router.push("/")}
    >
      Home
    </Link>,
    <Typography key="2" color="#F24E1E">
      News
    </Typography>,
  ];

  useEffect(() => {
    dispatch(
      getNewsByCategory({
        params: { lang_id: lang_id, take: 10 },
        callback: (res) => {
          console.log("News Page:::", res);
          // setAllNews(res.data);
          setLoading(false);
        },
      })
    );
  }, [lang_id]);
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
              <Typography variant="h5" fontWeight={600}>
                News
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
              {news.map((item, index) => {
                return (
                  <Grid xs={12} sm={6} md={3} key={index} p={1}>
                    <Grid
                      item
                      p={2}
                      sx={{
                        backgroundColor: "#FFF5F0",
                        borderRadius: "11px",
                        border: "1px solid #FF6F31",
                      }}
                    >
                      <Typography>{item.title}</Typography>
                      <Typography
                      sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        '-webkit-line-clamp': '3', /* number of lines to show */
                                'line-clamp': '3', 
                        '-webkit-box-orient': 'vertical',
                      }}
                        dangerouslySetInnerHTML={{
                          __html: item.description || "",
                        }}
                      ></Typography>
                      <Typography
                        paddingTop={1}
                        textAlign="left"
                        fontSize="10px !important"
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
          <Grid
            item
            xs={12}
            textAlign="center"
            display="flex"
            justifyContent="center"
            paddingTop={3}
          >
            <Stack spacing={2} sx={{ textAlign: "center" }}>
              <Pagination count={5} variant="outlined" shape="rounded" />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default News;
