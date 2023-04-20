import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import moment from "moment/moment";
export default function JournalItem(props) {
  const {item={}, setOpen, setAlbumId} = props;  
  return (
    <>
      <Grid
        onClick={() => {setOpen(true);setAlbumId(item.id)}}
        sx={{
          margin: "5px",
          borderRadius: "10px",
        //   paddingX:"5px"
        }}
      >
        <Grid
          style={{
            color: "white",
            textAlign: "left",
            height: "120px",
            paddingX: "5px",
            border: "1px solid grey",
            borderRadius: "5px",
          }}
          container
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item xs={6} padding="5px" >
            <img
              src={item.cover_img}
              style={{
                minWidth: "100px",
                maxHeight: "80px",
                border: "5px solid #FFE0E0",
                borderRadius: "5px",
              }}
            />
          </Grid>
          <Grid item xs={6} display="flex" alignItems="center">
            <Grid display="flex" flexDirection="column">
                <Typography color="black" fontWeight="bold" fontSize="15px" className="singleLinesEllips">
                  {item.album_name}
                </Typography>
                <Grid display="flex">
                  <Icon icon="ic:outline-calendar-today" color="grey" />
                  <Typography color="grey" fontSize="12px" ml={1}>
                    {" "}
                    {moment(item.issue_date).format('yyyy')}
                  </Typography>
                </Grid>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(90deg, #FF0000 0%, #FF6F31 100%)",
                    paddingX: "10px",
                    fontSize: "8px",
                    color: "white",
                    borderRadius: "50px",
                    whiteSpace: "nowrap",
                    marginTop:"10px"
                  }}
                >
                  Latest Issue {item.issue||''}
                </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
