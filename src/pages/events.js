import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button, Checkbox, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

const events = [
  {
    id: 1,
    name: "English premier league",
    favourite: true,
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWXebXlJY0UY80ARdyY5ocXJufuKS0m5rJGttzee-8SXLFQRB4dd2OT4mnpaMVLDsdMjY&usqp=CAU",
  },
  {
    id: 2,
    name: "UEFA Champions League",
    favourite: false,
    icon: "https://yt3.googleusercontent.com/1sL3o7HlNEOn4jV74w7WN-p7ABIbBop9c09QcwKTGcapN3eMvGt-tCDYoA3ErYbtVCHcpVtlcgM=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    id: 3,
    name: "Brazil Independence Cup",
    favourite: false,
    icon: "https://thumbs.dreamstime.com/b/football-badge-logo-template-design-soccer-team-vector-sport-icon-emblem-illustration-133190618.jpg",
  },
  {
    id: 4,
    name: "China Cup",
    favourite: true,
    icon: "https://image.pngaaa.com/459/686459-middle.png",
  },
];
export default function Events(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [eventList, setEventList] = useState(events);
  const [filterValue, setFilterValue] = useState("all");
  const [selected, setSelected] = useState([]);

  const handleSelectFilter = (value) => {
    setFilterValue(value);
  };

  const handleGameSelected = (value, checked) => {
    const temp = [...selected];
    if (checked) setSelected((selected) => [...selected, value]);
    else {
      const index = temp.indexOf(value);
      if (index > -1) {
        // only splice array when item is found
        temp.splice(index, 1); // 2nd parameter means remove one item only
      }
      setSelected([...temp])
    }
  };

  const handleFavouriteUpdate= (index,favourited)=>{
    const nextstate = eventList.map((item, i) => {
        if (i === index) {
          // Increment the clicked counter
          return {...item,favourite:favourited};
        } else {
          // The rest haven't changed
          return item;
        }
      });
      setEventList(nextstate);
  }
  useEffect(() => {
    console.log("new eventList:::",eventList)
},[eventList]);
useEffect(() => {
    console.log("new selectedList:::",selected)
},[selected]);
  return (
    <Grid container>
      <Grid p={1} item xs={12} container overflow="auto" flexWrap="nowrap">
        <Grid px={1}>
          <Button
            variant="outlined"
            className={`${
              filterValue === "all" ? "filterBtnSelected" : "filterBtn"
            }`}
            onClick={() => {
              handleSelectFilter("all");
            }}
          >
            <Typography>Select All</Typography>
          </Button>
        </Grid>
        <Grid px={1}>
          <Button
            variant="outlined"
            className={`${
              filterValue === "reverse" ? "filterBtnSelected" : "filterBtn"
            }`}
            onClick={() => {
              handleSelectFilter("reverse");
            }}
          >
            <Typography>Reverse Selection</Typography>
          </Button>
        </Grid>
        <Grid px={1}>
          <Button
            variant="outlined"
            className={`${
              filterValue === "reset" ? "filterBtnSelected" : "filterBtn"
            }`}
            onClick={() => {
              handleSelectFilter("reset");
            }}
          >
            <Typography>Reset</Typography>
          </Button>
        </Grid>
        <Grid px={1}>
          <Button
            variant="outlined"
            className={`${
              filterValue === "confirm" ? "filterBtnSelected" : "filterBtn"
            }`}
            onClick={() => {
              handleSelectFilter("confirm");
            }}
          >
            <Typography>Confirm</Typography>
          </Button>
        </Grid>
      </Grid>
      
      <Grid px={2} item xs={12} container>
        {eventList.map((item, index) => {
          return (
            <Grid key={index} item xs={12} mb={1}>
              <Grid
                borderBottom="2px solid #dddddd"
                container
                alignItems="center"
                pb={1}
                justifyContent="space-between"
              >
                <Grid container alignItems="center" item xs={11}>
                  <Checkbox
                    onClick={(e) =>
                      handleGameSelected(item.id, e.target.checked)
                    }
                      checked={selected.includes(item.id)}
                    icon={
                      <Icon
                        icon="system-uicons:radio-on"
                        width={25}
                        color="#DDDDDD"
                      />
                    }
                    checkedIcon={
                      <Icon
                        icon="system-uicons:radio-on"
                        width={25}
                        color="orange"
                      />
                    }
                  />

                  <img
                    src={item.icon}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50px" }}
                  />
                  <Typography fontWeight="bold" mx={1}>
                    {" "}
                    {item.name}
                  </Typography>
                </Grid>
                <Grid container item xs={1}>
                  <IconButton onClick={()=>handleFavouriteUpdate(index,!item.favourite)}>
                  <Icon
                    icon="iconamoon:star-fill"
                    width={25}
                    color={`${item.favourite ? "#F2DA00" : "#DDDDDD"}`}
                  />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
