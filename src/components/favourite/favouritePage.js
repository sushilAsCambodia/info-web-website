import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import api from "@/services/http";
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
import { useDispatch,useSelector } from "react-redux";
import moment from "moment/moment";
import utils from "@/common/utils";
import MatchItem from "@/common/MatchItem";
import MatchRounds from "@/common/MatchRounds";
import DateFilterBar2 from "@/common/dateFilterBar2";
import DataNotFound from "../DataNotFound";
import LoadingBackDrop from "../LoadingBackDrop";

import {
  getScheduleList,
  getMatchEndList,
  getMatchListFavorite,
  getMatchLiveScoreList,
  addRemoveFavourite
} from "@/store/actions/footballActions";
export default function FavouritePage(props) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { customer = {} } = useSelector((state) => state.auth); 
  const [dateFilter, setDateFilter] = useState(moment(new Date()).format(utils.dateFormate));
  const [age, setAge] = useState("");
  const [fullMatchList, setFullMatchList] = useState([]);
  const [page, setPage] = useState(1);
  const [dateClicked, setDateClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  /**** Render match data */
  async function favoriteData(dateFilter){
    if(dateClicked)
    {
      setFullMatchList([])
    }  
    var currenDate = moment(new Date()).format(utils.dateFormate);

    const params= {
      lang_id: utils.convertLangCodeToID(i18n.language),
      member_ID: customer?.member_ID,
      page: 1,
      is_favorite: true,
      date:dateFilter,      
      descending: false,
      sortBy: "startTime",
    }
    try {
      const response = await api.get('lotto/data44-aistat/match-schedules', params);
      console.log("sdsdsdsd",response && response.data && response.data.data)
      const responseDetail=response && response.data && response.data.data && response.data.data.data && response.data.data.data.data
      // console.log("response2435467687AS",response?.data?.data?.data?.data)
      setFullMatchList(responseDetail)
      // if (page == 1) {
      //   setFullMatchList(responseDetail)
      // } else {
      //   setFullMatchList((data) =>
      //     data.concat(responseDetail)
      //   )
      // }
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
  const handleScroll = (event) => {
 
    if (
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight
    ) {
      setPage(page + 1);
      setDateClicked(false)  
      
    }
  };

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

  const handleClose = () => {
    setLoading(false);
  };
  const handleOpen = () => {
    setLoading(true);
  };
  useEffect(() => {
    console.log("dfdfdf")
    favoriteData(dateFilter)
    
  }, [dateFilter,page]);
  const isChrome =
typeof window !== "undefined" && /chrome/i.test(window.navigator.userAgent);
  console.log("startDate54545",dateFilter)
  return (
    <Grid style={{ position: "relative" }}>
      <Grid
        item
        xs={12}
        style={{
          padding: 10,
          position: "absolute",
          top: 50,
          width: "100%",
        }}
      >
        <DateFilterBar2  setFilterDate={setDateFilter} setDateClicked={setDateClicked}/>
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
        {/* <Grid pt={1} textAlign="center">
          {" "}
          <Image
            alt="not_found_2"
            style={{ width: "90%" }}
            src="./assets/not-found.png"
          />
          <Typography>No Data Found</Typography>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
