import React from "react";
import { Typography, Link } from "@mui/material";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect,useCallback } from "react"; 
import moment from 'moment/min/moment-with-locales'
import utils from "./utils";
import DataLoading from "@/components/DataLoading";
export default function NewsList(props) { 
  const {list = {}, type, setIsFetching, setPage, setType, loading,i18n } = props;
  const router = useRouter();
  // listiner on scroll behavior
  const onScroll = useCallback((el,list) => {
    const scrollableHeight = el.target.scrollHeight - el.target.clientHeight
    if (el.target.scrollTop >= scrollableHeight) {
      const {current_page,last_page,next_page_url} = list;
      if(next_page_url) {
        const url = new URL(next_page_url);
        const params = url.searchParams;
        const to = params.get('page');
        if(current_page < last_page) {
          setType(type);
          setPage(to)
          setIsFetching(new Date().getTime());
        }
      }
    }
  },[setType,setPage,setIsFetching,type]);
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
  },[list,onScroll,type])
  return (
    <Grid container style={{position:'relative'}}>
      <Grid overflow="auto" minHeight="300px" maxHeight="450px" pb={1} id={`news-scroll-wrapper-${type}`}>
        <Grid
        container
          sx={{
            borderRadius: "0px 0px 10px 10px",
            minHeight: 300,
            maxHeight: 440,
            overflow: "auto",
          }}
          textAlign="center">
          { (Object.keys(list).length > 0 && list.hasOwnProperty('data') &&
            list.data.length > 0) && list.data.map((item, index) => {
              return (
                <Grid
                  item
                  xs={12}
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
                      paddingbottom: "10px",
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
                      {moment(item.release_date).locale(utils.localChange(i18n)).format(utils.letterFormat)}
                      {/* {moment(item.release_date).format('YYYY-MM-DD')}{' '} */}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })
          } 
        </Grid>
      </Grid>
      {loading && <DataLoading inside={true} size={25}/>}
    </Grid>
  );
}
