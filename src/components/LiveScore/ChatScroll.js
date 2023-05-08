import React from "react";
import PropTypes from "prop-types";
import { Typography, Chip } from "@mui/material";
import { Grid, Card, CardHeader } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";



export default function ChipDataFilter(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [selectedChip, setSelectedChip] = useState('comm');

  return (
    <>
      <Grid container border="1px solid #ddd" mt={1}>
          <Grid
            item
            container
            xs={12}
            // pb={1}
            borderBottom="1px solid #ddd"
          >
            <Grid item p={1} >
              <Chip className={`${selectedChip == 'comm' ? "filterTabSelected":"" }`} label="commentary" onClick={()=>{setSelectedChip('comm')}} />
            </Grid>
            <Grid item p={1}>
            <Chip className={`${selectedChip == 'data' ? "filterTabSelected":"" }`} label="Data Analysis" onClick={()=>{setSelectedChip('data')}} />
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign="center" position="relative">
            <img style={{ width: "60%" }} src="./assets/not-found_2.png" />
            <Grid position="absolute" bottom="20%" left="45%">
              <Typography>No Data Found</Typography>
            </Grid>
          </Grid>
       </Grid>
    </>
  );
}
