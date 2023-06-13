import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button, Link, Breadcrumbs } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getNewsByCategory } from "@/store/actions/newsActions";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Router from "next/router";
import moment from "moment/moment";
import utils from "@/common/utils";
import { Icon } from "@iconify/react";
export default function TitleBreadCrumbs(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  // example of paths paths={[{name:'Lottery',link:'/footballPage'},{name:'End',link:'/footBallPage#End'}]}
  const { title, paths = [] } = props;

  const dispatch = useDispatch();
  useEffect(() => {}, []);

  function handleClick(path) {
    router.push(path);
  }
  const otherPaths = paths.map((item, index) => {
    return (
      <Link
        underline="hover"
        key="1"
        onClick={() => handleClick(item.link)}
        style={{ cursor: "pointer" }}
      >
        {item.name}
      </Link>
    );
  });
  const breadcrumbsEnd = [
    <Link
      underline="hover"
      key="1"
      onClick={() => handleClick("/")}
      style={{ cursor: "pointer" }}
    >
        {langKey && langKey.home}
    </Link>,

    <Typography key="2" color="#F24E1E">
      {title}
    </Typography>,
  ];

  return (
    <Grid container justifyContent="space-between" my={1} px={{xs:2,md:0}}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Breadcrumbs
        separator={<Icon width={30} icon="ic:round-navigate-next" />}
        aria-label="breadcrumb"
      >
        {paths && otherPaths}
        {breadcrumbsEnd}
      </Breadcrumbs>
    </Grid>
  );
}
