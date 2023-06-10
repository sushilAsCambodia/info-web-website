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
    icon: <><Icon icon="icons8:arrows-long-up" color="green" /><Icon icon="icons8:arrows-long-down" color="red" /></>,
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
    icon: <Icon color="#ffe94b" width={25} icon="tabler:rectangle-vertical-filled" />,
    playerName: "Rodrigo Moreno",
    summary: "assist: crysencio",
  },
];

export default function MatchVerticleChart(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  return matchInfo.map((item, index) => {
    return (
      <div style={{width:'100vw'}} key={index}>
         <div className="timeline">
          <div style={{"--title":`'${item.title}'`}} className={`${index%2 == 0 ? "left":"right" } container`}>
            <div className="content">
              <div className="match-icon" style={{width:'35px'}}>{item.icon}</div>
              <h4>{item.playerName}</h4>
              <p>
                {item.summary}
              </p> 
            </div>
          </div>
        </div>
      </div>
    );
  });
}
