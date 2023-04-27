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

export default function NewsList(props) { 
  const {list = {},type,setIsFetching,setPage } = props;
  // listiner on scroll behavior
  const onScroll = (el,list) => {
    const scrollableHeight = el.target.scrollHeight - el.target.clientHeight
    if (el.target.scrollTop >= scrollableHeight) {
      const {current_page,last_page,next_page_url} = list;
      if(next_page_url) {
        const url = new URL(next_page_url);
        const params = url.searchParams;
        const to = params.get('page');
        if(current_page < last_page) {
          console.log('fetch')
          setPage(to)
          setIsFetching(new Date().getTime());
        }
      }else {
        console.log('last')
      }
    }
  }
  // add listiner on scroll behavior
  useEffect(() => {
    if(Object.keys(list).length > 0) {
      const el = document.querySelector(`#news-scroll-wrapper-${type} > .MuiGrid-root`);
      if(el) {
        el.addEventListener('scroll', (e) => onScroll(e,list))
      }
      return () => { 
        if(el) {
          el.removeEventListener('scroll',(e) => onScroll(e,list));
        }
      };
    }
  },[list])
  return (
    <>
      <Grid overflow="auto" minHeight="300px" maxHeight="450px" pb={1} id={`news-scroll-wrapper-${type}`}>
        <Grid
          sx={{
            borderRadius: "0px 0px 10px 10px",
            minHeight: 300,
            maxHeight: 440,
            overflow: "auto",
          }}
          textAlign="center">
          { Object.keys(list).length && list.hasOwnProperty('data') &&
            list.data.length > 0 && list.data.map((item, index) => {
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
                      borderBottom: "1px solid #dddddd",
                      paddingBottom: "10px",
                      marginBottom: "10px",
                      // color: "white",
                      margin: "10px",
                    }}
                  >
                    <Typography textAlign="left" fontSize={14}>{item.title}</Typography>
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
            })
          } 
        </Grid>
      </Grid>
    </>
  );
}
