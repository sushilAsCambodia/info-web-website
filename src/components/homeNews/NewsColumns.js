import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import NewsScrollColumn from "@/common/NewsScrollColumn";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Grid>{children}</Grid>}
    </Grid>
  );
}


export default function NewsColumns(props) {
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
    <Grid container justifyContent="center">
      <Grid item xs={4} marginY="15px" >
        <Divider
          sx={{
            "&::before, &::after": {
              borderColor: "red",
            },
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "system-ui",
          }}
        >
          <Typography variant="h5" paddingX="10px" fontWeight="bold">News</Typography>
          
        </Divider>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} textAlign="center" padding="5px" >
          <NewsScrollColumn/>
        </Grid>
        <Grid item xs={4} textAlign="center" padding="5px" >
          <NewsScrollColumn/>
        </Grid>
        <Grid item xs={4} textAlign="center" padding="5px" >
          <NewsScrollColumn/>
        </Grid>
      </Grid>
    </Grid>
  );
}
