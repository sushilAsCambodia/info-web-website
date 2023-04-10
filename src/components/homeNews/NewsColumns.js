import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import FullSilder from "./FullSilder";
import MultiTabs from "./MultiTabs";
import JournalCard from "../homeJournal/JournalCard";
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
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
      <Grid item xs={4}>
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
          News
        </Divider>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} textAlign="center"sx={{  border:"2px dashed red",padding:"5px"
}} >
          news1
        </Grid>
        <Grid item xs={4} textAlign="center">
          news1
        </Grid>
        <Grid item xs={4} textAlign="center">
          news1
        </Grid>
      </Grid>
    </Grid>
  );
}
