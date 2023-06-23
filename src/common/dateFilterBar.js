import * as React from 'react';
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import {Grid,Typography,FormControl,Select,InputAdornment,MenuItem,Divider} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import utils from './utils';

import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import moment from 'moment/min/moment-with-locales'

export default function DateFilterBar(props) {
    const {setFilterDate}=props
    const [dateFilter, setDateFilter] = useState(moment(new Date()).format(utils.letterFormat2));
    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
    

    useEffect(() => {
      setFilterDate(moment(new Date()).format(utils.dateFormate))
    }, []);
  return (
    <Grid container  justifyContent="center" pb={1} >
    <Grid item xs={12} md={12} container flexWrap="nowrap" sx={{ overflow:"auto"}}  >
      {utils.dataRangeLastNext(6).map((item, index) => {
        return (
          <Grid
            key={index}
            item
            className={`${item.ddmmmyyyy === dateFilter ? "dateSelected" : ""}`}
            onClick={() => {
              (setDateFilter(item.ddmmmyyyy),setFilterDate(item.date))
            }}
            sx={{ borderRight: "1px solid #ddd",whiteSpace:'nowrap',cursor:'pointer',display:{xs:'',md:'flex'},alignItems:'center',textAlign:'center'}}
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: {xs:"14px",md:"16px"} }}
              px={0.5}
            >
              {item.day}
            </Typography>
            <Typography px={0.5} sx={{ fontSize: {xs:"14px",md:"16px"} }}>
              {item.DateMonth}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
 
  </Grid>
  );
}

