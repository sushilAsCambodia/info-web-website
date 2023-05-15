import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Typography,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  Dialog,
  OutlinedInput,
  Divider,
} from "@mui/material";
import Router from "next/router";
import { useSelector } from "react-redux";
export default function AnnouncementItem(props) {
    const {read} = props
    const langKey = useSelector((state) => state && state.load_language && state.load_language.language);

  return (
    <>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="center"
        padding="0px 16px"
        style={{ opacity:  `${read ? "0.5" : "1"}`}}
      >
        <Grid
          item
          xs={12}
          container
          alignContent="flex-start"
          alignItems="center"
          overflow="auto"
        >
          <Grid item xs={12} my={1}>
            <Grid
              item
              xs={12}
              sx={{ padding: "12px", borderRadius: "5px" }}
              border={read ? "1px solid grey" : "1px solid red"}
              position="relative"
            >
              <Grid
                style={{
                  height: "20px",
                  position: "absolute",
                  top: "10px",
                  right: "0px",
                }}
              >
                <Icon icon="bi:dot" width="40px" color={read ? "grey" : "red"} />
              </Grid>
              <ListItemText
                primary={
                  <Typography fontWeight="bold">{langKey && langKey.system_announcement}</Typography>
                }
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="#8C8C8C"
                  >
                    15 March 2023, 00:00:00
                  </Typography>
                }
              />

              <Grid item>
                <Typography variant="body2">
                  A lucky female winner from Taman Dahlia, Cheras, won Magnum
                  Life Grand Prize with RM1,000 every day for 20 years.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
