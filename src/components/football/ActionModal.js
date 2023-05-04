import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Button, Link, Checkbox } from "@mui/material";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getNewsByCategory } from "@/store/actions/newsActions";
import { Icon } from "@iconify/react";

export default function ActionModal(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { catId = [], lang_id = [] } = props;
  const dispatch = useDispatch();

  return (
    <>
      <Grid
        container
        position="relative"
        alignContent="space-between"
        sx={{ height: "300px", overflowY: "auto" }}
      >
        <Grid item xs={12} container p={1}>
          {[
            "MLS",
            "Mexico Union",
            "A-League",
            "Indo Super League",
            "Iraq United",
            "XU17",
            "Bao Chao",
          ].map((item, index) => {
            return (
              <Grid item xs={4} p={1} position="relative">
                <Grid
                  sx={{
                    background: "#F3F3F3",
                    border: "1px solid #DDDDDD",

                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox />
                  <Typography>{item}</Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          xs={12}
          sx={{
            position: "sticky",
            bottom: "0",
            borderTop: "1px solid #DDDDDD",
            background: "white",
          }}
        >
          <Grid item xs={4} sx={{ borderRight: "1px solid #DDDDDD",pl:"5px" }}>
            <Checkbox />
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            alignItems="center"
            sx={{ borderRight: "1px solid #DDDDDD",pl:"5px" }}
          >
            <Icon icon="entypo:cycle" width={30} color="#0009" />
          </Grid>
          <Grid item xs={4} display="flex" alignItems="center" pl="5px">
            <Icon icon="solar:close-circle-outline" width={30} color="#0009" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
