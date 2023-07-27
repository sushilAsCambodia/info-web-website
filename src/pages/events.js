import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Typography, Divider, Button, Checkbox, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import moment from "moment/min/moment-with-locales";
import utils from "@/common/utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import Image from "mui-image";
import api from "@/services/http";

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
  const { t,i18n } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const [eventList, setEventList] = useState(events);
  const [filterValue, setFilterValue] = useState("all");
  const [selected, setSelected] = useState([]);
  const [competions, seCompetions] = useState([]);
  
  let dateSelected
  if (typeof window != "undefined") {
     dateSelected = window.localStorage.getItem("selectedDate"); 
  }
  const handleSelectFilter = (value) => {
    if(value==="reset"){
      setSelected([])
    } else if(value==="all"){
      scheduleData();
    } else {
      localStorage.setItem('competition',selected)
      localStorage.setItem('setComp',true)
      localStorage.setItem('eventDate',dateSelected)
console.log("selected",selected)
router.push(`/match`)
    }
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


  /**** Render match data */
  async function scheduleData() {
    var currenDate = moment(new Date()).format(utils.dateFormate);
   
    
   
    const params = {
      lang_id: utils.convertLangCodeToID(i18n.language),
      season: moment().format("YYYY"),
      status:
      dateSelected < currenDate
          ? 2
          : 0,     
      date:dateSelected,
      descending: "desc",
      sortBy: "created_at",
    };
    const paramsLive = {
      lang_id: utils.convertLangCodeToID(i18n.language),
      season: moment().format("YYYY"),       
      date: currenDate,
      descending: "desc",
      sortBy: "created_at",
    };

    try {
      if ( currenDate === dateSelected) {
        console.log("ddddddddddd")
        const response = await api.get(
          "lotto/football-matches/mixed-live-list",
          paramsLive
        );

        if(response && response.status==200){
          seCompetions(response && response.data && response.data.data && response.data.data.competition)
          response && response.data && response.data.data && response.data.data.competition.length>0 && response.data.data.competition.map((item,index)=>{
            item && item.competitions && item.competitions.length>0 && item.competitions.map((item,index)=>{
              setSelected(current => [...current, item.id]);
            })

          }) 
          //console.log("responseLive",response && response.data && response.data.data && response.data.data.competition)
        }
    
      } else {
        const response = await api.get(
          "lotto/data44-aistat/match-schedules",
          params
        );
        console.log("responseData3434545d",response)
        if(response && response.status==200){
          //console.log("responseData",response && response.data && response.data.data && response.data.data.competition)
          seCompetions(response && response.data && response.data.data && response.data.data.competition)
          response && response.data && response.data.data && response.data.data.competition.length>0 && response.data.data.competition.map((item,index)=>{
            item && item.competitions && item.competitions.length>0 && item.competitions.map((item,index)=>{
              setSelected(current => [...current, item.id]);
            })

          }) 
        }
      }

      // setLoading2(false);
    } catch (error) {
      return console.log("error");
    }
  }

  useEffect(() => {
  
},[eventList]);
useEffect(() => {
   
},[selected]);

useEffect(() => {
  scheduleData();
}, []);
console.log("Selected",selected)
/****** Render Competition */
const renderCompetition = (product) => {
  const items =
    product &&
    product.competitions.length > 0 &&
    product.competitions.map((p,index) => {
      // let name =
      //   language_id == 1 || language_id == 3 ? p.nameEnFull : p.nameFull;
      // let nameData =
      //   language_id == 1 || language_id == 3
      //     ? name.match(/(\b\S)?/g).join("")
      //     : p.name;
      // let checkboxVal = selectedName.includes(name);
      
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
                    handleGameSelected(p.id, e.target.checked)
                  }
                    checked={selected.includes(p.id)}
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

               <Grid style={{borderRadius:"50px", border:'1.5px solid #DDDDDD'}}>
               <Image
                  src={p.image}
                  width={40}
                  height={40}
                  style={{ borderRadius: "50px",  }}
                  alt="Image"
                />
               </Grid>
                <Typography fontWeight="bold" mx={1} fontSize="12px">
                  {" "}
                  {p.nameEn}
                </Typography>
              </Grid>
              {/* <Grid container item xs={1}>
                <IconButton onClick={()=>handleFavouriteUpdate(index,!item.favourite)}>
                <Icon
                  icon="iconamoon:star-fill"
                  width={20}
                  color={`${item.favourite ? "#F2DA00" : "#DDDDDD"}`}
                />
                </IconButton>
              </Grid> */}
            </Grid>
          </Grid>
        
      );
    });
  //return [<ListSubheader>{product.country}</ListSubheader>, items];
  return [items];
};


console.log("selected",selected,dateSelected,competions)
  return (
    <Grid container>
 <Grid sx={{position:'relative'}}>
 <Grid p={1} item xs={12} container overflow="auto" style={{background:"#fff", zIndex:'9', position:'fixed', left:'0', right:"0", justifyContent:'center', borderBottom:'2px solid #dddddd', marginBottom:'10px'}} flexWrap="nowrap">
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
        {/* <Grid px={1}>
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
        </Grid> */}
        
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
 </Grid>
      
      <Grid px={2} item xs={12} container sx={{marginTop:'55px'}}>
      {competions &&
                  competions.length > 0 &&
                  competions.map((p) => renderCompetition(p))}
       
      </Grid>
    </Grid>
  );
}
