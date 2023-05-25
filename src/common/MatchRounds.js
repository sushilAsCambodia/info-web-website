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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Image } from "mui-image";
export default function MatchRounds(props) {
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
    <Grid p={1} onClick={() => router.push("/MatchDetails")}>
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
          <Typography color="#8C8C8C" >
            Denmark
          </Typography>
          <Icon icon="clarity:star-solid" color="#ddd" width="20"/>
        </Grid>
        <Grid item xs={12} container>
          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="center"
            sx={{ borderRight: "1px solid #ddd" }}
            p={1}
          >
            <Typography variant="body2">29 Mar 2023</Typography>
            <Typography variant="body2">03:45 PM</Typography>
          </Grid>
          <Grid item xs={8} container className="roundChart">
            <Grid item xs={5}>
              <Grid container alignItems="center" flexWrap="nowrap">
                {" "}
                <Image
                  width="40px"
                  height="40px"
                  src="https://static.vecteezy.com/system/resources/thumbnails/003/686/552/small/soccer-logo-america-logo-classic-logo-free-vector.jpg"
                />
                <Typography>Valencia</Typography>
              </Grid>
              <Grid container alignItems="center" flexWrap="nowrap">
                <Image
                  width="40px"
                  height="40px"
                  src="https://static.vecteezy.com/system/resources/thumbnails/003/686/552/small/soccer-logo-america-logo-classic-logo-free-vector.jpg"
                />
                <Typography>Bei Hongxing</Typography>
              </Grid>
            </Grid>
            <Grid item xs={7} container justifyContent="space-between">
              <Grid>
                <Typography>21</Typography>
                <Typography>20</Typography>
                <Typography>1st</Typography>
              </Grid>
              <Grid>
                <Typography>21</Typography>
                <Typography>20</Typography>
                <Typography>1st</Typography>
              </Grid>
              <Grid>
                <Typography>21</Typography>
                <Typography>20</Typography>
                <Typography>1st</Typography>
              </Grid>
              <Grid color="red">
                <Typography>21</Typography>
                <Typography>20</Typography>
                <Typography fontWeight="bold">Total</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
