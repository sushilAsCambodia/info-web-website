import React from "react";
import PropTypes from "prop-types";
import { Typography, Chip } from "@mui/material";
import { Grid, Card, CardHeader } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import { Icon } from "@iconify/react";
import MatchLiveScroll from "./MatchLiveScroll";

export default function ChatScroll(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [selectedChip, setSelectedChip] = useState('comm');

  return (
    <>
      <Grid border="1px solid #ddd">
          <Grid component={Card} container p={1} elevation={3} height="60px">
            <Grid
              item
              xs={8}
              container
              flexWrap="nowrap"
              justifyContent="space-between"
              overflow="scroll"
              className="chipScroll customScroller"
            >
              <Chip
                sx={{ marginRight: "5px" }}
                label="success"
                color="success"
                variant="outlined"
              />
              <Chip
                sx={{ marginRight: "5px" }}
                label="success"
                color="success"
                variant="outlined"
              />
              <Chip
                sx={{ marginRight: "5px" }}
                label="success"
                color="success"
                variant="outlined"
              />
              <Chip
                sx={{ marginRight: "5px" }}
                label="success"
                color="success"
                variant="outlined"
              />
            </Grid>
            <Grid
              container
              item
              xs={4}
              pt={1}
              justifyContent="flex-end"
              alignContent="flex-start"
            >
              <Icon icon="ph:user" />
              <Typography marginLeft="5px">8383737</Typography>
            </Grid>
          </Grid>
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
              { id: 5, title: "Eroupean Basketball Super League", card: null },
            ].map((item, index) => {
              return (
                <Grid key={index}>
                  <MatchLiveScroll item={item} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
    </>
  );
}
