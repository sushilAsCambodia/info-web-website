import React from "react";
import PropTypes from "prop-types";
import { Typography, Chip } from "@mui/material";
import { Grid, Card, CardHeader } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Image } from "mui-image";



export default function ChipDataFilter(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [selectedChip, setSelectedChip] = useState('comm');

  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

console.log(langKey.no_data_found , "xxxxxxxxxxxxxxxx")

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
              <Chip className={`${selectedChip == 'comm' ? "filterTabSelected":"" }`} label={langKey && langKey.commentary} onClick={()=>{setSelectedChip('comm')}} />
            </Grid>
            <Grid item p={1}>
            <Chip className={`${selectedChip == 'data' ? "filterTabSelected":"" }`} label={langKey && langKey.data_analysis}  onClick={()=>{setSelectedChip('data')}} />
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign="center" position="relative">
            <Image alt="not_found_2" style={{ width: "60%" }} src="./assets/not-found_2.png" />
            <Grid position="absolute" bottom="20%" left="45%">
              <Typography>{langKey && langKey.no_data_found}</Typography>
            </Grid>
          </Grid>
       </Grid>
    </>
  );
}
