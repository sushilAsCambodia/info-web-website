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
} from "@/store/actions/footballActions";
import DataNotFound from "../DataNotFound";
import LoadingBackDrop from "../LoadingBackDrop";
import "core-js";

const matches = [
  { id: 1, name: "philly vs boston", time: "13:00 pm", date: "12 june" },
  { id: 2, name: "Mets vs Giants", time: "14:00 pm", date: "14 july" },
];

export default function MatchWithDates(props) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [dateFilter, setDateFilter] = useState(
    moment(new Date()).format(utils.dateFormate)
  );
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [nextMatchList, setNextMatchList] = useState([]);
  const [pastMatchList, setPastMatchList] = useState([]);
  const [fullMatchList, setFullMatchList] = useState([]);
  const [datefilter, setDatefilter] = useState(moment().format("YYYY-MM-DD"));
  const { customer = {} } = useSelector((state) => state.auth);
  const  footballScheduleList = useSelector((state) => state.football.footballScheduleList);
  /**** Render match data */
  async function scheduleData(dateFilters){
    var currenDate = moment(new Date()).format(utils.dateFormate);    
    setLoading(true);
    setLoading2(true);
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
      setNextMatchList(response?.data?.data?.data?.data);
      setFullMatchList(response?.data?.data?.data?.data)
      setLoading(false);
      setLoading2(false);
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
    
  }, [dateFilter]);

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
        
        <DateFilterBar setFilterDate={setDateFilter} />
        <Grid className="matchitem-box">
          {fullMatchList && fullMatchList.length>0 && !loading && !loading2 ?
            fullMatchList.splice(0,5).map((item, index) => {
              return <MatchItem key={index} details={item} index={index} />;
            }):
            <LoadingBackDrop loading={loading}/>
            }

          {fullMatchList && fullMatchList?.length === 0 ? <DataNotFound />:''}
        </Grid>
      </Grid>
    </Grid>
  );
}
