import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import {Grid,Typography,FormControl,Select,InputAdornment,MenuItem,Divider} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import utils from './utils';

import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

export default function DateFilterBar() {
    
    const [dateFilter, setDateFilter] = useState("");
    const [age, setAge] = useState("");


  return (
    <Grid container  justifyContent="center" pb={1} >
    <Grid item xs={10} md={10} container flexWrap="nowrap" sx={{  overflow:"auto"}}  >
      {utils.LastXDays(7).map((item, index) => {
        return (
          <Grid
            key={index}
            item
            className={`${item.day === dateFilter ? "dateSelected" : ""}`}
            onClick={() => {
              setDateFilter(item.day);
            }}
            sx={{ borderRight: "1px solid #ddd",whiteSpace:'nowrap',cursor:'pointer',display:{xs:'',md:'flex'},alignItems:'center' }}
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: {xs:"12px",md:"14px"} }}
              px={0.5}
            >
              {item.day}
            </Typography>
            <Typography px={0.5} sx={{ fontSize: {xs:"12px",md:"14px"} }}>
              {item.DateMonth}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
    <Grid
      item
      xs={2} md={2}
      display="flex"
      justifyContent="center"
    >
      <FormControl size="small" fullWidth>
        <Select
          value={age}
          onChange={(e) => {
            console.log("select:::", e.target.value);
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
            <em>Date</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */}
      </FormControl>
    </Grid>
  </Grid>
  );
}

