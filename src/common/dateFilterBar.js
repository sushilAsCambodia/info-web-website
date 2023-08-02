import React, { useState, useEffect, forwardRef } from "react";
import Box from "@mui/material/Box";
import {
  Grid,
  Typography,
  FormControl,
  Select,
  InputAdornment,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import utils from "./utils";

import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import moment from "moment/min/moment-with-locales";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { zhCN,enUS,km } from "date-fns/locale";

registerLocale("zhCN", zhCN);
registerLocale("enUS", enUS);
registerLocale("km", km);

export default function DateFilterBar(props) {
  const { setFilterDate, setDateClicked, setDatePicker,competitions,dateSelected,setPage } = props;
  const { i18n } = useTranslation();
  const [startDates, setStartDates] = useState(new Date());
  const [dateFilter, setDateFilter] = useState(
    moment(new Date()).format(utils.letterFormat2)
  );
  const langKey = useSelector(
    (state) => state && state.load_language && state.load_language.language
  );
  let compSet
  if (typeof window != "undefined") {
    compSet = window.localStorage.getItem("setComp"); 
  }
  const lang_id = utils.convertLangCodeToID(i18n.language);
  const [startDate, setStartDate] = useState(new Date());
  const [clickDateFilter, setClickDateFilter] = useState(false);
  useEffect(() => {
   
    
    //localStorage.setItem("setComp",false)
    setDatePicker(startDate);
    setDateClicked(false);
    setClickDateFilter(false);
    setPage(1)
    setFilterDate(moment(new Date()).format(utils.dateFormate));
  }, [startDate]);
  var currenDate = moment(new Date()).format(utils.dateFormate);

  const [selectedDate, setSelectedDate] = useState(null);
  function handleDateChange(date) {
    setSelectedDate(date);
  }

  const dataRangeLastNext = (days) => {
    var result = [];
    for (var i = days; i >= 0; i--) {
      // var d = new Date();
      // d.setDate(d.getDate() - i);
      // result.push({
      //   date:moment(d).format(utils.dateFormate),
      //   day: moment(d).format(utils.dateLetter),
      //   DateMonth: moment(d).format(utils.DateMonthFormat),
      //   ddmmmyyyy:moment(d).format(utils.letterFormat2),
      // });
      result.push({
        date: moment(startDate).subtract(i, "days").format(utils.dateFormate),
        day: moment(startDate).subtract(i, "days").format(utils.dateLetter),
        DateMonth: moment(startDate)
          .subtract(i, "days")
          .format(utils.DateMonthFormat),
        Month: moment(startDate)
          .subtract(i, "days")
          .format(utils.DateMonthFormat4),
        MonthNum: moment(startDate)
          .subtract(i, "days")
          .format(utils.DateMonthFormat5),
        ddmmmyyyy: moment(startDate)
          .subtract(i, "days")
          .format(utils.letterFormat2),
        dChecks: moment(startDate).subtract(i, "days").format("DD"),
      });
    }

    for (var i = 1; i < days + 1; i++) {
      // var d = new Date();
      // d.setDate(d.getDate() + i);
      // result.push({
      //   date:moment(d).format(utils.dateFormate),
      //   day: moment(d).format(utils.dateLetter),
      //   DateMonth: moment(d).format(utils.DateMonthFormat),
      //   ddmmmyyyy:moment(d).format(utils.letterFormat2),
      // });
      result.push({
        date: moment(startDate).add(i, "days").format(utils.dateFormate),
        day: moment(startDate).add(i, "days").format(utils.dateLetter),
        DateMonth: moment(startDate)
          .add(i, "days")
          .format(utils.DateMonthFormat),
        Month: moment(startDate).add(i, "days").format(utils.DateMonthFormat4),
        MonthNum: moment(startDate)
          .add(i, "days")
          .format(utils.DateMonthFormat5),
        ddmmmyyyy: moment(startDate).add(i, "days").format(utils.letterFormat2),
        dChecks: moment(startDate).add(i, "days").format("DD"),
      });
    }

    return result;
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button
      variant="contained"
      style={{
        minWidth: "40px",
        padding: "6px",
        background: "linear-gradient(90deg, #FF0000 0%, #FF6E31 100%)",
        borderRadius: "4px",
      }}
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
    >
      <img
        src="./assets/LiveScore/calendar_month.svg"
        width={"20px"}
        height={"20px"}
        alt="calendar"
      />
    </Button>
  ));

  return (
    <Grid container justifyContent="center" className="weekfilter-sticky">
      <Grid
        item
        container
        xs={10}
        md={10}
        flexWrap="nowrap"
        className=""
        sx={{ overflow: "auto", justifyContent: "space-between" }}
      >
        {dataRangeLastNext(3).map((item, index) => {
          return (
            <Grid
              key={index}
              item
              className={`${
                compSet && (dateSelected)===item.date?"dateSelected":compSet==null && moment(new Date(startDate)).format(utils.dateFormate)===item.date?"dateSelected": ""
              }`}
              onClick={() => {
                setDateFilter(item.ddmmmyyyy),
                  setFilterDate(item.date),
                  setDateClicked(true);
                  setClickDateFilter(true);
                  setStartDate(new Date(item.date));
                  localStorage.removeItem("eventDate",false)
                  localStorage.removeItem("setComp",false)
                  setPage(1)
              }}
              sx={{
                borderRight: "1px solid #ddd",
                whiteSpace: "nowrap",
                cursor: "pointer",
                display: { xs: "", md: "flex" },
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "12px", md: "14px" },
                }}
                px={0.5}
              >
                {langKey && langKey[item.day]}
              </Typography>
              <Typography
                px={0.5}
                sx={{ fontSize: { xs: "12px", md: "14px" } }}
              >
                {langKey && langKey[item.Month]}
                {lang_id == 2 ? "" : " "}
                {item.dChecks}
                
              </Typography>
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs={2} md={2} container textAlign={'center'} className="datePickercss">
        <Grid item>
          {/* <DatePicker
      selected={startDates}
      onChange={(date) => setStartDates(date)}
      customInput={<ExampleCustomInput />}
      // locale={lang_id==1?"enUS":lang_id==2?"zhCN":lang_id==3?"km":"enUS"}

      /> */}
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput />}
            locale={lang_id==1?"enUS":lang_id==2?"zhCN":lang_id==3?"km":"enUS"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
