import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  addRemoveFavourite,
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
  const [DatePicker, setDatePicker] = useState(new Date());

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
  const footballScheduleList = useSelector(
    (state) => state.football.footballScheduleList
  );
  /**** Render match data */
  async function scheduleData(dateFilters) {
    var currenDate = moment(new Date()).format(utils.dateFormate);
    setLoading(true);
    if (dateClicked) {
      setFullMatchList([]);
    } // setLoading2(true);

    const params = {
      lang_id: utils.convertLangCodeToID(i18n.language),
      season: moment().format("YYYY"),
      status:
        dateFilters < currenDate ||
        moment(new Date(DatePicker)).format(utils.dateFormate) < currenDate
          ? 2
          : 0,
      member_ID: customer?.member_ID,
      page: page,
      date: dateClicked
        ? dateFilters
        : moment(new Date(DatePicker)).format(utils.dateFormate),
      descending: "desc",
      sortBy: "created_at",
    };
    const paramsLive = {
      lang_id: utils.convertLangCodeToID(i18n.language),
      season: moment().format("YYYY"),
      member_ID: customer?.member_ID,
      page: page,
      date: currenDate,
      descending: "desc",
      sortBy: "created_at",
    };

    try {
      if (currenDate == dateFilters) {
        const response = await api.get(
          "lotto/football-matches/mixed-live-list",
          paramsLive
        );
        console.log(
          "response",
          response && response.data && response.data.data.live_scores
        );
        if (page == 1) {
          setFullMatchList(
            response && response.data && response.data.data.live_scores
          );
        } else {
          setFullMatchList((data) =>
            data.concat(
              response && response.data && response.data.data.live_scores
            )
          );
        }
        setLoading(false);
      } else {
        const response = await api.get(
          "lotto/data44-aistat/match-schedules",
          params
        );
        if (page == 1) {
          setFullMatchList(response?.data?.data?.data?.data);
        } else {
          setFullMatchList((data) =>
            data.concat(response?.data?.data?.data?.data)
          );
        }
        setLoading(false);
      }

      // setLoading2(false);
    } catch (error) {
      return console.log("error");
    }
  }

  console.log("DatePicker", DatePicker);
  useEffect(() => {
    scheduleData(dateFilter, DatePicker);
  }, [dateFilter, page, DatePicker]);

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

              console.log("dateFiltersdateFilters", dateFilters);
              const params = {
                lang_id: utils.convertLangCodeToID(i18n.language),
                season: moment().format("YYYY"),
                status: dateFilters < currenDate ? 2 : 0,
                member_ID: customer?.member_ID,
                page: 1,
                date: dateFilters,
                descending: "desc",
                sortBy: "created_at",
              };
              const paramsLive = {
                lang_id: utils.convertLangCodeToID(i18n.language),
                season: moment().format("YYYY"),
                member_ID: customer?.member_ID,
                page: page,
                date: currenDate,
                descending: "desc",
                sortBy: "created_at",
              };
              try {
                if (currenDate == dateFilters) {
                  const response = await api.get(
                    "lotto/football-matches/mixed-live-list",
                    paramsLive
                  );
                  console.log(
                    "response",
                    response && response.data && response.data.data.live_scores
                  );
                  if (page == 1) {
                    setFullMatchList(
                      response && response.data && response.data.data.live_scores
                    );
                  } else {
                    setFullMatchList((data) =>
                      data.concat(
                        response && response.data && response.data.data.live_scores
                      )
                    );
                  }
                  setLoading(false);
                } else {
                const response = await api.get(
                  "lotto/data44-aistat/match-schedules",
                  params
                );

                if (page == 1) {
                  setFullMatchList(response?.data?.data?.data?.data);
                } else {
                  setFullMatchList((data) =>
                    data.concat(response && response.data && response.data.data)
                  );
                }
                setLoading(false);
                }
                
                //setNextMatchList(response?.data?.data?.data?.data);
               
              } catch (error) {
                return console.log("error");
              }
            },
          })
        )
      : router.push("/login");
  };



  const handleScroll = (event) => {
    if (
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight
    ) {
      setPage(page + 1);
      setDateClicked(false);
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
  console.log("fullMatchList", fullMatchList, dateClicked);
  return (
    <Grid style={{ position: "relative" }}>
      <Grid
        item
        xs={12}
        style={{
          padding: 10,
          paddingTop: "0px",
          position: "absolute",
          top: 50,
          width: "100%",
        }}
      >
        <DateFilterBar
          setFilterDate={setDateFilter}
          setDateClicked={setDateClicked}
          setDatePicker={setDatePicker}
        />
        <Grid
          className="matchitem-box"
          sx={{
            height: `${!isChrome ? "200vh" : "150vh"}`,
            maxHeight: "calc(100vh - 137px)",
            overflow: "auto",
          }}
          onScroll={handleScroll}
        >
          {fullMatchList &&
          fullMatchList.length > 0 &&
          !loading &&
          !loading2 ? (
            fullMatchList.map((item, index) => {
              return (
                <MatchItem
                  key={index}
                  details={item}
                  index={index}
                  handleAddRemove={handleAddRemove}
                />
              );
            })
          ) : (
            <LoadingBackDrop loading={loading} />
          )}

          {!loading && fullMatchList && fullMatchList?.length === 0 ? (
            <DataNotFound />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
