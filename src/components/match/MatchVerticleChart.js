import React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import {
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { Image } from "mui-image";
import useMediaQuery from "@mui/material/useMediaQuery";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const matchInfo = [
  {
    id: 1,
    title: "72`",
    icon: <Icon width={25} icon="openmoji:soccer-ball" />,
    playerName: "Rorigo Moren",
    summary: "assist: crysencio uefueh f hsdf ih",
  },
  {
    id: 2,
    title: "65`",
    icon: (
      <>
        <Icon icon="icons8:arrows-long-up" color="green" />
        <Icon icon="icons8:arrows-long-down" color="red" />
      </>
    ),
    playerName: "Rodrigo Moreno",
    summary: "assist: crysencio uefueh bsdjvbsdh",
  },
  {
    id: 3,
    title: "3`",
    icon: "",
    playerName: "Rodrigo Moreno",
    summary: "assist: crysencio",
  },
  {
    id: 4,
    title: "42`",
    icon: (
      <Icon
        color="#ffe94b"
        width={25}
        icon="tabler:rectangle-vertical-filled"
      />
    ),
    playerName: "Rodrigo Moreno",
    summary: "assist: crysencio",
  },
];

export default function MatchVerticleChart(props) {
  const { t } = useTranslation();
  const matches = useMediaQuery("(max-width:768px)");

  const theme = useTheme();
  const router = useRouter();
  const { InfoDetails,lang_id } = props;
  const manageEvent = (eventType) => {
    switch (eventType) {
      case 0:
        return <Icon width={20} icon="openmoji:soccer-ball" />;
      case 1:
        return <Icon width={20} icon="openmoji:soccer-ball" />;
      case 1:
        return <Icon width={20} icon="openmoji:soccer-ball" />;
      case 4:
        return <Icon width={20} icon="openmoji:soccer-ball" />;
      case 5:
        return <img src="/assets/Logo/1200px-Missed_penalty_icon.svg" />;
      case 7:
        return (
          <Icon
            color="#ffe94b"
            width={20}
            icon="tabler:rectangle-vertical-filled"
          />
        );
      case 8:
        return (
          <Icon
            color="#ffe94b"
            width={20}
            icon="tabler:rectangle-vertical-filled"
          />
        );
      case 10:
        return (
          <Icon
            color="#ff0000"
            width={20}
            icon="tabler:rectangle-vertical-filled"
          />
        );
      case 11:
        return (
          <>
            {/* <Icon icon="icons8:arrows-long-up" color="green" />
            <Icon icon="icons8:arrows-long-down" color="red" /> */}
            <img src="/assets/Logo/arrowsvg2.svg" width={'20px'}/>
          </>
        );
      case 12:
        return (
          <>
            {/* <Icon icon="icons8:arrows-long-up" color="green" />
            <Icon icon="icons8:arrows-long-down" color="red" /> */}
            <img src="/assets/Logo/arrowsvg2.svg" width={'20px'} />
          </>
        );
    }
  };
  ///console.log("InfoDetails", InfoDetails);
  const homeTeamId = InfoDetails && InfoDetails.homeTeamId;

  return (
    InfoDetails &&
    InfoDetails.liveTimelines &&
    InfoDetails.liveTimelines.length > 0 &&
    InfoDetails.liveTimelines.map((item, index) => {
      const eventType = item && item.eventType;
      // if (item && item.eventType != 11)
      return !matches ? (
<>
  {/* web screen */}
<div style={{ width: "100%" }} key={index} >
            <div className="timeline">
              <div
                style={{ "--title": `'${item.minute + "`"}'` }}
                className={`${
                  item && item.teamId === homeTeamId ? "left" : "right"
                } container`}
              >
                <div className="content web">
                  <div className="match-icon" style={{ width: "35px" }}>
                    {manageEvent(eventType)}
                  </div>
                  {/* <img src="/assets/Logo/1200px-Missed_penalty_icon.svg" /> */}
                  <h4>{lang_id==2 && item.playerName != null?item.playerName :lang_id==1 ||lang_id==3?item.playerNameEn:  "__"}</h4>
                  <p style={{ fontSize: "10px" }}>
                    {
                       item.relatedPlayerName != null && lang_id==2?item.relatedPlayerName :lang_id==1 ||lang_id==3?item.relatedPlayerNameEn: " "}
                  </p>
                </div>
              </div>
            </div>
          </div>
</>
      ) : (
        <>
          {/* mobile screen */}
<div key={index} >
            <div className="timeline">
              <div
                style={{ "--title": `'${item.minute + "`"}'` }}
                className={`${
                  item && item.teamId === homeTeamId ? "left" : "right"
                } container`}
              >
                <div className="content ">
                  <div className="match-icon" style={{ width: "35px" }}>
                    {manageEvent(eventType)}
                  </div>
                  {/* <img src="/assets/Logo/1200px-Missed_penalty_icon.svg" /> */}
                  <h4>{lang_id==2 && item.playerName != null?item.playerName :lang_id==1 ||lang_id==3?item.playerNameEn:  "__"}</h4>
                  <p style={{ fontSize: "10px" }}>
                    {
                       item.relatedPlayerName != null && lang_id==2?item.relatedPlayerName :lang_id==1 ||lang_id==3?item.relatedPlayerNameEn: " "}
                  </p>
                </div>
              </div>
            </div>
          </div>
</>

        );
    })
  );
}
