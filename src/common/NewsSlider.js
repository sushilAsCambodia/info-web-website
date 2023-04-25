import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Button, Link } from "@mui/material";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getNewsByCategory, getNewsAll } from "@/store/actions/newsActions";
import Slider from "react-slick";
import moment from "moment/moment";
import utils from "./utils";

export default function NewsSlider(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { catId = [], lang_id = [] } = props;
  const dispatch = useDispatch();
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);

  useEffect(() => {
    dispatch(
      getNewsAll({
        params: {
          lang_id: lang_id,
          rowsPerPage: 10,
          shortTitle: 7,
          category_id: catId,
          page: 1,
        },
        callback: (res) => {
          setNewsList(res.data.data);
          setPageLimit(res.data.last_page);
          console.log(catId, "newsSlider3:::", res.data);
        },
      })
    );
  }, [catId]);

  useEffect(() => {
    dispatch(
      getNewsAll({
        params: {
          lang_id: lang_id,
          rowsPerPage: 10,
          shortTitle: 7,
          category_id: catId,
          page: currentPage,
        },
        callback: (res) => {
          setNewsList(newsList.concat(res.data.data));
        },
      })
    );
  }, [currentPage]);
  return (
    <>
      <Grid overflow="auto" minHeight="300px" maxHeight="450px" pb={1}>
        <Grid
          sx={{
            borderRadius: "0px 0px 10px 10px",
            minHeight: 300,
            maxHeight: 440,
            overflow: "auto",
          }}
          textAlign="center"
        >
          {newsList &&
            newsList.map((item, index) => {
              return (
                <Grid
                  key={index}
                  component={Link}
                  onClick={() =>
                    router.push({
                      pathname: "/newsSingle",
                      query: { news_id: item.id },
                    })
                  }
                  color="black"
                  sx={{ textDecoration: "none",
                  cursor:"pointer",
                  "&:hover": {
                    textDecoration: "underline"
                  } }}
                >
                  <Grid
                    key={item.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderBottom: "2px solid grey",
                      paddingBottom: "10px",
                      marginBottom: "10px",
                      // color: "white",
                      margin: "10px",
                    }}
                  >
                    <Typography textAlign="left">{item.title}</Typography>
                    <Typography
                      textAlign="left"
                      fontSize="11px"
                      color="#8C8C8C"
                    >
                      {moment(item.release_date).format(utils.letterFormat)}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          {pageLimit > currentPage ? (
            <Button
              size="small"
              variant="contained"
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%)",
                border: "1px solid #DDDDDD",
                "&:hover": {
                  color: "white"
                }
              }}
            >
              <Typography
                fontSize="13px"
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              >
                {t("load_more")}
              </Typography>
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </>
  );
}
