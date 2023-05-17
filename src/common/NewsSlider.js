import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Button, Link } from "@mui/material";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getNewsByCategory } from "@/store/actions/newsActions";
import Slider from "react-slick";
import moment from "moment/moment";
import utils from "./utils";
import { Icon } from "@iconify/react";

export default function NewsSlider(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { catId = [], lang_id = [] } = props;
  const dispatch = useDispatch();
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [toBottom, setToBottom] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(
      getNewsByCategory({
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
          setCurrentPage(1);
          console.log(catId, "newsSlider3:::", res.data);
        },
      })
    );
  }, [catId]);

  useEffect(() => {
    dispatch(
      getNewsByCategory({
        params: {
          lang_id: lang_id,
          rowsPerPage: 10,
          shortTitle: 7,
          category_id: catId,
          page: currentPage,
        },
        callback: (res) => {
          setLoading(true);
            setTimeout(() => {
              setLoading(false);    
              setNewsList(newsList.concat(res.data.data));     
            }, 3000);
        },
      })
    );
  }, [toBottom]);

  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );

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
      setToBottom(!toBottom)
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <Grid overflow="auto" minHeight="300px" maxHeight="450px" pb={1}>
        <Grid
          onScroll={handleScroll}
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
                  sx={{
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <Grid
                    key={item.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderBottom: "1px solid #dddddd",
                      paddingbottom: "10px",
                      marginBottom: "10px",
                      // color: "white",
                      margin: "10px",
                    }}
                  >
                    <Typography textAlign="left" fontSize={14}>
                      {item.title}
                    </Typography>
                    <Typography
                      textAlign="left"
                      fontSize="12px"
                      color="#8C8C8C"
                    >
                      {moment(item.release_date).format(utils.letterFormat)}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          
          {loading ? (
             <Icon
             color="black"
             width={40}
             b="5px"
             icon="line-md:loading-alt-loop"
           />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </>
  );
}
