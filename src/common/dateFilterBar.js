import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import {Grid,Typography,FormControl,Select,InputAdornment,MenuItem,Divider, Button} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import utils from './utils';

import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import moment from 'moment/min/moment-with-locales'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import React, { forwardRef } from 'react'

export default function DateFilterBar(props) {
    const {setFilterDate}=props
    const [dateFilter, setDateFilter] = useState(moment(new Date()).format(utils.letterFormat2));
    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);
    

    useEffect(() => {
      setFilterDate(moment(new Date()).format(utils.dateFormate))
    }, []);


    const [selectedDate, setSelectedDate] = useState(null);
    function handleDateChange(date) {
      setSelectedDate(date);
    }



      const [startDate, setStartDate] = useState(new Date());
      const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <Button variant='contained' style={{ minWidth:'40px', padding:'6px', background :'linear-gradient(90deg, #FF0000 0%, #FF6E31 100%)', borderRadius:'4px'}} className="example-custom-input" onClick={onClick} ref={ref}>
         <img src='./assets/LiveScore/calendar_month.svg' width={'20px'} height={'20px'} alt='calendar'/>
        </Button>
      ));

  return (
    <Grid  container justifyContent="center" className='weekfilter-sticky' >
    <Grid item container xs={10} md={10} flexWrap="nowrap" className='' sx={{ overflow:"auto", justifyContent:'space-between'}}  >
      {utils.dataRangeLastNext(3).map((item, index) => {
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
    <Grid item xs={2} md={2} container  className='datePickercss'>
    <Grid item>
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}

      />
    </Grid>
    </Grid>
 
  </Grid>
  );
}

