import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Button, Link, Grid, Card, CardHeader } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getNewsByCategory } from "@/store/actions/newsActions";
import Slider from "react-slick";
import { Icon } from "@iconify/react";


export default function NoDataMessage(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { announcement } = props; 
  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  return (
    <>
        <Grid
                container
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Icon color="#ff723e" width={50} icon="lucide:megaphone-off" />
                <Typography>no announcement today</Typography>
              </Grid>
    </>
  );
}
