import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import NewsScrollColumn from "@/common/NewsScrollColumn";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import utils from "@/common/utils";

import { getCategory } from "@/store/actions/categoryActions";

export default function NewsColumns(props) {
  const dispatch = useDispatch();
  const {t} = useTranslation()
  const theme = useTheme();
  const router = useRouter();
  const {lang_id=[]} = props; 
  const { categories=[] } = useSelector((state) => state.category);


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

  return (
    <Grid container justifyContent="center" my={3}>
      <Grid item xs={4} marginY="15px">
        <Divider
          sx={{
            "&::before, &::after": {
              borderColor: "red",
            },
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "system-ui",
          }}
        >
          <Typography variant="h5" paddingX="10px" fontWeight="bold">
            {t('news')}
          </Typography>
        </Divider>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        {categories && categories.length>0 ? categories.map((item,index) => {
          return (
          <NewsScrollColumn key={index} newsCategory={item} lang_id={lang_id} />
          );
        }):<Typography>{t("no_news")}</Typography>
      }
      </Grid>
    </Grid>
  );
}
