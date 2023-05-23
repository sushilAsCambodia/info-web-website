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
export default function MatchDetailHeader(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  
  return (
    <>
    <Grid
        item
        xs={12}
        container
        sx={{
          background:
            '-webkit-linear-gradient(rgba(0,0,0, 0.6),rgba(41, 40, 40, 0.8)),url("./assets/Download/bg-download-download.png")',
          // backgroundImage: `url("./assets/Download/bg-download-download.png")`,
          backgroundSize: "cover",
          height: "170px",
        }}
      >
        <Grid color="white" container justifyContent="center">
          <Grid>
            <Typography>English Premier League</Typography>
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <Grid
              item
              xs={2}
              container
              justifyContent="center"
              alignItems="center"
            >
              <img
                width={60}
                alt="Dynamo Vladivostok"
                src={"https://image.pngaaa.com/459/686459-middle.png"}
                style={{ borderRadius: "50px" }}
              />
              <Typography fontWeight="bold">Manchester</Typography>
            </Grid>

            <Grid
              item
              xs={6}
              container
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Typography mx={1} variant="h5">
                0
              </Typography>
              <span style={{ borderColor: "white" }} className="inner-circle">
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
                0
              </Typography>
              <Typography sx={{ position: "absolute", bottom: "5px" }}>
                FT
              </Typography>
            </Grid>

            <Grid
              item
              xs={2}
              container
              justifyContent="center"
              alignItems="center"
            >
              <img
                width={60}
                alt="Dynamo Vladivostok"
                src={
                  "https://yt3.googleusercontent.com/1sL3o7HlNEOn4jV74w7WN-p7ABIbBop9c09QcwKTGcapN3eMvGt-tCDYoA3ErYbtVCHcpVtlcgM=s900-c-k-c0x00ffffff-no-rj"
                }
                style={{ borderRadius: "50px" }}
              />
              <Typography fontWeight="bold">Chelsea</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container px={5} position="absolute" top="250px"></Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center" height="100px" px={1}>
        <Grid item xs={5} className="statsList">
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>6'</li>
            </ul>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>11'</li>
            </ul>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>26'</li>
            </ul>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>45'</li>
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
              <li>65'</li>
            </ul>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography color="grey">jack Harrison</Typography>
            <ul>
              <li>35'</li>
            </ul>
          </Grid>
        </Grid>
      </Grid></>
  );
}
