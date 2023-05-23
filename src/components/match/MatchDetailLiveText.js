import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import StarIcon from "@/components/svg/star";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Image } from "mui-image";
export default function MatchDetailLiveText(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  
  const message = [
    {id:1,title:"90' + 13'",message:'Goal Kick Leads',type:'yellow'},
    {id:2,title:"40' + 22'",message:'michael awards free kicks to united',type:'ToFrom'},
    {id:3,title:"90' + 3'",message:'hsdhfhd jsdjfsdjfsjdf jsdf jsdfjsdjfsj ddjs jsdf',type:''},
    {id:4,title:"2' + 1'",message:'Goal Kick Leads',type:'ball'},
]
  return (
    <Grid container height="100vh" overflow="auto" alignContent="flex-start">
    {message.map((item,index)=>{
        return(
            <Grid py={1} item xs={12} key={index} container borderBottom="1px solid grey">
                <Grid item xs={3} textAlign="center">
                    <Typography>{item.title}</Typography>
                </Grid>
                <Grid item xs={2} container alignItems="center" justifyContent="flex-end" pr={1}>
                    <Typography>{item.type}</Typography>
                </Grid>
               <Grid item xs={7}>
                 <Typography>{item.message}</Typography>
               </Grid>
            </Grid>
        )
    })}
      </Grid>
  );
}
