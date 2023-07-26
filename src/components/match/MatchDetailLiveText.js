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
  const {InfoDetailsText}=props
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  console.log("InfoDetailsTextInfoDetailsText",InfoDetailsText)

  const manageEvent=(eventType)=>{
    switch(eventType) {
      case 0:
        return <Icon width={25} icon="openmoji:soccer-ball" />;
        case 1:
        return <Icon width={25} icon="openmoji:soccer-ball" />;
        case 1:
        return <Icon width={25} icon="openmoji:soccer-ball" />;
        case 4:
          return <Icon width={25} icon="openmoji:soccer-ball" />;
          case 5:
            return <img src="/assets/Logo/1200px-Missed_penalty_icon.svg" />;
            case 7:
          return <Icon color="#ffe94b" width={25} icon="tabler:rectangle-vertical-filled" />;
          case 8:
          return <Icon color="#ffe94b" width={25} icon="tabler:rectangle-vertical-filled" />;
          case 10:
          return <Icon color="#ff0000" width={25} icon="tabler:rectangle-vertical-filled" />;
          case 11:
          return <><Icon icon="icons8:arrows-long-up" color="green" /><Icon icon="icons8:arrows-long-down" color="red" /></>;
          case 12:
          return <><Icon icon="icons8:arrows-long-up" color="green" /><Icon icon="icons8:arrows-long-down" color="red" /></>;
     
    }
  }


  const message = [
    {id:1,title:"90' + 13'",message:'Goal Kick Leads',icon:<Icon icon="icon-park-solid:rectangle" color="yellow" />  },
    {id:2,title:"40' + 22'",message:'michael awards free kicks to united',icon:''},
    {id:3,title:"90' + 3'",message:'hsdhfhd jsdjfsdjfsjdf jsdf jsdfjsdjfsj ddjs jsdf',icon:<><Icon icon="icons8:arrows-long-up" color="green" /><Icon icon="icons8:arrows-long-down" color="red" /></> },
    {id:4,title:"2' + 1'",message:'Goal Kick Leads',icon:<Icon icon="openmoji:soccer-ball" color="red" />  },
]
  return (
    <Grid container height="100vh" overflow="auto" alignContent="flex-start">
    {InfoDetailsText && InfoDetailsText.liveTimelines && InfoDetailsText.liveTimelines.length>0 && InfoDetailsText.liveTimelines.map((item,index)=>{
        return(
            <Grid py={1} item xs={12} key={index} container borderBottom="1px solid grey">
                <Grid item container justifyContent="center" xs={3} alignContent="center">
                    <Typography>{`${item.minute}'`}</Typography>
                </Grid>
                <Grid item xs={2} container alignItems="center" justifyContent="flex-end" pr={1}>
                    {manageEvent(item.eventType)}
                </Grid>
               <Grid item xs={7}>
                 <Typography>{item.text}</Typography>
               </Grid>
            </Grid>
        )
    })}
      </Grid>
  );
}
