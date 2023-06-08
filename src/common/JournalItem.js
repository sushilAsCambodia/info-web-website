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
import { useSelector } from "react-redux";
export default function JournalItem(props) {
  const {item={}, setOpen, setAlbumId} = props;  


  const langKey = useSelector((state) => state && state.load_language && state.load_language.language);


  return (
    <>
      <Grid
      
        sx={{
          margin: "5px",
          borderRadius: "10px"
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
          <Grid item xs={7} padding="5px" textAlign="center"   onClick={() => {setOpen(true);setAlbumId(item.id)}}>
          <picture>
            <img
              src={item.cover_img}
              alt="image"
              draggable="false"
              style={{
                width: "100%",
                height: "100px",
                border: "5px solid #FFE0E0",
                borderRadius: "5px",
                objectFit:'contain',
                cursor:"pointer"
              }}
            />
          </picture>
          </Grid>
          <Grid item xs={5} display="flex" alignItems="center" justifyContent="center">
            <Grid display="flex" flexDirection="column" alignItems="flex-start">
                <Typography color="black" fontWeight="bold" fontSize="15px" className="singleLinesEllips">
                  {item.album_name}
                </Typography>
                { item?.album_slavs_latest?.issue_date && 
                  (
                  <Grid display="flex">
                    <Icon icon="ic:outline-calendar-today" color="grey" />
                    <Typography color="grey" fontSize="12px" ml={1}>
                      {" "}
                      { moment(item?.album_slavs_latest?.issue_date).format('yyyy')}
                    </Typography>
                  </Grid>
                  )
                }
                {
                  item.album_slavs_latest !=null && <Button
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
                    onClick={() => {setOpen(true);setAlbumId(item.id)}}
                    >
                    {langKey && langKey.lates_issue} {item?.album_slavs_latest?.issue || 'N/A'}
                  </Button>
                }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
