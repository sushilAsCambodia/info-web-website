import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import {
  Typography,
  Divider,
  FormControl,
  Select,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Image } from "mui-image";
import moment from "moment/moment";
import utils from "@/common/utils";
import MatchItem from "@/common/MatchItem";
import MatchRounds from "@/common/MatchRounds";
import DateFilterBar2 from "@/common/DateFilterBar2";
export default function FavouritePage(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const [dateFilter, setDateFilter] = useState("");
  const [age, setAge] = useState("");

  return (
    <Grid style={{ position: "relative" }}>
      <Grid
        item
        xs={12}
        style={{
          padding: 10,
          position: "absolute",
          top: 50,
          width: "100%",
        }}
      >
        <DateFilterBar2 />
        <Grid pt={1} textAlign="center">
          {" "}
          <Image
            alt="not_found_2"
            style={{ width: "90%" }}
            src="./assets/not-found.png"
          />
          <Typography>No Data Found</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
