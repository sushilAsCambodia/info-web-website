import * as React from "react";
import { useState } from "react";
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
import { Icon } from "@iconify/react";

export default function DateFilterBar2() {
  const [dateFilter, setDateFilter] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (event) => {
    console.log(":::setdate",event.target.value)
    setDate(event.target.value);
  };
  return (
    <Grid
      container
      borderBottom="1px solid #ddd"
      justifyContent="center"
      pb={1}
    >
      <Grid container justifyContent="center">
        <Grid item xs={6}>
        <FormControl size="small" fullWidth>
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
        </FormControl>
        </Grid>
        <Grid item xs={6} textAlign="right">
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
        </Grid>
      </Grid>
    </Grid>
  );
}
