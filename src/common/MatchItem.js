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

export default function MatchItem(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash == "journal") {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [router.asPath]);

  return (
    <Grid p={1}>
      <Grid textAlign="center" border="1px solid grey" borderRadius="10px">
        <Grid
          borderBottom="1px solid grey"
          item
          xs={12}
          px={1}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Denmark</Typography>
          <Icon icon="ic:round-star" width={20} />
        </Grid>
        <Grid item xs={12} px={1} py={1}>
          <Grid container justifyContent="space-between">
            <Typography>Liverpool</Typography>
            <Typography>chelsea</Typography>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={2} display="flex" justifyContent="space-between">
              <picture>
                <img width="20px" alt="team" src="./assets/Logo/team.png" />{" "}
              </picture>
              <Typography>3</Typography>
            </Grid>
            <Grid item xs={8} container justifyContent="center">
              <Grid container justifyContent="center" alignItems="center" position="relative">
              <Icon icon="bi:dot" width="40px" color="red" style={{position:"absolute",left:"20px"}}/>
                <Typography color="red">Live</Typography>
              </Grid>
              <Typography>First Half 30:22</Typography>
            </Grid>
            <Grid item xs={2} display="flex" justifyContent="space-between">
              <Typography>5</Typography>
              <picture>
                <img width="20px" alt="team" src="./assets/Logo/team.png" />{" "}
              </picture>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          borderTop="1px solid grey"
          borderRadius="0px 0px 10px 10px"
          sx={{ background: "#DDDDDD" }}
          textAlign="left"
          fontSize="13px"
          px={1}
        >
          29 Mar 2023, Wednesday, 03:30 PM
        </Grid>
      </Grid>
    </Grid>
  );
}
