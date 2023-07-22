import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import {
  Typography,
  Divider,
  FormControl,
  Select,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Image } from "mui-image";
import moment from "moment/min/moment-with-locales";
import utils from "@/common/utils";
import MatchItem from "@/common/MatchItem";
import DateFilterBar from "@/common/dateFilterBar";
import api from "@/services/http";
import axios from "axios";
import {
  getScheduleList,
  getMatchEndList,
  getMatchListFavorite,
  getMatchLiveScoreList,
  addRemoveFavourite
} from "@/store/actions/footballActions";

import DataNotFound from "../DataNotFound";
import LoadingBackDrop from "../LoadingBackDrop";
import "core-js";



export default function MatchWithDates(props) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [dateClicked, setDateClicked] = useState(false);
  const [dateFilter, setDateFilter] = useState(
    moment(new Date()).format(utils.dateFormate)
  );
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [nextMatchList, setNextMatchList] = useState([]);
  const [pastMatchList, setPastMatchList] = useState([]);
  const [fullMatchList, setFullMatchList] = useState([]);
  // const [datefilter, setDatefilter] = useState(moment().format("YYYY-MM-DD"));
  const { customer = {} } = useSelector((state) => state.auth);
  const  footballScheduleList = useSelector((state) => state.football.footballScheduleList);
  /**** Render match data */
  async function scheduleData(dateFilters){
    var currenDate = moment(new Date()).format(utils.dateFormate);    
     setLoading(true);
    if(dateClicked)
{
  setFullMatchList([])
}    // setLoading2(true);
    console.log("dateFiltersdateFilters",dateFilters)
   const params= {
      lang_id: utils.convertLangCodeToID(i18n.language),
      season: moment().format("YYYY"),
      status: dateFilters<currenDate?2:0,
      member_ID: customer?.member_ID,        
      page: page,                
      date:dateFilters,        
      descending:'desc',
      sortBy:'created_at'
    }
    try {
      const response = await api.get('lotto/data44-aistat/match-schedules', params);
      console.log("responseresponseresponse",response?.data?.data?.data?.data)
      if (page == 1) {
        setFullMatchList(response?.data?.data?.data?.data)
      } else {
        setFullMatchList((data) =>
          data.concat(response?.data?.data?.data?.data)
        );
      }
       setLoading(false);
      // setLoading2(false);
    }catch (error) {
     return console.log("error")
    }
    // dispatch(
    //   getScheduleList({
    //     params: {
    //       lang_id: utils.convertLangCodeToID(i18n.language),
    //       season: moment().format("YYYY"),
    //       status: 0,
    //       member_ID: customer?.member_ID,        
    //       page: 1,                
    //       date:dateFilters,        
    //       descending:'desc',
    //       sortBy:'created_at'
    //     },
    //     callback: (res) => {
    //       console.log('res error:::',res && res.data)
    //       //setNextMatchList(res && res.data);

    //       // setLoading(false);
    //       // setLoading2(false);
    //       // setNextMatchList(res && res.data);
    //       //setFullMatchList(res && res.data)
    //     },
    //   })
    // );
  }

 
  useEffect(() => {   
    scheduleData(dateFilter)
    
  }, [dateFilter,page]);

   /*******Add and remove favorite*/
  const handleAddRemove = (id) => {

    customer?.member_ID
      ? dispatch(
          addRemoveFavourite({
            body: {
              id: id,
              member_ID: customer?.member_ID,
              type: "match_schedule",
            },
            callback: async (res) => {
              var currenDate = moment(new Date()).format(utils.dateFormate);   
              var dateFilters = moment(new Date()).format(utils.dateFormate);     
              
              console.log("dateFiltersdateFilters",dateFilters)
             const params= {
                lang_id: utils.convertLangCodeToID(i18n.language),
                season: moment().format("YYYY"),
                status: dateFilters<currenDate?2:0,
                member_ID: customer?.member_ID,        
                page: 1,                
                date:dateFilters,        
                descending:'desc',
                sortBy:'created_at'
              }
              try {
                const response = await api.get('lotto/data44-aistat/match-schedules', params);
                console.log("responseresponseresponse",response?.data?.data?.data?.data)
                //setNextMatchList(response?.data?.data?.data?.data);
                if (page == 1) {
                  setFullMatchList(response?.data?.data?.data?.data)
                } else {
                  setFullMatchList((data) =>
                    data.concat(response && response.data && response.data.data)
                  );
                }
                          
              }catch (error) {
               return console.log("error")
              }
            },
          })
        )
      : router.push("/login");
  };

  // useEffect(() => {
  // //  console.log(':::fulllist',pastMatchList.concat(nextMatchList))
  //   const fullList = pastMatchList.concat(nextMatchList).filter((item)=>item.startTime.includes(dateFilter));
  //   setFullMatchList(nextMatchList);
  //   const temp = pastMatchList.concat(nextMatchList).group(item  => item.startTime) 
  //   // console.log(':::group list by start time',temp)

  //   console.log('paginate pages:::',Math.ceil(fullMatchList?.length / 5))
  // }, [pastMatchList, nextMatchList,dateFilter]);
  console.log("footballScheduleList",footballScheduleList)
console.log("dateFilter",dateFilter)
const handleScroll = (event) => {
 
    if (
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight
    ) {
      setPage(page + 1);
      setDateClicked(false)
    }
  };

  const handleClose = () => {
    setLoading(false);
  };
  const handleOpen = () => {
    setLoading(true);
  };
const isChrome =
typeof window !== "undefined" && /chrome/i.test(window.navigator.userAgent);
console.log("fullMatchList",fullMatchList,dateClicked)
  return (
    <Grid style={{ position: "relative" }}>
      
      <Grid
        item
        xs={12}
        style={{
          padding: 10,
          paddingTop:"0px",
          position: "absolute",
          top: 50,
          width: "100%",
        }}
      >
        
        <DateFilterBar setFilterDate={setDateFilter} setDateClicked={setDateClicked} />
        <Grid className="matchitem-box"   sx={{
            height: `${!isChrome ? "200vh" : "150vh"}`,
            maxHeight: "calc(100vh - 137px)",
            overflow: "auto",
          }}
          onScroll={handleScroll}>
          {fullMatchList && fullMatchList.length>0 && !loading && !loading2 ?
            fullMatchList.map((item, index) => {
              return <MatchItem key={index} details={item} index={index} handleAddRemove={handleAddRemove} />;
            }):
            <LoadingBackDrop loading={loading}/>
            }

          {!loading&&fullMatchList && fullMatchList?.length === 0 ? <DataNotFound />:''}
        </Grid>
      </Grid>
    </Grid>
  );
}
