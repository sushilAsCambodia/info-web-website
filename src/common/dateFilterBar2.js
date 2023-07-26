import * as React from "react";
import { useState,useEffect,forwardRef } from 'react';
import Box from "@mui/material/Box";
import {
  Grid,
  Typography,
  FormControl,
  Select,
  InputAdornment,
  MenuItem,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import utils from "./utils";

import { useTranslation } from "react-i18next";
import moment from 'moment/min/moment-with-locales'
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function DateFilterBar2(props) {
  const dispatch = useDispatch();
  const {setFilterDate,setDateClicked}=props
  const [dateFilter, setDateFilter] = useState(moment(new Date()).format(utils.dateFormate));
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const handleChange = (event) => {

    setDate(event.target.value);
  };
  useEffect(() => {
    setFilterDate(moment(startDate).format(utils.dateFormate))
    setDateClicked(true)
  }, [startDate]);


 
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      // <button type="input" className="example-custom-input" onClick={onClick} ref={ref}>
      //   {value}
      // </button>
    
      <Button variant='contained' className="example-custom-input" onClick={onClick} ref={ref} style={{color:'#fff', minWidth:'40px', padding:'6px', background :'linear-gradient(90deg, #FF0000 0%, #FF6E31 100%)', borderRadius:'4px'}}>

<div style={{paddingTop:'4px'}}>  {value}</div>
   <img src='./assets/LiveScore/calendar_month.svg' width={'25px'} height={'25px'} alt='calendar'/>  

     </Button>
    ));



  return (
    <Grid
      container
      borderBottom="1px solid #ddd"
      justifyContent="center"
      pb={1}
    >
      <Grid container >
        <Grid item xs={6} textAlign="left">
        <Grid item xs={6} md={8}style={{width:"100px"}} container  className='datePickercss'>
    <Grid item style={{width:"80px"}} className="calenderIcon">
    {/* <DatePicker
      selected={startDates}
      onChange={(date) => setStartDates(date)}
      customInput={<ExampleCustomInput />}
      // locale={lang_id==1?"enUS":lang_id==2?"zhCN":lang_id==3?"km":"enUS"}

      /> */}
       <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
    </Grid>
    </Grid>
        {/* <FormControl size="small" fullWidth>
          <Select
            value={date}
            onChange={handleChange}
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
              <Typography>None</Typography>
            </MenuItem>
            {utils.LastXDays(6).map((item, index) => {
              return (
                  <MenuItem key={index} value={item.ddmmmyyyy}>
                    <Typography>{item.ddmmmyyyy}</Typography>
                  </MenuItem>
              );
            })}
          </Select>
          {/* <FormHelperText>Without label</FormHelperText> */}
        {/* </FormControl> */} 
        </Grid>
        {/* <Grid item xs={6} textAlign="right">
          <Button
            size="small"
            variant="outlined"
            sx={{
              color: "#8C8C8C",
              height:'100%'
            }}
          >
            <Grid
              component="span"
              sx={{
                whiteSpace: "nowrap",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
              }}
            >
              <Icon icon="mdi:filter" width={20} />
              &nbsp; Filter
            </Grid>
          </Button>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
