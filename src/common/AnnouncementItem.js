import React from "react";
import moment from "moment/moment";
import utils from "./utils";
import PropTypes from "prop-types";
import { Typography, Divider, Button, Link } from "@mui/material";
import { Grid, Card, CardHeader } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getNewsByCategory } from "@/store/actions/newsActions";
import Slider from "react-slick";

export default function AnnouncementItem(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { announcement } = props; 
  const { banners } = useSelector((state) => state.banner);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  return (
    <>
      <div style={{ paddingRight: "10px",cursor:"pointer" }}>
        <Grid
          sx={{
            borderBottom: "2px solid grey",
            marginY: "10px",
            paddingBottom: "10px",
            minWidth: "200px",
          }}
        >
          <Typography
            title={announcement.title}
            className="twoLinesEllip"
            sx={{ fontSize: "14px",  
            "&:hover": {
              textDecoration:"underline"
            },
   }}
            px={1}
          >
            {announcement.title}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#8C8C8C" }} px={1}>
            {moment(announcement.created_at).format(utils.DateWithTime)}
          </Typography>
        </Grid>
      </div>
    </>
  );
}
