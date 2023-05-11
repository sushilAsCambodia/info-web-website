import React from "react";
import PropTypes from "prop-types";
import { Typography, Chip } from "@mui/material";
import { Grid, Card, CardHeader,Collapse } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import { Icon } from "@iconify/react";
import MatchLiveScroll from "./MatchLiveScroll";

export default function ChatScrollCollapse(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
     <Grid border="1px solid #ddd" mt={1}>
          <Grid component={Card} container p={1} elevation={3}>
            <Grid container alignItems="center">
              {expanded ? (
                <Icon
                  icon="mdi:horizontal-line"
                  color="#F24E1E"
                  height="30px"
                  onClick={handleExpandClick}
                />
              ) : (
                <Icon
                  icon="ic:baseline-plus"
                  color="#F24E1E"
                  height="30px"
                  onClick={handleExpandClick}
                />
              )}
              <Typography>{ langKey && langKey.dynamic}</Typography>
            </Grid>
          </Grid>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid height="500px" overflow="auto">
              {[
                {
                  id: 1,
                  title: "Russian Basketball Super League",
                  card: { img: "./assets/LiveScore/basketballcard.png" },
                },
                {
                  id: 2,
                  title: "Russian Basketball Super League 20:00",
                  card: null,
                },
                { id: 3, title: "Latin Basketball Super League", card: null },
                {
                  id: 4,
                  title: "Asia Basketball Super League",
                  card: { img: "./assets/LiveScore/basketballcard.png" },
                },
                {
                  id: 5,
                  title: "Eroupean Basketball Super League",
                  card: null,
                },
              ].map((item, index) => {
                return (
                  <Grid key={index}>
                    <MatchLiveScroll item={item} />
                  </Grid>
                );
              })}
            </Grid>
          </Collapse>
        </Grid>
    </>
  );
}
