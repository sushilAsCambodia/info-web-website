import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import moment from "moment";
import {Grid,Typography,FormControl,Select,InputAdornment,MenuItem,Divider} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import utils from './utils';

import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

export default function ScheculeDateFilterBar({fiterByDate,day}) {
    
    const [dateFilter, setDateFilter] = useState(moment().format("ddd"));
    const [days, setDays] = useState("Ten");
  
    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
    var d = new Date();
    const datecheck= moment(d).format('DD')


  return (
    <Grid container  justifyContent="center" pb={1} >
    <Grid item xs={11} md={11} container flexWrap="nowrap" sx={{  overflow:"auto"}}  >
      {utils.NextDays(7).map((item, index) => {
        let month=item.Month
        return (
          <Grid
            key={index}
            item
            className={`${item.day === dateFilter ? "dateSelected" : ""}`}
            onClick={() => {
              fiterByDate(item.date);
              setDateFilter(item.day);
            }}
            sx={{ borderRight: "1px solid #ddd",whiteSpace:'nowrap',cursor:'pointer',display:{xs:'',md:'block', textAlign:"center", padding:"0px 25px",}, textTransform:"uppercase" ,alignItems:'center' }}
          >           
            <Typography
              sx={{  fontSize: {xs:"13px",md:"15px"} }}
              px={0.75}
            >
              {item.dChecks!==datecheck && langKey && langKey[item.day]}
            </Typography>
            <Typography px={0.75} sx={{ fontSize: {xs:"13px",md:"15px"} }}>
              {item.dChecks==datecheck?langKey && langKey.todays: ''}
            </Typography>
            <Typography
              sx={{  fontSize: {xs:"13px",md:"15px"} }}
              px={0.75}
            >
              {item.DateMonth } {langKey && langKey[month]}
            </Typography>
            
          </Grid>
        );
      })}
    </Grid>
    <Grid
      item
      xs={1} md={1}
      display="flex"
      justifyContent="center"
    >
      <FormControl size="small" fullWidth>
        {/* <Select
          value={days}
          onChange={(e) => {
            day(e.target.value);setDays(e.target.value)
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{ paddingLeft: "5px", fontSize: {xs:"12px",md:"14px"} }}
          startAdornment={
            <InputAdornment position="start">
              <Icon icon="material-symbols:calendar-today" width={20} />
            </InputAdornment>
          }
        >
          <MenuItem value="">
            <em>   {langKey && langKey.date}</em>
          </MenuItem>
          <MenuItem value="Ten">Ten</MenuItem>
          <MenuItem value="Twenty">Twenty</MenuItem>
          <MenuItem value="Thirty">Thirty</MenuItem>
        </Select> */}
       
      </FormControl>
    </Grid>
  </Grid>
  );
}

