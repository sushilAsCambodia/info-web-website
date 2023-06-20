import React from "react";
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
import moment from 'moment/min/moment-with-locales'
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
      <div>
        <Grid
          sx={{
            minWidth: "200px",
          }}
        >
          <Typography
            title={announcement.title}
            className="twoLinesEllip"
            sx={{ fontSize: "14px",  
            lineHeight:"14px",
            fontWeight:"500"

            
          }}
           
          >
            {announcement.title}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#8C8C8C" }} paddingTop={'4px'}>
            {/* {moment(announcement.created_at).format(utils.letterFormat2)} */}
            {moment(announcement.created_at).locale(utils.localChange(i18n.language)).format(utils.letterFormat2)}
          </Typography>
        </Grid>
       <Grid padding={'12px 0px'}>
       <Divider />
       </Grid>
      </div>
    </>
  );
}
