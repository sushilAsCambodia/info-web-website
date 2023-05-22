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
      <Grid textAlign="center" border="1px solid #ddd" borderRadius="10px">
        <Grid
          borderBottom="1px solid #ddd"
          item
          xs={12}
          px={1}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="#8C8C8C" fontSize={12}>Denmark</Typography>
          <StarIcon/>
        </Grid>
        <Grid item xs={12} px={1} py={1}>
          <Grid container justifyContent="space-between">
            <Typography>Liverpool</Typography>
            <Typography>chelsea</Typography>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={2}>
              <Typography component="div" display="flex" justifyContent="space-between" marginTop={1}>
                <Image width="20px" alt="team" src="./assets/Logo/team.png" />{" "}
                <Typography>3</Typography>
              </Typography>
            </Grid>
            <Grid item xs={8} container justifyContent="center">
              <Grid container>
                <Grid item md={12}>
                  <Typography component="div" display="flex" justifyContent="center" alignItems="center" color="#00C2FF" fontSize={10}>
                    <FiberManualRecordIcon style={{fontSize:9}}/>&nbsp;LIVE
                  </Typography>
                  <Typography fontSize={8}>First Half 30:22</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Typography component="div" display="flex" justifyContent="space-between" marginTop={1}>
                <Typography>5</Typography>
                <Image width="20px" alt="team" src="./assets/Logo/team.png" />{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          borderTop="1px solid #ddd"
          borderRadius="0px 0px 10px 10px"
          sx={{ background: "#DDDDDD",padding:'8px', color:'#8C8C8C'}}
          textAlign="left"
          fontSize="10px"
        >
          29 Mar 2023, Wednesday, 03:30 PM
        </Grid>
      </Grid>
    </Grid>
  );
}
