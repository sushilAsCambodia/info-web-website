import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import StarIcon from "@/components/svg/star";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Image } from "mui-image";
import useMediaQuery from "@mui/material/useMediaQuery";
import utils from "@/common/utils";
import moment from "moment/min/moment-with-locales";
export default function MatchItem(props) {
  const { details, index,handleAddRemove } = props;
  const { t,i18n } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [value, setValue] = React.useState(false);
  const matches = useMediaQuery("(max-width:768px)");

  // const splitScore = (finalScore) => {
  //   var chunks = finalScore.split(":");
  //   var arr = [chunks.shift().trim(), chunks.join(" ").trim()];
  //   return arr;
  // };

    /*** handle fav */
    const handleFav=(id)=>{
      handleAddRemove(id);
    }

  const splitDates = (fullDate) => {
    var date = fullDate.slice(0, 10).trim();
    var time = fullDate.slice(10+ 1, fullDate.length).trim();
    return {date,time};
  };
  useEffect(() => {}, []);
  const lang_id= utils.convertLangCodeToID(i18n.language)
  const checkFavorite=details && details.match_schedule && details.match_schedule.is_favorite?details.match_schedule.is_favorite:details.is_favorite
  const matchDetail=details && details.match_schedule?details.match_schedule:details
  return (
    <Grid p={1} >
      <Grid textAlign="center" border="1px solid #ddd" borderRadius="10px" >
        <Grid
          borderBottom="1px solid #ddd"
          item
          xs={12}
          px={1}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="#8C8C8C">
          {lang_id==1?matchDetail?.competition?.nameEn:lang_id==2?matchDetail?.competition?.name:matchDetail?.competition?.nameEn}
          {/* {lang_id==2?details?.match_schedule?.competition?.name:details?.match_schedule?.competition?.nameEn}    */}
          </Typography>    

{checkFavorite ? (
                            <IconButton onClick={()=>handleFav(details.matchId)}>
                              {" "}
                              <Icon
                                icon="clarity:star-solid" color="yellow" width="20"
                              />
                            </IconButton>
                          ) : (
                            <IconButton onClick={()=>handleFav(details.matchId)}>
                              {" "}
                              <Icon icon="clarity:star-solid" color="#ddd" width="20" />
                            </IconButton>
                          )}
         
        </Grid>
        <Grid
          item
          xs={12}
          px={1}
          py={1}
          onClick={() => {
            matches
              ? router.push(`/MatchDetails/${details.matchId}?status=${details.elapsed}`)
              : router.push("/liveScorePage");
          }}
        >
          <Grid container justifyContent="space-between">
            <Typography>{details.home_team && lang_id==1?details.home_team && details.home_team.nameEn:details.home_team && lang_id==2?details.home_team && details.home_team.nameFull:details.home_team && lang_id==3?details.home_team && details.home_team.nameEnFull:''}</Typography>
            <Typography>  {details.away_team && lang_id==1?details.away_team && details.away_team.nameEn:details.away_team && lang_id==2?details.away_team && details.away_team.nameFull:details.away_team && lang_id==3?details.away_team && details.away_team.nameEnFull:''}</Typography>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={2}>
              <Grid display="flex" justifyContent="space-between" marginTop={1}>
                <Grid position="relative" container>
                  {/* <Grid
                    sx={{
                      background: "#FFE0D2",
                      color: "#FFE0D2",
                      minWidth: "20px",
                      position: "absolute",
                      left: "-8px",
                    }}
                  >&nbsp;
                  </Grid> */}
                  {details && details.home_team && details.home_team.image?
                  <Image width="20px" alt="team" src={details && details.home_team && details.home_team.image} />
                  :<Image width="20px" alt="team" src="./assets/Logo/team.png" />}{" "}
                </Grid>
                <Typography>
                  {/* {splitScore(details.finalScore)[0]} */}
                  </Typography>
              </Grid>
            </Grid>
            <Grid item xs={8} container justifyContent="center">
              <Grid container justifyContent="center">
                <Grid item md={12}>
               {details.elapsed &&   <Typography
                    component="div"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="#00C2FF"
                    fontSize={10}
                  >
                    <FiberManualRecordIcon style={{ fontSize: 9 }} />
                    &nbsp; {details.elapsed?"LIVE":''}
                  </Typography>}
                  <Typography fontSize={8}>
                  {details && details.finalScore?details.finalScore:details && details.match_schedule && details.match_schedule.finalScore}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Grid display="flex" justifyContent="space-between" marginTop={1}>
                <Typography>
                  {/* {splitScore(details.finalScore)[1]} */}
                </Typography>
                <Grid position="relative" container justifyContent="flex-end">
                {details && details.away_team && details.away_team.image?
                  <Image width="20px" alt="team" src={details && details.away_team && details.away_team.image} />
                  :<Image width="20px" alt="team" src="./assets/Logo/team.png" />}{" "}
                  {/* <Grid
                    sx={{
                      background: "#FFE0D2",
                      color: "#FFE0D2",
                      minWidth: "20px",
                      position: "absolute",
                      right: "-8px",
                    }}
                  >
                    &nbsp;
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          borderTop="1px solid #ddd"
          borderRadius="0px 0px 10px 10px"
          sx={{ background: "#DDDDDD", padding: "8px", color: "#8C8C8C" }}
          textAlign="left"
          fontSize="10px"
        >
         {moment(details.startTime).format('HH:mm')}

        </Grid>
      </Grid>
    </Grid>
  );
}
