import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import {Grid,Typography,FormControl,Select,InputAdornment,MenuItem,Divider} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import utils from './utils';

import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

export default function dateFilterBar() {
    
    const [dateFilter, setDateFilter] = useState("");
    const [age, setAge] = useState("");


  return (
    <Grid container borderBottom="1px solid #ddd" justifyContent="center" pb={1}>
    <Grid item xs={8} container  flexWrap="nowrap" sx={{ width:'120px', overflow:"auto"}}>
      {utils.LastXDays(6).map((item, index) => {
        return (
          <Grid
            key={index}
            item
            className={`${item.day === dateFilter ? "dateSelected" : ""}`}
            onClick={() => {
              setDateFilter(item.day);
            }}
            sx={{ borderRight: "1px solid #ddd",whiteSpace:'nowrap' }}
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: "12px" }}
              px={0.5}
            >
              {item.day}
            </Typography>
            <Typography px={0.5} sx={{ fontSize: "12px" }}>
              {item.DateMonth}
            </Typography>
            <Divider orientation="vertical" flexItem />
          </Grid>
        );
      })}
    </Grid>
    <Grid
      item
      xs={4}
      display="flex"
      justifyContent="center"
    >
      <FormControl size="small">
        <Select
          value={age}
          onChange={(e) => {
            console.log("select:::", e.target.value);
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{ paddingLeft: "5px", fontSize: "12px" }}
          startAdornment={
            <InputAdornment position="start">
              <Icon icon="material-symbols:calendar-today" width={20} />
            </InputAdornment>
          }
        >
          <MenuItem value="">
            <em>None</em>
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

