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
import utils from "@/common/utils";
import StarIcon from "@/components/svg/star";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Image } from "mui-image";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function MatchDetailHeader(props) {
  const { t,i18n } = useTranslation();
  const {status}=props
  const {details}=props
  const theme = useTheme();
  const router = useRouter();
  const lang_id= utils.convertLangCodeToID(i18n.language)
  const matches = useMediaQuery("(max-width:768px)");

  let score=details && details.match && details.match.finalScore
  const myScore = score  && score.split(":");

  return !matches ? (
    <>
  {/* web screen */}
    <Grid
        item
        xs={12}
        container
        sx={{
          background:
            '-webkit-linear-gradient(rgba(0,0,0, 0.6),rgba(41, 40, 40, 0.8)),url("/assets/Download/bg-download-download.png")',
          // backgroundImage: `url("/assets/Download/bg-download-download.png")`,
          backgroundSize: "cover",
          height: "300px",
        }}
      >
        <Grid color="white" container justifyContent="center">
          <Grid pt={2}>
            <Typography>{lang_id==2?details && details.match && details.match.competition && details.match.competition.name:details && details.match && details.match.competition && details.match.competition.nameEn}</Typography>
          </Grid>
          <Grid container item xs={12} justifyContent="center" alignItems="start" px={1}>
            <Grid
              item
              xs={3}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Image
                alt="Dynamo Vladivostok"
                src={details && details.match && details.match.home_team && details.match.home_team.image}
                style={{ height:'80px',width:'80px' }}
              />
              <Typography fontWeight="bold">{lang_id==2?details && details.match && details.match.home_team && details.match.home_team.name
:details && details.match && details.match.home_team && details.match.home_team.nameEn}</Typography>
            </Grid>

            <Grid
              item
              xs={6}
              container
              justifyContent="center"
              alignItems="stretch"
              position="relative"
            >
              <Grid container       alignItems="center"        justifyContent="center"
>
                <Typography mx={1} variant="h5">
                  {myScore && myScore[0]}
                </Typography>
                <span style={{ borderColor: "white",marginTop:'10px' }} className="inner-circle">
                  <Grid
                    width={40}
                    height={40}
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      background: "white",
                      borderRadius: "50px",
                      position: "absolute",
                      top: "3px",
                      left: "3px",
                    }}
                  >
                    <Typography sx={{ color: "red", fontWeight: "bold" }}>
                      VS
                    </Typography>
                  </Grid>
                </span>
                <Typography mx={1} variant="h5">
                {myScore && myScore[1]}
                </Typography>
                <Typography sx={{ position: "absolute", bottom: "-30px", }}>
                  {status=='undefined'?"FT":status}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              xs={3}
              container
              justifyContent="center"
              alignItems="center"
            >              <Image
                alt="Dynamo Vladivostok"
                src={
                  details && details.match && details.match.away_team
&& details.match.away_team
.image
                }
                style={{ height:'80px',width:'80px' }}
              />
              <Typography fontWeight="bold">{lang_id==2?details &&  details.match && details.match.away_team
   && details.match.away_team
 .name
:details && details.match && details.match.away_team
&& details.match.away_team
.nameEn}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container px={5} position="absolute" top="250px"></Grid>
      </Grid>
      {/* <Grid item xs={12} container alignItems="center" height="100px" px={1}>
        <Grid item xs={5} className="statsList">
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>6</li>
            </ul>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>11</li>
            </ul>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>26</li>
            </ul>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>45</li>
            </ul>
          </Grid>
        </Grid>
        <Grid item xs={2} px={1}>
          <Divider
            id="ballDivider"
            sx={{
              "&::before, &::after": {
                borderColor: "#ddd",
              },
              fontWeight: "bold",
              textTransform: "uppercase",
              fontFamily: "system-ui",
            }}
          >
            <Icon width={25} icon="openmoji:soccer-ball" />
          </Divider>
        </Grid>
        <Grid
          container
          item
          xs={5}
          alignItems="center"
          justifyContent="space-between"
          className="statsList"
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>65</li>
            </ul>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>35</li>
            </ul>
          </Grid>
        </Grid>
      </Grid> */}
    </>

) : (
  <>
  {/* mobile screen */}

  <Grid
      item
      xs={12}
      container
      sx={{
        background:
          '-webkit-linear-gradient(rgba(0,0,0, 0.6),rgba(41, 40, 40, 0.8)),url("/assets/Download/bg-download-download.png")',
        // backgroundImage: `url("/assets/Download/bg-download-download.png")`,
        backgroundSize: "cover",
        height: "170px",
      }}
    >
      <Grid color="white" container justifyContent="center">
        <Grid pt={2}>
          <Typography>{lang_id==2?details && details.match && details.match.competition && details.match.competition.name:details && details.match && details.match.competition && details.match.competition.nameEn}</Typography>
        </Grid>
        <Grid container item xs={12} justifyContent="center" alignItems="start" px={1}>
          <Grid
            item
            xs={3}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Image
              alt="Dynamo Vladivostok"
              src={details && details.match && details.match.home_team && details.match.home_team.image}
              style={{ height:'80px',width:'80px' }}
            />
            <Typography fontWeight="bold">{lang_id==2?details && details.match && details.match.home_team && details.match.home_team.name
:details && details.match && details.match.home_team && details.match.home_team.nameEn}</Typography>
          </Grid>

          <Grid
            item
            xs={6}
            container
            justifyContent="center"
            alignItems="stretch"
            position="relative"
          >
            <Grid container       alignItems="center"        justifyContent="center"
>
              <Typography mx={1} variant="h5">
                {myScore && myScore[0]}
              </Typography>
              <span style={{ borderColor: "white",marginTop:'10px' }} className="inner-circle">
                <Grid
                  width={40}
                  height={40}
                  container
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    background: "white",
                    borderRadius: "50px",
                    position: "absolute",
                    top: "3px",
                    left: "3px",
                  }}
                >
                  <Typography sx={{ color: "red", fontWeight: "bold" }}>
                    VS
                  </Typography>
                </Grid>
              </span>
              <Typography mx={1} variant="h5">
              {myScore && myScore[1]}
              </Typography>
              <Typography sx={{ position: "absolute", bottom: "-30px", }}>
                {status=='undefined'?"FT":status}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            xs={3}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Image
              alt="Dynamo Vladivostok"
              src={
                details && details.match && details.match.away_team
&& details.match.away_team
.image
              }
              style={{ height:'80px',width:'80px' }}
            />
            <Typography fontWeight="bold">{lang_id==2?details &&  details.match && details.match.away_team
 && details.match.away_team
.name
:details && details.match && details.match.away_team
&& details.match.away_team
.nameEn}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container px={5} position="absolute" top="250px"></Grid>
    </Grid>
    {/* <Grid item xs={12} container alignItems="center" height="100px" px={1}>
      <Grid item xs={5} className="statsList">
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography color="grey">jack Harrison</Typography>
          <ul>
            <li>6</li>
          </ul>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography color="grey">jack Harrison</Typography>
          <ul>
            <li>11</li>
          </ul>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography color="grey">jack Harrison</Typography>
          <ul>
            <li>26</li>
          </ul>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography color="grey">jack Harrison</Typography>
          <ul>
            <li>45</li>
          </ul>
        </Grid>
      </Grid>
      <Grid item xs={2} px={1}>
        <Divider
          id="ballDivider"
          sx={{
            "&::before, &::after": {
              borderColor: "#ddd",
            },
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "system-ui",
          }}
        >
          <Icon width={25} icon="openmoji:soccer-ball" />
        </Divider>
      </Grid>
      <Grid
        container
        item
        xs={5}
        alignItems="center"
        justifyContent="space-between"
        className="statsList"
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography color="grey">jack Harrison</Typography>
          <ul>
            <li>65</li>
          </ul>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography color="grey">jack Harrison</Typography>
          <ul>
            <li>35</li>
          </ul>
        </Grid>
      </Grid>
    </Grid> */}
  </>
  );
}
